import { Client, cacheExchange, fetchExchange } from 'urql'

export const createClient = (url: string) => {
  return new Client({
    url,
    exchanges: [cacheExchange, fetchExchange],
  })
}
