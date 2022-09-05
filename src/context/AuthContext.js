import React, {createContext, useState} from 'react';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleAuth] = useState({
        isAuth: false,
        userName: "",
        userEmail: "",
        userImg: "",
        userCountry: "",
        status: 'pending'
    });

    function changeAuth() {
        toggleAuth(!isAuth.isAuth);
    }

    async function signIn(username, password) {
        try {
            const result = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signin`, {
                    "username": username,
                    "password": password,
                }
            );
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    const data = {
        isAuth,
        changeAuthFunction: changeAuth,
        signInFunction: signIn
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;