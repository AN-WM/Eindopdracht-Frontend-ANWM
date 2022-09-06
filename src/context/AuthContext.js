import React, {createContext, useState, useEffect} from 'react';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: {
            userName: "",
            userEmail: "",
            userImg: "",
            userCountry: ""
        },
        status: 'pending'
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token !== "undefined") {
            fetchUser(token)
            setAuthState({
                status: 'done'
            })
        } else {
            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            })
        }
        // eslint-disable-next-line
    }, []);

    async function fetchUser(token) {
        try {
            const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                }
            );
            console.log(result);
            result.status === 200 && logData(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    function changeAuth() {
        setAuthState(!authState.isAuth);
    }

    function logData(data) {
        console.log(data.accessToken);
        setAuthState({
            isAuth: true,
            userName: data.username,
            userEmail: data.email,
        })
        localStorage.setItem('token', data.accessToken);
        // window.location.href = "/profile";
    }

    async function signIn(username, password) {
        try {
            const result = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signin`, {
                    "username": username,
                    "password": password,
                }
            );
            result.status === 200 && logData(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    const data = {
        authState,
        changeAuthFunction: changeAuth,
        signInFunction: signIn
    }

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;