/**
 * AuthProvider のモック基盤（ADR-002 v5・context 境界）。
 *
 * コンポーネントテストでは実物 AuthProvider をマウントせず、実物が export する
 * `context` / `dispatchContext` にテスト値を注入する wrapper（= AuthProvider の
 * モック）で auth を差し替える。実物 AuthProvider のライフサイクル（verify →
 * state 更新・logout → signOut）は `auth-provider.test.tsx` が firebase stub 経由で
 * 検証する。
 *
 * ## 使い方
 *
 * ```tsx
 * render(<SideNav />, {
 *   wrapper: createAuthWrapper(mockAuthState({ user: { name: 'Alice' } })),
 * })
 * ```
 *
 * ## 実物の context インスタンスを使う理由
 *
 * `createContext` の戻り値はモジュールインスタンスごとに別物になるため、本ファイル側で
 * context を作り直すと consumer（SideNav など）に値が伝わらない。実物の
 * `./auth-provider` から `context` / `dispatchContext` を import し、同一インスタンスに
 * Provider を被せる。
 *
 * State / dispatch の型は auth-provider.tsx が export していないため、構造互換の型を
 * 本ファイルで定義する（実物の型定義は変更しない）。
 *
 * 注意: 本ファイルは実物 auth-provider（→ `@/lib/firebase`）を import するため、
 * 本ファイルを import するテストファイルは `vi.mock('@/lib/firebase', ...)` の
 * ファクトリ（`@/lib/firebase/auth.mock` の createFirebaseMock）を設定すること。
 */
import { PropsWithChildren } from 'react'
import { vi, type Mock } from 'vitest'
import { context, dispatchContext } from './auth-provider'

/** 実物 State の user（auth-provider.tsx の `type User = { name: string }` と構造互換）。 */
export type MockAuthUser = { name: string }

/**
 * auth-provider.tsx の State 型（`{loading} & ({user, isLogin: true} | {user?, isLogin?})`）
 * と構造互換の型。実物の State は export されていないため本ファイルで定義する。
 */
export type MockAuthState = { loading: boolean } & (
  | {
      user: MockAuthUser
      isLogin: true
    }
  | {
      user?: undefined
      isLogin?: false
    }
)

/** 実物 dispatchContext の Provider 型（`type Provider = 'google'`）と構造互換。 */
type MockAuthProvider = 'google'

/**
 * auth-provider.tsx の dispatchContext 値型と構造互換の型。各メンバーは vi.fn で
 * 構築されるため、テストから呼び出し検証（spy）が可能。
 */
export type MockAuthDispatch = {
  getToken: Mock<() => Promise<string | undefined>>
  refreshToken: Mock<() => Promise<string | undefined>>
  login: Mock<(provider: MockAuthProvider) => Promise<boolean>>
  logout: Mock<() => Promise<void>>
}

export type MockAuthStateOverrides = {
  /** ログイン済 state を作るときにユーザーを指定する。省略時は未ログイン。 */
  user?: MockAuthUser
  /** loading フラグ。省略時 false（認証確認済みの静的 state）。 */
  loading?: boolean
}

/**
 * auth context の State を生成する。`user` 指定でログイン済、省略で未ログイン。
 * 実物の State 型（union）が取り得ない組み合わせ（`{user, isLogin: false}` など）は
 * 作れないようにする。
 */
export const mockAuthState = (
  overrides: MockAuthStateOverrides = {},
): MockAuthState => {
  const loading = overrides.loading ?? false
  if (overrides.user !== undefined) {
    return {
      user: overrides.user,
      isLogin: true,
      loading,
    }
  }
  return {
    user: undefined,
    isLogin: false,
    loading,
  }
}

/** mockAuthDispatch の一部メンバーを差し替える場合の上書き（vi.fn で渡す）。 */
export type MockAuthDispatchOverrides = Partial<MockAuthDispatch>

/**
 * auth dispatch の spy を構築する。デフォルト戻り値は token=`'test-token'` /
 * login=`true` / logout=resolved。テストから `dispatch.logout` の呼び出し検証が可能。
 * `overrides` で一部メンバーを差し替え可能（spy を保持したいメンバーは省略する）。
 */
export const mockAuthDispatch = (
  overrides: MockAuthDispatchOverrides = {},
): MockAuthDispatch => {
  return {
    getToken: vi.fn<() => Promise<string | undefined>>(async () => {
      return 'test-token'
    }),
    refreshToken: vi.fn<() => Promise<string | undefined>>(async () => {
      return 'test-token'
    }),
    login: vi.fn<(provider: MockAuthProvider) => Promise<boolean>>(async () => {
      return true
    }),
    logout: vi.fn<() => Promise<void>>(async () => {
      return undefined
    }),
    ...overrides,
  }
}

/**
 * auth context をテスト値で整える wrapper を返す。`state` 省略時は未ログイン・
 * `dispatch` 省略時は mockAuthDispatch() を使う。返り値を
 * `render(ui, { wrapper })` / `renderHook(fn, { wrapper })` に渡す。
 */
export const createAuthWrapper = (
  state: MockAuthState = mockAuthState(),
  dispatch: MockAuthDispatch = mockAuthDispatch(),
) => {
  const AuthContextWrapper = ({ children }: PropsWithChildren) => {
    return (
      <context.Provider value={state}>
        <dispatchContext.Provider value={dispatch}>
          {children}
        </dispatchContext.Provider>
      </context.Provider>
    )
  }
  return AuthContextWrapper
}
