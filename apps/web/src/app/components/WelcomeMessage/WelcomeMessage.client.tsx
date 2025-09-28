'use client'

import { useProfile } from 'hooks/useProfile/useProfile'

export default function WelcomeMessage() {
  const { data } = useProfile()
  return (
    <div className='flex flex-col items-center justify-center py-8'>
      <div className='rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg px-8 py-6'>
        <h1 className='text-3xl font-bold text-white drop-shadow mb-2 text-center'>
          Welcome{data?.firstName ? ',' : ''}{' '}
          <span className='text-yellow-300'>
            {data?.firstName} {data?.lastName}
          </span>
          !
        </h1>
        <p className='text-white/80 text-center'>We're glad to see you here.</p>
      </div>
    </div>
  )
}
