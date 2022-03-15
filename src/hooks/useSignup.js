import { useState, useEffect } from "react"
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth"
// this useAuthContext.js hook is a 'gateway' into AuthContext.js
import { useAuthContext } from "./useAuthContext"


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    // dispatch grabbed from AuthContext.js via useAuthContext.js hook
    const { dispatch } = useAuthContext()


    // this hook takes in the email & password arguements 
    // which are created in firebase:
    const signup = async (email, password) => {
        setError(null)
        setIsPending(true)
        
        // signup user:
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log('user signed up:', res.user)
                // dispatch login action
                dispatch({ type: 'LOGIN', payload: res.user })
                if (!isCancelled) {
                    setIsPending(false)
                    setError(null)
                }
            })
            .catch((err) => {
                if (!isCancelled) {
                    setError(err.message)
                    setIsPending(false)
                }
            })
    }

    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}