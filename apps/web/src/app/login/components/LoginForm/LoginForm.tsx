'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/hooks/useLogin/useLogin'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/'
  const { login, isLoading, error } = useLogin({
    onSuccess: () => {
      router.replace(redirectUrl)
    },
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md'>
      <h2 className='text-2xl font-bold text-gray-900'>Sign in to your account</h2>
      {error && (
        <div className='rounded bg-red-100 px-4 py-2 text-sm text-red-700'>
          {error instanceof Error ? error.message : 'Login failed'}
        </div>
      )}
      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          Email address
        </label>
        <Input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          required
          className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
          Password
        </label>
        <Input
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
          className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button
        type='submit'
        className='w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50'
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
