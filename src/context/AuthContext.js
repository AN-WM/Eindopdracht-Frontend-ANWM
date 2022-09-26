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
        setAuthState({
            status: "pending"
        })

        const token = localStorage.getItem('token');

        if (token !== "undefined" && token !== null) {
            fetchUser(token)
            console.log()
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

    function signOut() {
        localStorage.clear();
        setAuthState({
            isAuth: false,
            user: {
                userName: "",
                userEmail: "",
                userImg: "",
                userCountry: ""
            },
        });

    }

    async function signIn(username, password) {
        try {
            const result = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signin`, {
                    "username": username,
                    "password": password,
                }
            );
            result.status === 200 && logToken(result.data.accessToken);
            return result.status;
        } catch (e) {
            console.log(e);
        }
    }

    function logToken(token) {
        localStorage.setItem('token', token);
        fetchUser(token);
    }

    async function fetchUser(token) {
        try {
            const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                }
            );
            result.status === 200 && logData(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    function logData(data) {
        setAuthState({
            isAuth: true,
            userName: data.username,
            userEmail: data.email,
            userCountry: data.info,
        })
    }

    function changeAuth() {
        setAuthState(!authState.isAuth);
    }

    const data = {
        authState,
        changeAuthFunction: changeAuth,
        signInFunction: signIn,
        signOutFunction: signOut,
        fetchUserFunction: fetchUser
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