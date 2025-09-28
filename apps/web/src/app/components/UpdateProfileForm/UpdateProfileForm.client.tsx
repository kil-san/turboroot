'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProfile } from 'hooks/useProfile/useProfile'
import { useState } from 'react'

export default function UpdateProfileForm() {
  const [values, setValues] = useState({ firstName: '', lastName: '' })
  const { updateProfile } = useProfile()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateProfile({
      firstName: values.firstName,
      lastName: values.lastName,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className='mt-4'
        placeholder='First Name'
        name='firstName'
        onChange={(e) =>
          setValues((prev) => ({
            ...prev,
            firstName: e.target.value,
          }))
        }
      />
      <Input
        className='mt-4'
        placeholder='Last Name'
        name='lastName'
        onChange={(e) =>
          setValues((prev) => ({
            ...prev,
            lastName: e.target.value,
          }))
        }
      />
      <Button className='mt-4' type='submit'>
        Update Profile
      </Button>
    </form>
  )
}
