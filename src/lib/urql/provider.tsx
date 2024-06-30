import { PropsWithChildren } from 'react'
import { Client, Provider } from 'urql'

export const UrqlProvider = ({
  children,
  client,
}: PropsWithChildren<{ client: Client }>) => {
  return <Provider value={client}>{children}</Provider>
}
