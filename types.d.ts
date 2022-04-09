type SpendingCategory = "Bills" | "Groceries" | "Rent"

interface SpendingRecord {
    category: SpendingCategory 
    amount: number 
    date: any // ill look up later
}


export { SpendingCategory, SpendingRecord }