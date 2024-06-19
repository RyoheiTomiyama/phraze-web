import { CardTable } from '@/components/feature/card'
import { DefaultLayout } from '@/components/feature/layout'
import { useRouter } from 'next/router'

export const DeckEdit = () => {
  const router = useRouter()

  return (
    <DefaultLayout title={router.asPath.toUpperCase()}>
      <CardTable />
    </DefaultLayout>
  )
}
