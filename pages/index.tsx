import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { collection, query, where, orderBy } from 'firebase/firestore'
import useFetchCollectionData from '../hooks/useFetchCollectionData'
import { format } from 'date-fns'
import { useRouter } from 'next/router'

const toJPYen = (num: number) => {
  return num.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
}

const Home: NextPage = () => {
  const router = useRouter()
  const [monthNum, setMonthNum] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  // INFO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#syntax
  // const date = new Date(), year = date.getFullYear(), month = date.getMonth();
  // new Date(year, monthIndex, day)
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const startDate = new Date(year, month + monthNum, 1)
  const endDate = new Date(year, month + monthNum + 1, 0)

  const uid = 'shum4q84tFOdAfORInn6QRXRUbt2'
  const q = query(
    collection(db, 'spendingRecords'),
    where('uid', '==', uid),
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

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <div>
      <Head>
        <title>Spending Record</title>
        <meta name='description' content='Record spendings' />
        <link rel='icon' href='/favicon.ico' />

          {/* windows */}
          <meta
            name="msapplication-square70x70logo"
            content="/site-tile-70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="/site-tile-150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="/site-tile-310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="/site-tile-310x310.png"
          />
          <meta name="msapplication-TileColor" content="#000" />
          {/* safari */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#000" />
          <meta name="apple-mobile-web-app-title" content="myapp" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon-180x180.png"
          />
          {/* 一般 */}
          <meta name="application-name" content="myapp" />
          <meta name="theme-color" content="#000" />
          <meta name="description" content="this is myapp" />
          <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
      </Head>

      <main className={styles.container}>
        <div className={styles.top}>
          <span>Total money spent</span>
          <h3 className={styles.total}>{toJPYen(totalAmount)}</h3>
          <button
            className={styles.newRecordButton}
            onClick={() => {
              router.push('/form')
            }}
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
