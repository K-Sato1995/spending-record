import '../styles/globals.css'
import React from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase/config'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { signIn } from '../firebase/authentication'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState<User | null>()
  const [emailPass, setEamilPass] = React.useState({ email: '', password: '' })

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => {
      unsub()
    }
  }, [])

  const condiRenderComp = () => {
    return !user ? (
      <>
        <h1>Need to signin</h1>
        <input
          placeholder='Email'
          value={emailPass.email}
          onChange={(e) => {
            setEamilPass({ ...emailPass, email: e.target.value })
          }}
        />
        <input
          placeholder='Password'
          value={emailPass.password}
          onChange={(e) => {
            setEamilPass({ ...emailPass, password: e.target.value })
          }}
        />
        <button
          onClick={() => {
            signIn(emailPass.email, emailPass.password)
          }}
        >
          SignIN
        </button>
      </>
    ) : (
      <>
        <Component {...pageProps} />
        <ToastContainer autoClose={2000} position='top-right' />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Spending Record</title>
        <meta name='description' content='Record spendings' />
        <link rel='icon' href='/favicon.ico' />

        {/* windows */}
        <meta
          name='msapplication-square70x70logo'
          content='/site-tile-70x70.png'
        />
        <meta
          name='msapplication-square150x150logo'
          content='/site-tile-150x150.png'
        />
        <meta
          name='msapplication-wide310x150logo'
          content='/site-tile-310x150.png'
        />
        <meta
          name='msapplication-square310x310logo'
          content='/site-tile-310x310.png'
        />
        <meta name='msapplication-TileColor' content='#000' />
        {/* safari */}
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#000' />
        <meta name='apple-mobile-web-app-title' content='spending record' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon-180x180.png'
        />
        <meta name='application-name' content='spending record' />
        <meta name='theme-color' content='#000' />
        <link rel='icon' sizes='192x192' href='/icon-192x192.png' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      {condiRenderComp()}
    </>
  )
}

export default MyApp
