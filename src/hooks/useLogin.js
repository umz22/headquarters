import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"


// For the most part this login hook is simmilar to signIn hook and signOut hook
// except you change a lot of parameters to "login"
export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    // dispatch grabbed from AuthContext.js via useAuthContext.js hook
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        // Log the user in
        // this function is async by default so we don't need 'async' or 'await
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log('user signed out')

                // dispatch login action 
                // payload here is logging in the user
                dispatch({ type: 'LOGIN', payload: res.user })

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

    return { login, error, isPending }
}
