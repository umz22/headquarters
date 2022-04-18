import { useEffect, useState } from "react"
import { auth, db } from "../firebase/config"
import { signOut } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"
import { doc, updateDoc } from "firebase/firestore";

export const useLogout = () => {
    // reusable:
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out
        const { uid } = user
        const logoutRef = doc(db, 'users', uid)
        updateDoc(logoutRef, {online: false})

        // this function is async by default so we don't need 'async' or 'await
        signOut(auth)
            .then(() => {
                console.log('user signed out')
                // dispatch logout action 
                // payload not needed here because the user is 'null' by default after they log out
                dispatch({ type: 'LOGOUT' })

                // update state
                if (!isCancelled) {
                    setIsPending(false)
                    setError(null)
                }
            })
            .catch((err) => {
                if (!isCancelled) {
                    console.log(err.message)
                    setError(err.message)
                    setIsPending(false)
                }
            })
    }

    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}