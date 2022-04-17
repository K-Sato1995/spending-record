import type { NextPage } from 'next'
import { useState, useEffect, useContext } from 'react'
import { db } from '../firebase/config'
import styles from '../styles/Home.module.css'
import { collection, query, where, orderBy } from 'firebase/firestore'
import useFetchCollectionData from '../hooks/useFetchCollectionData'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeContext from '../contexts/themeContext'
import { auth } from '../firebase/config'

const toJPYen = (num: number) => {
  return num.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
}

const Home: NextPage = () => {
  const router = useRouter()
  const [monthNum, setMonthNum] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const currentUser = auth.currentUser

  const themes = useContext(ThemeContext)

  const currentTheme = themes.filter((theme) => theme.isApplied)[0]

  const mainColor = currentTheme ? currentTheme.mainColor : '#141318'
  const textColor = currentTheme ? currentTheme.textColor : '#fff'
  // INFO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#syntax
  // const date = new Date(), year = date.getFullYear(), month = date.getMonth();
  // new Date(year, monthIndex, day)
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const startDate = new Date(year, month + monthNum, 1)
  const endDate = new Date(year, month + monthNum + 1, 0)

  const q = query(
    collection(db, 'spendingRecords'),
    where('uid', 'in', [
      process.env.NEXT_PUBLIC_UID1,
      process.env.NEXT_PUBLIC_UID2,
    ]),
    orderBy('date', 'asc'),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
  )

  const [result, loading, error] = useFetchCollectionData(q)

  useEffect(() => {
    const sum = result
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0)
    setTotalAmount(sum)
  }, [result])

  if (error) {
    return <h1>Error</h1>
  }

  if (loading || !currentUser) {
    return <h1>Loading</h1>
  }

  return (
    <div>
      <main className={styles.container}>
        <div className={styles.top} style={{ backgroundColor: mainColor }}>
          <Link href='/charts'>
            <a className={styles.linkToCharts} style={{ color: textColor }}>
              Charts
            </a>
          </Link>
          <Link href={`/mypage/${currentUser.uid}`}>
            <a className={styles.linkToMyPage} style={{ color: textColor }}>
              MyPage
            </a>
          </Link>

          <span className={styles.totalMoneyTag} style={{ color: textColor }}>
            Total money spent
          </span>
          <h3 className={styles.total} style={{ color: textColor }}>
            {toJPYen(totalAmount)}
          </h3>
          <button
            className={styles.newRecordButton}
            onClick={() => {
              router.push('/form')
            }}
            style={{ borderColor: mainColor, color: textColor }}
          >
            <span>+</span>
          </button>
        </div>

        <div className={styles.main}>
          {/* <button onClick={() => {signOut()}}>SignOut</button> */}

          {/* Calendar */}
          <div className={styles.targetMonth}>
            <button
              onClick={() => {
                setMonthNum(monthNum - 1)
              }}
            >
              {'<'}
            </button>
            <span>{format(startDate, 'yyyy / MM')}</span>
            <button
              onClick={() => {
                setMonthNum(monthNum + 1)
              }}
            >
              {'>'}
            </button>
          </div>

          {/* Records */}
          <div className={styles.records}>
            {!result.length ? (
              <div className={styles.noRecord}>No Record Found</div>
            ) : (
              ''
            )}

            <ul className={styles.recordsList}>
              {result.map((item, i) => (
                <li className={styles.recordItem} key={i}>
                  <span className={styles.recordCategory}>{item.category}</span>
                  <span className={styles.recordAmount}>
                    {toJPYen(item.amount)}
                  </span>
                  <span className={styles.recordDate}>
                    {format(new Date(item.date?.toDate()), 'yyyy-MM-dd')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <div className={styles.footer}>
          <Link href='/'>
            Home
          </Link>
          <Link href='/form'>
            Charts
          </Link>
        </div> */}
      </main>
    </div>
  )
}

export default Home
