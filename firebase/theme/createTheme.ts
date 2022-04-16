import { db } from '../config'
import { collection, addDoc } from 'firebase/firestore'
import type { Theme } from '../../types'
import { toast } from 'react-toastify'

const createTheme = async (theme: Omit<Theme, 'isApplied'>) => {
  const { mainColor, textColor, uid } = theme
  try {
    await addDoc(collection(db, 'theme'), {
      mainColor,
      textColor,
      isApplied: true,
      uid,
    })
    // Use notification library for this.
    toast.success('Successfully created the theme')
  } catch (e) {
    toast.error('something went wrong')
  }
}

export default createTheme
