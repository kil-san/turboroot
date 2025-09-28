import { UpdateProfileRequest, ProfileResponse } from '@repo/types/dto'

export async function getProfile(): Promise<ProfileResponse> {
  const response = await fetch(`${process.env.API_ENDPOINT}/profile`, {
    method: 'GET',
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return (await response.json()) as ProfileResponse
}

export async function updateProfile(request: UpdateProfileRequest): Promise<ProfileResponse> {
  const response = await fetch(`${process.env.API_ENDPOINT}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return (await response.json()) as ProfileResponse
}
