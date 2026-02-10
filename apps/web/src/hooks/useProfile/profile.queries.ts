import { ProfileResponse, UpdateProfileRequest } from '@repo/common'

import { fetcher } from '@/tanstack/fetcher'

export async function getProfile(): Promise<ProfileResponse> {
  const response = await fetcher<ProfileResponse>('/profile', {
    method: 'GET',
  })

  return response
}

export async function updateProfile(request: UpdateProfileRequest): Promise<ProfileResponse> {
  const response = await fetcher<ProfileResponse>('/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  return response
}
