import { db } from '../config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import type { SpendingRecord } from '../../types'

const createSpendingRecord = async (record: SpendingRecord) => {
  const { category, amount, date, uid } = record
  try {
    await addDoc(collection(db, 'spendingRecords'), {
      category,
      amount,
      uid,
      date,
    })
    // Use notification library for this.
    alert('Successfully created the record')
  } catch (e) {
    alert('something went wrong')
  }
}

export default createSpendingRecord
