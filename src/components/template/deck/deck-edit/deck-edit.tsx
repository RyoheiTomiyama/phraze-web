// import { CardTable } from '@/components/feature/card'
import { DeckEditor } from '@/components/feature/deck'
import { DefaultLayout } from '@/components/feature/layout'
import { useRouter } from 'next/router'

export const DeckEdit = () => {
  const router = useRouter()

  return (
    <DefaultLayout
      className="max-h-dvh"
      title={router.asPath.toUpperCase()}
      // mainProps={{ className: 'max-h-dvh' }}
    >
      <DeckEditor className="flex-auto" />
      {/* <CardTable /> */}
    </DefaultLayout>
  )
}
