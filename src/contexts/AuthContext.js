import {auth} from '../firebase';
import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext(undefined);

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function signup(email, password) {
        const newUserCredentials = await auth.createUserWithEmailAndPassword(email, password)
        await newUserCredentials.user.sendEmailVerification();

        return newUserCredentials;
    }

    async function reSendEmail(){
        const newEmailVerification = await auth.currentUser.sendEmailVerification();
        return newEmailVerification;
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }


    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    const value ={
        currentUser,
        signup,
        login,
        logout,
        reSendEmail,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}