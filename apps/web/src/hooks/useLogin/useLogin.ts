import { SigninRequest } from '@repo/common'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

import { login } from './login.queries'

interface UseLoginOptions {
  onSuccess?: () => void
}

export function useLogin(options?: UseLoginOptions) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate profile or auth queries if needed
      void queryClient.invalidateQueries()
      options?.onSuccess?.()
    },
  })

  return {
    login: (request: SigninRequest) => mutation.mutate(request),
    isLoading: mutation.isPending,
    error: mutation.error ?? null,
  }
}
