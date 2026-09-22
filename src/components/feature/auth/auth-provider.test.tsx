import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
/**
 * AuthProvider（実物）コンポーネントテスト（Phase 3・SDK 境界・ADR-002 v5 解釈）。
 *
 * 実物の AuthProvider ライフサイクル（verify → state 更新・logout → signOut）を
 * firebase stub（`@/lib/firebase/auth.mock`）経由でカバーする。コンポーネントテスト側
 * （side-nav など）は auth context 境界のモック（auth-provider.mock）で差し替えるため、
 * プロバイダと firebase SDK の境界は本テストが単独で検証する。
 *
 * レンダーは標準の wrapper パターン（v5）: `renderHook(fn, { wrapper: AuthProvider })`。
 */
import {
  AuthProvider,
  useAuthContext,
  useAuthDispatchContext,
} from './auth-provider'
import {
  firebaseStubs,
  mockUser,
  resetFirebaseMock,
  setMockAuthUser,
} from '@/lib/firebase/auth.mock'

// AuthProvider（実物）が '@/lib/firebase' を import するためモックファクトリで置換
// （実モジュールのロード時に firebase.ts の initializeApp(config) + auth.ts の getAuth が
// 実 SDK を初期化するため、テストでは絶対にロードしない）。
vi.mock('@/lib/firebase', async () => {
  const mod = await import('@/lib/firebase/auth.mock')
  return mod.createFirebaseMock()
})

// context と dispatch を同一 provider ツリー内で読む hook（logout → state 更新の
// 検証で両方必要になる）。
const useAuthPair = () => {
  return {
    state: useAuthContext(),
    dispatch: useAuthDispatchContext(),
  }
}

describe('AuthProvider', () => {
  beforeEach(() => {
    resetFirebaseMock()
  })

  it('verify でログイン済みユーザーが返るとログイン済み state になる（happy-path）', async () => {
    setMockAuthUser(mockUser({ displayName: 'Alice' }))

    const { result } = renderHook(
      () => {
        return useAuthContext()
      },
      {
        wrapper: AuthProvider,
      },
    )

    await waitFor(() => {
      expect(result.current).toEqual({
        user: { name: 'Alice' },
        isLogin: true,
        loading: false,
      })
    })
  })

  it('verify でユーザーが返らないと未ログイン state になる（edge: 未ログイン）', async () => {
    setMockAuthUser(undefined)

    const { result } = renderHook(
      () => {
        return useAuthContext()
      },
      {
        wrapper: AuthProvider,
      },
    )

    await waitFor(() => {
      expect(result.current).toEqual({
        user: undefined,
        isLogin: false,
        loading: false,
      })
    })
  })

  it('logout で signOut が1回呼ばれ未ログイン state に変わる（edge: logout）', async () => {
    setMockAuthUser(mockUser({ displayName: 'Alice' }))

    const { result } = renderHook(
      () => {
        return useAuthPair()
      },
      {
        wrapper: AuthProvider,
      },
    )

    // ログイン済み state が整うのを待つ
    await waitFor(() => {
      expect(result.current.state).toEqual({
        user: { name: 'Alice' },
        isLogin: true,
        loading: false,
      })
    })

    await act(async () => {
      await result.current.dispatch.logout()
    })

    // logout() → signOut() が firebase 置換側で1回呼ばれる
    expect(firebaseStubs.signOut).toHaveBeenCalledTimes(1)
    // state が未ログインに変わる
    expect(result.current.state).toEqual({
      user: undefined,
      isLogin: false,
      loading: false,
    })
  })
})
