import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth } from './config'

const signUp = () => {
  alert('Beep Beep')
}

const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
    })
    .catch((error) => {
      alert('Ooops something went wrong')
    })
}

const signOut = () => {
  firebaseSignOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      alert('Ooops somethign went wrong')
    })
}

export { signUp, signIn, signOut }
