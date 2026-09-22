/**
 * 統合テスト用プロバイダ合成ラッパ（ADR-003・FR-7）。
 *
 * `createProvidersWrapper({ auth, urql })` は auth context wrapper
 * （`auth-provider.mock` の createAuthWrapper）と urql モッククライアント wrapper
 * （`client.mock` の createUrqlWrapper）を合成した wrapper を返す。auth と urql の
 * 両 context を必要とするコンポーネントのテストで `render(ui, { wrapper })` に渡す。
 *
 * 本ユニット（phase3-mock-foundation）のテストでは未使用（後続の統合テスト用）。
 *
 * ## GraphProvider（実物）の合成はしない（YAGNI）
 *
 * GraphProvider は内部で `createClient`（`@/lib/urql`）を呼び、独自の UrqlProvider で
 * ラップする。実物を合成するには client 注入機構の設計が必要で、実際に統合テストが
 * 必要になった時点で設計する（v4 の `vi.mock('@/lib/urql')` ホルダ機構は未使用の
 * ため廃止）。本 wrapper は「auth context の注入 + モック urql client の注入」の
 * 合成のみを行う。
 *
 * 注意: 本ファイルは auth-provider.mock（→ 実物 auth-provider → `@/lib/firebase`）を
 * import するため、本ファイルを import するテストファイルは
 * `vi.mock('@/lib/firebase', ...)` のファクトリ（`@/lib/firebase/auth.mock` の
 * createFirebaseMock）を設定すること。
 */
import { PropsWithChildren } from 'react'
import {
  createAuthWrapper,
  type MockAuthDispatch,
  type MockAuthState,
} from '@/components/feature/auth/auth-provider.mock'
import {
  createUrqlWrapper,
  type OperationHandlers,
  type TestClient,
} from '@/lib/urql/client.mock'

export type CreateProvidersWrapperOptions = {
  /** auth context の state / dispatch。省略時は createAuthWrapper のデフォルト（未ログイン）。 */
  auth?: {
    state?: MockAuthState
    dispatch?: MockAuthDispatch
  }
  /** urql 操作→レスポンスハンドラ、または構築済み TestClient（spy 検証用）。 */
  urql: OperationHandlers | TestClient
}

/**
 * auth wrapper + urql wrapper を合成した wrapper を返す。
 * 外側に auth（context と dispatch の両方）・内側に urql を被せる。
 */
export const createProvidersWrapper = (
  options: CreateProvidersWrapperOptions,
) => {
  const AuthWrapper = createAuthWrapper(
    options.auth?.state,
    options.auth?.dispatch,
  )
  const UrqlWrapper = createUrqlWrapper(options.urql)

  const ProvidersWrapper = ({ children }: PropsWithChildren) => {
    return (
      <AuthWrapper>
        <UrqlWrapper>{children}</UrqlWrapper>
      </AuthWrapper>
    )
  }
  return ProvidersWrapper
}
