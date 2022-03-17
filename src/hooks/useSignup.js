import { useState, useEffect } from "react"
import { auth, storage } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
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
    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        // signup user:
        await createUserWithEmailAndPassword(auth, email, password)
            // upload user thumbnail


            .then((res) => {
                console.log('user signed up:', res.user)
                // dispatch login action
                dispatch({ type: 'LOGIN', payload: res.user })
                if (!isCancelled) {
                    const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
                    const storageRef = ref(storage, uploadPath)
                    const uploadTask = uploadBytesResumable(storageRef, thumbnail)
                    
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                        },
                        (err) => {
                            setError(err);
                        },
                        () => {
                             getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                updateProfile(auth.currentUser, { displayName, photoURL: downloadURL })
                            })
                        }

                    )


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