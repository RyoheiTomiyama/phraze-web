import { ErrorPage } from '@/components/template/error'

const NotFoundPage = () => {
  return (
    <ErrorPage
      title="Not Found"
      description={<>ページが見つかりませんでした。</>}
    />
  )
}

export default NotFoundPage
