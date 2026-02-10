import { FetcherError } from './fetcher'

let isRedirecting = false

export function redirectToLogin() {
  if (isRedirecting) return
  isRedirecting = true

  const redirect = window.location.pathname + window.location.search
  window.location.href = `/login?redirect=${encodeURIComponent(redirect)}`
}

export function isUnauthorized(error: any): boolean {
  const e = error as FetcherError
  console.log(error)
  return e.status === 401
}
