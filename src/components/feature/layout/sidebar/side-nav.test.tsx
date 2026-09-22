import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
/**
 * SideNav（feature/layout）コンポーネントテスト（Phase 3・ADR-004）。
 *
 * `useAuthContext`（user 表示）と `useAuthDispatchContext`（logout）を使う挙動を
 * auth context 境界のモック（`@/components/feature/auth/auth-provider.mock` の
 * createAuthWrapper）経由でカバーする（v5: 実物 AuthProvider はマウントしない =
 * AuthProvider をモック）。実物の AuthProvider ライフサイクル（verify → state 更新・
 * logout → signOut）は auth-provider.test.tsx が検証する。urql には依存しない
 * （side-nav は GraphQL を使わない）。
 *
 * 対象は feature/layout 側の side-nav（auth context を消費する）。common/layout 側の
 * side-nav は静的リンクのみで既存テストが別途カバーするため拡張しない。
 */
import { SideNav } from './side-nav'
import {
  createAuthWrapper,
  mockAuthDispatch,
  mockAuthState,
} from '@/components/feature/auth/auth-provider.mock'
import { resetFirebaseMock } from '@/lib/firebase/auth.mock'
import { pagesPath } from '@/lib/pathpida/$path'

// next/router をファイル内で上書きし、logout 後の router.push を検証可能にする
// （vitest.setup.ts のグローバルモックでは push が毎回別 vi.fn になるため）。
const { routerState } = vi.hoisted(() => {
  return {
    routerState: {
      push: vi.fn(),
      replace: vi.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    },
  }
})
vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return routerState
    },
  }
})

// SideNav → '../../auth' → auth-provider.tsx → '@/lib/firebase' の連鎖で実モジュールが
// ロードされるのを防ぐ（ロード時に firebase.ts の initializeApp(config) + getAuth が
// 実 SDK を初期化する）。
vi.mock('@/lib/firebase', async () => {
  const mod = await import('@/lib/firebase/auth.mock')
  return mod.createFirebaseMock()
})

describe('SideNav', () => {
  beforeEach(() => {
    resetFirebaseMock()
    routerState.push.mockReset()
    routerState.replace.mockReset()
  })

  it('ログイン済みのときアカウントメニューにユーザー名を表示する（happy-path）', async () => {
    const user = userEvent.setup()
    render(<SideNav />, {
      wrapper: createAuthWrapper(mockAuthState({ user: { name: 'Alice' } })),
    })

    await user.click(screen.getByRole('button', { name: /settings/i }))

    // auth context に注入した state（user.name）がラベルに表示される
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('未ログイン時はアカウントメニューに unknown を表示する（edge: 未ログイン）', async () => {
    const user = userEvent.setup()
    // wrapper デフォルト = 未ログイン state
    render(<SideNav />, { wrapper: createAuthWrapper() })

    await user.click(screen.getByRole('button', { name: /settings/i }))

    expect(screen.getByText('unknown')).toBeInTheDocument()
  })

  it('Logout クリックで auth dispatch の logout が1回呼ばれルートへ遷移する（edge: logout 検証）', async () => {
    const dispatch = mockAuthDispatch()
    const user = userEvent.setup()
    render(<SideNav />, {
      wrapper: createAuthWrapper(
        mockAuthState({ user: { name: 'Alice' } }),
        dispatch,
      ),
    })

    await user.click(screen.getByRole('button', { name: /settings/i }))
    const logoutItem = screen.getByText('Logout')
    await user.click(logoutItem)

    // logout() が context 経由で1回呼ばれる（signOut 呼び出しは auth-provider.test が検証）
    expect(dispatch.logout).toHaveBeenCalledTimes(1)
    // router.push がルートへ遷移する
    expect(routerState.push).toHaveBeenCalledWith(pagesPath.$url())
  })
})
