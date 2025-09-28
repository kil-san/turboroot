'use client'

import { UpdateProfileRequest } from '@repo/types/dto'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { updateProfile } from './profile.queries'
import { profileOptions, QUERY_KEY } from './profile.options'

export function useProfile() {
  const queryClient = useQueryClient()
  const { data } = useSuspenseQuery(profileOptions)

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
