import { Google } from '@/components/common/icon'
import { useAuthDispatchContext } from '@/components/feature/auth'
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card'
import { Button } from '@/components/ui/button'
import { pagesPath } from '@/lib/pathpida/$path'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const SignIn = () => {
  const router = useRouter()
  const { login } = useAuthDispatchContext()

  const handleLoginGoogle = useCallback(async () => {
    const result = await login('google')

    if (result) {
      router.push(pagesPath.dashboard.$url())
    }
  }, [login, router])

  return (
    <main className="w-dvw h-dvh flex items-center justify-center bg-background">
      <NeonGradientCard className="max-w-sm h-auto items-center">
        <section className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-center">Phraze</h1>
          <div className="flex flex-col gap-4 items-center">
            <Button
              className="w-full flex flex-row gap-2.5"
              onClick={handleLoginGoogle}
            >
              <Google size="20" />
              Sign in with Google
            </Button>
            {/* <p>
              Don&apos;t have an account?{' '}
              <Link href="" className="text-info underline">
                Sign Up
              </Link>
            </p> */}
          </div>
        </section>
      </NeonGradientCard>
    </main>
  )
}
