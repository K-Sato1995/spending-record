type SpendingCategory = 'Bills' | 'Groceries' | 'Rent' | 'Others'

interface SpendingRecord {
  category: SpendingCategory
  amount: number
  uid: string
  date: any // ill look up later
}

interface Theme {
  mainColor: string
  textColor: string
  name: string
  uid: string
  isApplied: boolean
}


export { SpendingCategory, SpendingRecord, Theme }
