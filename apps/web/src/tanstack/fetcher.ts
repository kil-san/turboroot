export interface FetcherError extends Error {
  status: number
  data?: any
}

export async function fetcher<T = any>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${process.env.API_ENDPOINT}${path}`, {
    ...init,
    credentials: 'include', // <-- important for sending cookies
  })

  if (!response.ok) {
    // try to parse JSON error, fallback to status text
    let errorData: any
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.statusText }
    }
    const error = new Error(errorData.message || 'Request failed') as FetcherError
    error.status = response.status
    error.data = errorData
    throw error
  }

  // parse JSON on success
  return response.json()
}
