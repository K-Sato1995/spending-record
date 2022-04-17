import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/MyPage.module.css'
import { RgbaStringColorPicker } from 'react-colorful'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { createTheme, updateTheme } from '../../firebase/theme'
import ThemeContext from '../../contexts/themeContext'

const defaultFormValue = {
  mainColor: '#141318',
  textColor: '#ffffff',
  name: '',
}

const MyPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const [formValue, setFormValue] = React.useState(defaultFormValue)

  const themes = useContext(ThemeContext)

  const currentTheme = themes.filter((theme) => theme.isApplied)[0]

  const mainColor = currentTheme ? currentTheme.mainColor : '#141318'
  const textColor = currentTheme ? currentTheme.textColor : '#fff'

  return (
    <div className={styles.mypageContainer}>
      <div
        className={styles.myPageHeader}
        style={{ backgroundColor: mainColor, color: textColor }}
      >
        <h3>MyPage</h3>
        <Link href='/'>
          <a>Back to Top</a>
        </Link>
      </div>

      <h2 className={styles.title}>Customize Theme</h2>
      <div
        className={styles.result}
        style={{ backgroundColor: formValue.mainColor }}
      >
        <h3 style={{ color: formValue.textColor }}>
          {formValue.name ? formValue.name : 'Text Color'}
        </h3>
      </div>
      <form>
        <div className={styles.formSection}>
          <h3>Name your theme(Optional)</h3>
          <input
            value={formValue.name}
            className={styles.nameForm}
            placeholder='Name'
            onChange={(e) =>
              setFormValue({ ...formValue, name: e.target.value })
            }
          />
        </div>

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
          <button
            onClick={(e) => {
              e.preventDefault()
              if (!formValue.mainColor || !formValue.textColor) {
                toast.error('You have to fill up all the fields')
                return
              }

              if(currentTheme) {
                updateTheme(currentTheme.id, { isApplied: false})
              }

              createTheme({
                ...formValue,
                uid: pid as string,
              })
              setFormValue(defaultFormValue)
            }}
          >
            Create and Apply the theme
          </button>
        </div>
      </form>

      <div className={styles.listOfThemes}>
        <h2 className={styles.title}>List of Themes</h2>
        {themes.map((item, i) => (
          <div
            className={styles.themeItem}
            key={i}
            style={{ backgroundColor: item.mainColor, color: item.textColor, display: item.isApplied ? "none" : ""}}
          >
            {item.name ? item.name : 'Text color'}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPage
