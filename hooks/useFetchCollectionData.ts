/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import {
  Query,
  DocumentData,
  FirestoreError,
  onSnapshot,
} from 'firebase/firestore'

function useFetchCollectionData(
  query: Query<DocumentData>,
): [DocumentData[], boolean, FirestoreError | null] {
  const [result, setResult] = useState<DocumentData[]>([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const unsbscribe = onSnapshot(query, (fbData) => {
      try {
        setLoading(true)
        const data: DocumentData[] = []

        fbData.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id })
        })

        // Not sure what the best way to handle this is
        if (result.toString() !== data.toString()) {
          setResult(data)
        }
        setLoading(false)
      } catch (err: any) {
        setLoading(false)
        setError(err)
      }
    })

    return () => {
      unsbscribe()
    }
  }, [result, query])

  return [result, loading, error]
}

export default useFetchCollectionData
