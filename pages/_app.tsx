import '../styles/globals.css'
import React from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { signIn } from '../firebase/authentication'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState<User | null>()
  const [emailPass, setEamilPass] = React.useState({email: '', password: ''})
 
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

  if (!user) {
    return (
      <>
        <h1>Need to signin</h1>
        <input placeholder='Email' value={emailPass.email} onChange={(e) => { setEamilPass({...emailPass, email: e.target.value})}}/>
        <input placeholder='Password'value={emailPass.password} onChange={(e) => { setEamilPass({...emailPass, password: e.target.value})}}/>
        <button
          onClick={() => {
            signIn(emailPass.email, emailPass.password)
          }}
        >
          SignIN
        </button>
      </>
    )
  }

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer autoClose={2000} position='top-right' />
    </>
  )
}

export default MyApp
