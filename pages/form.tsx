import React from 'react'
import { createSpendingRecord } from '../firebase/spendingRecords'
import { SpendingCategory } from '../types'
import styles from '../styles/Form.module.css'
import { Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Select from 'react-select'
import { toast } from 'react-toastify';

const options = [
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Bills', label: 'Bills' },
  { value: 'Rent', label: 'Rent' },
  { value: 'Others', label: 'Others' },
]

const timestamp = (datetimeStr: string) => {
  return Timestamp.fromDate(new Date(datetimeStr))
}

const uid = 'shum4q84tFOdAfORInn6QRXRUbt2'
const Form = () => {
  const router = useRouter()
  const formDefaultValue = {
    category: 'Groceries' as SpendingCategory,
    amount: 0,
    date: new Date(),
  }

  const [formValue, setFormValue] = React.useState<{
    category: SpendingCategory
    amount: number
    date: any
  }>(formDefaultValue)
  return (
    <div className={styles.formContainer}>
      <h2>Create a new record</h2>
      <form
        className={styles.form}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()

          if(!formValue.category || !formValue.amount || !formValue.date) {
            toast.error('You have to fill up all the fields')
            return
          }
          createSpendingRecord({
            ...formValue,
            date: timestamp(formValue.date),
            uid: uid,
          })

          setFormValue(formDefaultValue)
        }}
      >
        <Select
          className={styles.select}
          value={options.filter(
            (option) => option.label === formValue.category,
          )}
          placeholder='Category'
          options={options as any}
          onChange={(option: any) => {
            setFormValue({ ...formValue, category: option.value })
          }}
        />
        <input
          placeholder='Amount'
          value={formValue.amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            setFormValue({
              ...formValue,
              amount: parseInt(e.target.value) || 0,
            })
          }}
        />
        <input
          type='date'
          placeholder='Date'
          value={formValue.date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            setFormValue({ ...formValue, date: e.target.value })
          }}
        />
        <button>Create</button>
      </form>
    </div>
  )
}

export default Form
