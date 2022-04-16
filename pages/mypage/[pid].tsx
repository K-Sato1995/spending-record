import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/MyPage.module.css'
import { RgbaStringColorPicker } from 'react-colorful'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { createTheme } from '../../firebase/theme'

const defaultFormValue = {
  mainColor: '#141318',
  textColor: '#ffffff',
}

const MyPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const [formValue, setFormValue] = React.useState(defaultFormValue)

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.myPageHeader}>
        <h3>MyPage</h3>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </div>

      <h2>Customize Theme</h2>
      <div
        className={styles.result}
        style={{ backgroundColor: formValue.mainColor }}
      >
        <h3 style={{ color: formValue.textColor }}>Text Color</h3>
      </div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          if (!formValue.mainColor || !formValue.textColor) {
            toast.error('You have to fill up all the fields')
            return
          }
          createTheme({
            ...formValue,
            uid: pid as string,
          })
          setFormValue(defaultFormValue)
        }}
      >
        <div className={styles.formSection}>
          <h3>Choose Main Color</h3>
          <RgbaStringColorPicker
            onChange={(color) =>
              setFormValue({ ...formValue, mainColor: color })
            }
          />
        </div>

        <div className={styles.formSection}>
          <h3>Choose Text Color</h3>
          <RgbaStringColorPicker
            onChange={(color) =>
              setFormValue({ ...formValue, textColor: color })
            }
          />
        </div>
        <div className={styles.buttonList}>
          <button>Create</button>
        </div>
      </form>
    </div>
  )
}

export default MyPage
