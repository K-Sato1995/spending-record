import { db } from '../config'
import { updateDoc, doc } from 'firebase/firestore'
import type { Theme } from '../../types'
import { toast } from 'react-toastify'

const updateTheme = async (id: string, theme: Pick<Theme, 'isApplied'>) => {
  const { isApplied } = theme
  const themeRef = doc(db, 'theme', id)

  try {
    await updateDoc(themeRef, {
      isApplied,
    })
    // Use notification library for this.
    toast.success('Successfully updated the theme')
  } catch (e) {
    toast.error('something went wrong')
  }
}

export default updateTheme
