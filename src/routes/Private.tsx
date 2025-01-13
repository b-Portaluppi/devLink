import { ReactNode, useEffect, useState } from "react";
import { auth } from "../services/FirebaseConnerction"; 
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router";

interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps) {

    const [ loading, setLoading ] = useState(true);
    const [ signed, setSigned ] = useState(false);


    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                const usuario = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem("@reactlinks", JSON.stringify(usuario));

                setLoading(false);
                setSigned(true)
            } else {
                setLoading(false);
                setSigned(false)
            }
        })

        return () => {
            unsub();
        }
    }, [])

    if(loading) {
        return <></>
    }

    if(!signed) {
        return <Navigate to="/login" />
    }

    return children
}