/**
 * firebase 認証モック基盤（ADR-002 v5・SDK stub 層）。
 *
 * `@/lib/firebase` の認証 API（signInGoogle / verify / getIdToken / refreshIdToken /
 * signOut）を制御可能な stub で置換する共有ファクトリを提供する。実物の AuthProvider
 * ライフサイクル（verify → state 更新・logout → signOut）を検証する
 * `auth-provider.test.tsx` が、firebase SDK の置換として本 stub を使う。
 *
 * ## 使い方（テストファイル側で vi.mock を設定）
 *
 * ```ts
 * vi.mock('@/lib/firebase', async () => {
 *   const mod = await import('@/lib/firebase/auth.mock')
 *   return mod.createFirebaseMock()
 * })
 * import { mockUser, setMockAuthUser, resetFirebaseMock } from '@/lib/firebase/auth.mock'
 * ```
 *
 * `vi.mock` のファクトリは hoisting されるため、モジュール直接参照ではなく
 * async import 経由でファクトリを取得する（vi.mock hoisting 対処）。
 *
 * ## 循環依存の切断点
 *
 * 本モジュールは feature/auth（AuthProvider）を import しない。AuthProvider を
 * import すると `@/lib/firebase`（モック対象）への import を引き起こし、
 * vi.mock ファクトリ → 本モジュール → AuthProvider → `@/lib/firebase`（モック中）
 * の循環で TDZ 参照が発生するため（v4 の TDZ 回避 dynamic import ハックは本分割と
 * ともに削除）。コンポーネントテストで AuthProvider をモックする場合は
 * `@/components/feature/auth/auth-provider.mock` の createAuthWrapper を使う。
 *
 * - `verify(callback)`: `authState.user`（モックユーザー or undefined）で同期的に
 *   callback を発火し、unsubscribe 関数を返す。
 * - `getIdToken` / `refreshIdToken`: 固定トークン `'test-token'` を返す。
 * - `mockUser(overrides?)`: 認証ドメインのユーザー形状（uid / displayName / email）を返す。
 */
import { vi } from 'vitest'
import type { User } from 'firebase/auth'

/** テスト用の firebase User 形状（auth-provider が消費する最小フィールド）。 */
export type MockFirebaseUser = {
  uid: string
  displayName: string
  email: string
}

/** 認証状態のホルダ（ファクトリと setMockAuthUser で共有）。 */
const authState: { user: MockFirebaseUser | undefined } = { user: undefined }

/**
 * firebase User のモックを生成する。auth-provider は displayName / uid / email を
 * 消費するため、それらをデフォルト値で埋める。
 */
export const mockUser = (
  overrides: Partial<MockFirebaseUser> = {},
): MockFirebaseUser => {
  return {
    uid: 'test-uid',
    displayName: 'Test User',
    email: 'test@example.com',
    ...overrides,
  }
}

/** `vi.mock('@/lib/firebase')` に渡す stub 群（シングルトン・テスト間で共有）。 */
export const firebaseStubs = {
  signInGoogle: vi.fn(async () => {
    return true
  }),
  verify: vi.fn((cb: (user: User | undefined) => void) => {
    cb(authState.user as unknown as User | undefined)
    return () => {
      // unsubscribe（実物の onAuthStateChanged の戻り値に相当）
    }
  }),
  getIdToken: vi.fn(async () => {
    return 'test-token'
  }),
  refreshIdToken: vi.fn(async () => {
    return 'test-token'
  }),
  signOut: vi.fn(async () => {
    return undefined
  }),
}

/** `vi.mock('@/lib/firebase', ...)` ファクトリから呼ぶ。stub 群を返す。 */
export const createFirebaseMock = () => {
  return firebaseStubs
}

/** 認証状態（モックユーザー）を設定する。undefined で未ログイン。 */
export const setMockAuthUser = (user: MockFirebaseUser | undefined) => {
  authState.user = user
}

/** stub の呼び出し記録をリセットする（beforeEach で使用）。 */
export const resetFirebaseMock = () => {
  firebaseStubs.signInGoogle.mockReset()
  firebaseStubs.verify.mockReset()
  firebaseStubs.getIdToken.mockReset()
  firebaseStubs.refreshIdToken.mockReset()
  firebaseStubs.signOut.mockReset()
  // verify は mockReset で implementation も消えるので再設定
  firebaseStubs.verify.mockImplementation(
    (cb: (user: User | undefined) => void) => {
      cb(authState.user as unknown as User | undefined)
      return () => {
        /* noop */
      }
    },
  )
  firebaseStubs.signInGoogle.mockResolvedValue(true)
  firebaseStubs.getIdToken.mockResolvedValue('test-token')
  firebaseStubs.refreshIdToken.mockResolvedValue('test-token')
  firebaseStubs.signOut.mockResolvedValue(undefined)
  authState.user = undefined
}
