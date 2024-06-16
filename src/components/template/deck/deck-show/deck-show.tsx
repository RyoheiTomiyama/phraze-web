import { DeckLayout, DeckQuiz } from '@/components/feature/deck'
import { Heading } from '@/components/ui/heading'
import { useRouter } from 'next/router'

export const DeckShow = () => {
  const router = useRouter()

  return (
    <DeckLayout>
      <header className="container">
        <Heading variant="h1">{router.asPath.toUpperCase()}</Heading>
      </header>
      <main className="container flex flex-col flex-1">
        <DeckQuiz />
      </main>
    </DeckLayout>
  )
}
