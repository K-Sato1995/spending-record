import { db } from '../config'
import { updateDoc, doc } from 'firebase/firestore'
import type { Theme } from '../../types'
import { toast } from 'react-toastify'

const updateTheme = async (
  id: string,
  theme: Omit<Theme, 'uid' | 'isApplied'>,
) => {
  const { mainColor, textColor } = theme
  const themeRef = doc(db, 'theme', id)

  try {
    await updateDoc(themeRef, {
      mainColor,
      textColor,
    })
    // Use notification library for this.
    toast.success('Successfully updated the theme')
  } catch (e) {
    toast.error('something went wrong')
  }
}

export default updateTheme
