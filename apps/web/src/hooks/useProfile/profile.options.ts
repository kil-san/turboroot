import { getProfile } from './profile.queries'

export const QUERY_KEY = 'profile'

export const createProfileQueryOptions = () => ({
  queryKey: [QUERY_KEY],
  queryFn: getProfile,
})
