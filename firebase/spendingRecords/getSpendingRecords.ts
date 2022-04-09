import { db } from '../config'
import { collection, getDocs, DocumentData } from "firebase/firestore";

const getSpendingRecords = async () => {
    let result: DocumentData[] = []
    const querySnapshot = await getDocs(collection(db, "spendingRecords"));

    querySnapshot.forEach((doc) => {
        result.push(doc.data())
    });

    return result
}

export default getSpendingRecords