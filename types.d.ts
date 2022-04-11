type SpendingCategory = 'Bills' | 'Groceries' | 'Rent' | 'Others'

interface SpendingRecord {
  category: SpendingCategory
  amount: number
  uid: string
  date: any // ill look up later
}

export { SpendingCategory, SpendingRecord }
