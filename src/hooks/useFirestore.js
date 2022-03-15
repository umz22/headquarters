import { useReducer, useEffect, useState } from "react"
import { db, timestamp } from "../firebase/config"
import { collection, deleteDoc } from 'firebase/firestore'
import { addDoc } from '@firebase/firestore';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {success: false, isPending: true, error: null, document: null}
    case "ERROR":
      return {success: false, isPending: false, error: action.payload, document: null}
    case "ADDED_DOCUMENT":
      return {success: true, isPending: false, error: null, document: action.payload}
    case "DELETED_DOCUMENT":
      return {success: true, isPending: false, error: null, document: action.payload}
    default:
      return state
  }
}

export const useFirestore = (collections) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = collection(db, collections)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }
  
  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const createdAt = timestamp;
      const addedDocument = await addDoc(ref, { ...doc, createdAt })
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
    }

  }

  // delete a document
  const deleteDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING'})

    try {
      const deletedDocument = await deleteDoc(doc(ref, doc))
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: deletedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete'})

    }
  }

  // cleanup
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }

}