import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out
        // this function is async by default so we don't need 'asynch' or 'await
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