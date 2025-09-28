import { queryOptions } from '@tanstack/react-query'
import { getProfile } from './profile.queries'

export const QUERY_KEY = 'profile'

export const profileOptions = queryOptions({
  queryKey: [QUERY_KEY],
  queryFn: getProfile,
})
