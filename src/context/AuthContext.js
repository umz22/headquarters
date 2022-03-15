import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return { ...state, user: action.payload}
        case 'LOGOUT':
            return { ...state, user: null}    
            // we don't need an action.payload with LOGOUT because the user is simply 'null' after logout
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const[ state, dispatch ] = useReducer(authReducer, {
        user: null,
        // don't show any of the components within app.js until a user is either logged in/out
        authIsReady: false
    })

    // onAuthStateChanged fires once to check if the user has logged in or not, then it
    // also fires whenever there is a change in authentication (logged in or out etc)
    // so this will keep track of the user's auth status
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            dispatch({ type: "AUTH_IS_READY", payload: user})
            unsub()
        })
    }, [])

    console.log('Authcontext state', state)


    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}