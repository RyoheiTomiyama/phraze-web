/**
 * urql モッククライアント基盤（ADR-001・公式 "mock the client" 方式）。
 *
 * `createTestClient(handlers)` は `executeQuery` / `executeMutation` が Wonka の
 * `Source` を返すモック `Client` を構築する。exchange パイプラインは通さず、
 * fetchExchange には到達させない（モッククライアントが上流で完結）。
 *
 * 成功は `fromValue(makeResult(...))`、エラーは `fromValue(makeErrorResult(...))`、
 * loading 永続は `never`、連続応答は `sequence`（`make` + `subscribe`）で再現する。
 *
 * `fromValue(result)` が `Source` を返すため `OperationResultSource` への
 * キャストが必要（ADR-001）。
 *
 * `createUrqlWrapper(input)` は `UrqlProvider`（`@/lib/urql` 再エクスポート）に
 * モッククライアントを注入する wrapper を返す。`input` には OperationHandlers
 * （内部で createTestClient を構築）または構築済み TestClient（executeQuery /
 * executeMutation の spy 検証用）を渡す。`render(ui, { wrapper })` に渡して使う
 * （v5: 独自 render ヘルパーは廃止・標準の wrapper パターンに統一）。
 */
import { PropsWithChildren } from 'react'
import { vi } from 'vitest'
import {
  type Client,
  type Operation,
  type OperationResult,
  type OperationResultSource,
  getOperationName,
  makeErrorResult,
  makeResult,
} from 'urql'
import { fromValue, make, never, pipe, subscribe } from 'wonka'
import { UrqlProvider } from '@/lib/urql'

/** 操作（operation）に対するレスポンス Source を返すハンドラ。 */
export type OperationHandler = (
  operation: Operation,
) => OperationResultSource<OperationResult>

/** 操作名（GraphQL operation name）→ ハンドラ の map。`*` はフォールバック。 */
export type OperationHandlerMap = {
  [operationName: string]: OperationHandler
}

export type OperationHandlers = OperationHandler | OperationHandlerMap

/** fromValue/never の Source を OperationResultSource 型へ揃えるキャスト。 */
const asResultSource = (
  source: ReturnType<typeof fromValue<OperationResult>>,
): OperationResultSource<OperationResult> => {
  return source as unknown as OperationResultSource<OperationResult>
}

/** 成功レスポンス（`fromValue(makeResult(...))`）のハンドラを生成する。 */
export const ok = <Data extends Record<string, unknown> | null | undefined>(
  data: Data,
): OperationHandler => {
  return (operation) => {
    return asResultSource(fromValue(makeResult(operation, { data })))
  }
}

/** エラーレスポンス（`fromValue(makeErrorResult(...))`）のハンドラを生成する。 */
export const fail = (error: Error): OperationHandler => {
  return (operation) => {
    return asResultSource(fromValue(makeErrorResult(operation, error)))
  }
}

/** loading 永続（`never`）のハンドラを生成する。subscribe しても値が発火しない。 */
export const loading = (): OperationHandler => {
  return () => {
    return asResultSource(
      never as ReturnType<typeof fromValue<OperationResult>>,
    )
  }
}

/**
 * 連続応答（refetch / polling / cache 更新）のハンドラを生成する。
 * サブスクライブ時に各ハンドラの結果を順序どおり発火し、完了する。
 */
export const sequence = (handlers: OperationHandler[]): OperationHandler => {
  return (operation) => {
    return asResultSource(
      make<OperationResult>((observer) => {
        for (const handler of handlers) {
          pipe(
            handler(operation),
            subscribe((result) => {
              observer.next(result)
            }),
          )
        }
        observer.complete()
        return () => {
          /* teardown: 特に nothing（同期的に完了済み） */
        }
      }),
    )
  }
}

/** ハンドラ群から操作に対応するハンドラを解決する。未知操作は loading（never）へ。 */
const resolveHandler = (
  handlers: OperationHandlers,
  operation: Operation,
): OperationHandler => {
  if (typeof handlers === 'function') {
    return handlers
  }
  // urql の useQuery/useMutation から渡される operation は operationName プロパティを
  // 持たない場合があるため、document から操作名を抽出して解決する。
  // urql の Operation 型には operationName が公開されていないが、実行時には
  // 付与されている場合があるため safe access で取り出す。
  const opWith = operation as Operation & { operationName?: string }
  const name =
    opWith.operationName ??
    getOperationName(
      operation.query as Parameters<typeof getOperationName>[0],
    ) ??
    ''
  if (handlers[name]) {
    return handlers[name]
  }
  if (handlers['*']) {
    return handlers['*']
  }
  // 未知操作は loading 永続とし、ハンドラ未登録の副コンポーネントクエリで
  // クラッシュしないようにする（exchange パイプラインは通さない）。
  return loading()
}

export type TestClient = Client & {
  executeQuery: ReturnType<typeof vi.fn>
  executeMutation: ReturnType<typeof vi.fn>
}

/**
 * モック `Client` を構築する。`executeQuery` / `executeMutation` は `vi.fn` で
 * ラップするため、テストから呼び出し検証可能。
 */
export const createTestClient = (handlers: OperationHandlers): TestClient => {
  const executeQuery = vi.fn((operation: Operation) => {
    return resolveHandler(handlers, operation)(operation)
  })
  const executeMutation = vi.fn((operation: Operation) => {
    return resolveHandler(handlers, operation)(operation)
  })

  return { executeQuery, executeMutation } as unknown as TestClient
}

/** input が構築済み TestClient（executeQuery プロパティを持つオブジェクト）かどうか。 */
const isTestClient = (
  input: OperationHandlers | TestClient,
): input is TestClient => {
  return typeof input === 'object' && 'executeQuery' in input
}

/**
 * `UrqlProvider` にモッククライアントを注入する wrapper を生成する。
 * `input` が OperationHandlers の場合は内部で `createTestClient` を構築し、
 * TestClient の場合はそれをそのまま使う（テストから executeQuery /
 * executeMutation の呼び出し検証が可能）。返り値を `render(ui, { wrapper })` に渡す。
 */
export const createUrqlWrapper = (input: OperationHandlers | TestClient) => {
  const client = isTestClient(input) ? input : createTestClient(input)
  const UrqlWrapper = ({ children }: PropsWithChildren) => {
    return <UrqlProvider client={client}>{children}</UrqlProvider>
  }
  return UrqlWrapper
}
