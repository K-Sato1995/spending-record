import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import styles from '../styles/Home.module.css'
import { collection, query, where, orderBy } from 'firebase/firestore'
import useFetchCollectionData from '../hooks/useFetchCollectionData'
import { format } from 'date-fns'
import type { SpendingCategory } from '../types'
import { useRouter } from 'next/router'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly spending record',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

const datasetMap = {
  Groceries: 0,
  Bills: 1,
  Rent: 2,
  Others: 3,
}

export default function Charts() {
  const [monthNum, setMonthNum] = useState<number>(0)
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

  if (error) {
    return <h1>Error</h1>
  }

  if (loading) {
    return <h1>Loading</h1>
  }

  const labels = ['Week1', 'Week2', 'Week3', 'Week4']

  let data = {
    labels,
    datasets: [
      {
        label: 'Groceries',
        data: { Week1: 0, Week2: 0, Week3: 0, Week4: 0 },
        backgroundColor: 'rgb(181, 234, 234, 0.7)',
      },
      {
        label: 'Bills',
        data: { Week1: 0, Week2: 0, Week3: 0, Week4: 0 },
        backgroundColor: 'rgb(255, 188, 188, 0.7)',
      },
      {
        label: 'Rent',
        data: { Week1: 0, Week2: 0, Week3: 0, Week4: 0 },
        backgroundColor: 'rgb(237, 246, 229, 0.7)',
      },
      {
        label: 'Others',
        data: { Week1: 0, Week2: 0, Week3: 0, Week4: 0 },
        backgroundColor: 'rgb(243, 139, 160, 0.7)',
      },
    ],
  }

  result.map((item, _i) => {
    const date = new Date(item?.date.toDate()).getDate()
    const amount = item.amount
    const category = item.category as SpendingCategory
    const datasetIndex = datasetMap[category]
    const dataset = data.datasets[datasetIndex]


    if (date <= 7) {
      dataset.data.Week1 += amount
    } else if (date <= 14) {
      dataset.data.Week2 += amount
    } else if (date <= 21) {
      dataset.data.Week3 += amount
    } else {
      dataset.data.Week4 += amount
    }
  })

  return (
    <>
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

      <Bar options={options} data={data} />
    </>
  )
}
