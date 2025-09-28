import Image from 'next/image'
import styles from './page.module.css'
import WelcomeMessage from 'app/components/WelcomeMessage/WelcomeMessage.client'
import UpdateProfileForm from './components/UpdateProfileForm/UpdateProfileForm.client'
import { getQueryClient } from '@/tanstack/get-query-client'
import { profileOptions } from '@/hooks/useProfile/profile.options'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export default function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(profileOptions)

  return (
    <div className={styles.page}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main className={styles.main}>
          <Image
            className={styles.logo}
            alt='Turborepo logo'
            width={180}
            height={38}
            priority
            src='turborepo-dark.svg'
          />
          <WelcomeMessage />
          <UpdateProfileForm />
        </main>
      </HydrationBoundary>
      <footer className={styles.footer}>
        <a
          href='https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image aria-hidden src='/window.svg' alt='Window icon' width={16} height={16} />
          Examples
        </a>
        <a href='https://turborepo.com?utm_source=create-turbo' target='_blank' rel='noopener noreferrer'>
          <Image aria-hidden src='/globe.svg' alt='Globe icon' width={16} height={16} />
          Go to turborepo.com →
        </a>
      </footer>
    </div>
  )
}
