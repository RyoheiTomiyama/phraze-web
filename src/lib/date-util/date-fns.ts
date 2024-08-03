import * as datefns from 'date-fns'
import { Duration } from './type'

export const add = (d: Date, duration: Duration) => {
  return datefns.add(d, duration)
}

export const formatDistanceToNowStrict = (d: Date | string) => {
  return datefns.formatDistanceToNowStrict(d, { addSuffix: true })
}
