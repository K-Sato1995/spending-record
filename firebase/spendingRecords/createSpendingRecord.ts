import { db } from '../config'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import type { SpendingRecord } from '../../types';

const createSpendingRecord = async (record: Omit<SpendingRecord, 'date'>) => {
    const { category, amount, uid } = record
    try {
        await addDoc(collection(db, "spendingRecords"), {
            category,
            amount,
            uid,
            date: serverTimestamp()
        })
        // Use notification library for this.
        alert('Successfully created the record')
    } catch (e) {
        alert("something went wrong")
    }
}

export default createSpendingRecord