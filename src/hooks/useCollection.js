import { onSnapshot, collection, where, whereField, query, orderBy } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react'
import { db } from '../firebase/config'


export const useCollection = (collections, _q ) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)    
    // const {user} = useAuthContext()

    // order query
    // const order = useRef(_o).current
    // setup query
    const q = useRef(_q).current

    // first you make a reference to the current state of the uid from home.js
    // if the uid reference gets changed from home.js, the state gets re-evaluated 
    // and the firestore query below runs to match the new uSid content 

    useEffect(() => {
        let ref = collection(db, collections)

        if (q) {
            ref = query(ref, where("assignedUsersIds", 'array-contains', q))
            // we make a reference to the firestore collection (ref) and we only want to see 
            // items in that collection "where" the items are query'd with the following condition:
            // ["uid", "==", user.uid]))
        }

        // if (order) {
        //     ref = query(ref, orderBy(...order))
        // }

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach((doc) => {
                results.push({...doc.data(), id: doc.id })
            })
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('could not fetch data')
        })

        // unsubscribe on unmount
        return () => unsub()
        
    }, [collections, q ])


    return { documents, error }
}
