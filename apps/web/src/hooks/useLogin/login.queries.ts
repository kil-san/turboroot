import { SigninRequest, SigninResponse } from '@repo/common'

import { fetcher } from '@/tanstack/fetcher'

export async function login(request: SigninRequest) {
  const response = await fetcher<SigninResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  return response
}
