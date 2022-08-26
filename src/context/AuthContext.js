import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending'
    });

    function changeAuth() {
        toggleAuth(!isAuth.isAuth);
    }

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        changeAuthFunction: changeAuth
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;