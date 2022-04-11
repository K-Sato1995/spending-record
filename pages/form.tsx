import React from 'react';
import { createSpendingRecord } from '../firebase/spendingRecords'
import { SpendingCategory } from '../types';
import styles from '../styles/Form.module.css'
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router'
import Select from "react-select";


const options = [
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Bills', label: 'Bills' },
    { value: 'Rent', label: 'Rent' },
    { value: 'Others', label: 'Others' },
];


const timestamp = (datetimeStr: string) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };

const uid = "shum4q84tFOdAfORInn6QRXRUbt2"
const Form = () => {
  const router = useRouter()
  const formDefaultValue = { category: 'Groceries' as SpendingCategory, amount: 0, date: new Date() }

  const [formValue, setFormValue] = React.useState<{
      category: SpendingCategory
      amount: number
      date: any
    }>(formDefaultValue)
    return (
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); createSpendingRecord({...formValue, date: timestamp(formValue.date), uid: uid})}}>
        <Select options={options as any} onChange={(option: any) => { setFormValue({...formValue,  category: option.value })}} />
        <input placeholder='Amount' value={formValue.amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { e.preventDefault(); setFormValue({ ...formValue, amount: parseInt(e.target.value) || 0 })}}/>
        <input type="date" value={formValue.date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { e.preventDefault(); setFormValue({ ...formValue, date: e.target.value })}}/>
        <button>Create</button>


        <button type="button" onClick={() => router.push('/')}>
         Home
        </button>
      </form>
    );
};

export default Form;