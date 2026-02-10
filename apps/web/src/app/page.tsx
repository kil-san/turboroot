import WelcomeMessage from 'app/components/WelcomeMessage/WelcomeMessage.client'
import Image from 'next/image'

import UpdateProfileForm from './components/UpdateProfileForm/UpdateProfileForm.client'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image className={styles.logo} alt='Turborepo logo' width={180} height={38} priority src='turborepo-dark.svg' />
        <WelcomeMessage />
        <UpdateProfileForm />
      </main>
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
