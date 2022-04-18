import { db } from '../firebase/config'
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

// this hook handles the real time data of EACH individual document 
export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for document
    useEffect(() => {
        const ref = doc(db, collection, id)

        const unsub = onSnapshot(ref, (snapshot) => {
            if (snapshot.data()) {
                setDocument({...snapshot.data(), id: snapshot.id })
                setError(null)
            }
            else {
                setError('Could not find post 🤔')
            }
        }, (err) => {
            console.log(err.message)
            setError('failed to get document')
        })

        return () => unsub()

    }, [collection, id])

    return { document, error }
}
