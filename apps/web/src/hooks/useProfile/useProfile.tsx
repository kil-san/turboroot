'use client'

import { UpdateProfileRequest } from '@repo/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getProfile, updateProfile } from './profile.queries'

export const QUERY_KEY = 'profile'

export function useProfile() {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getProfile,
  })

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })

  const updateProfileMutation = (request: UpdateProfileRequest) => {
    mutation.mutate(request)
  }

  return { data, updateProfile: updateProfileMutation }
}
