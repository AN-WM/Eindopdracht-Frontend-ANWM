import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import Searchbar from "../../components/searchbar/Searchbar";
import Header from "../../components/header/Header";
import logo from "../../assets/Newslogo.png";
import "./Loginpage.css";

function Loginpage() {
    const {handleSubmit, formState: {errors}, register} = useForm();
    const {signInFunction} = useContext(AuthContext);
    const [signInError, toggleSignInError] = useState(false);
    const navigate = useNavigate();

    async function onFormSubmit(data) {
        toggleSignInError(false);

        //Try to sign in with provided username and password
        const returnCode = await signInFunction(data.username, data.password);
        //If sign in succeeded, proceed to home page. If not, display error message.
        returnCode === 200 ? navigate('/') : toggleSignInError(true);
    }

    return (
        <>
            <Header
                page='login'
            />

            <Searchbar/>

            <img src={logo} alt="App logo" className="large-logo"/>

            <h1>Welcome back!</h1>

            {signInError && <h4 className="error-message">The username or password you entered is incorrect</h4>}

            <form
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <input
                    type="text"
                    className="input-bar login-detail"
                    placeholder="Enter username"
                    {...register("username", {required: "Username is required"})}
                />
                {errors.username && <h4 className="error-message">{errors.username.message}</h4>}

                <input
                    type="password"
                    className="input-bar login-detail"
                    placeholder="Enter password"
                    {...register("password", {required: "Password is required"})}
                />
                {errors.password && <h4 className="error-message">{errors.password.message}</h4>}

                <button
                    type="submit"
                    id="login-button"
                >
                    Login
                </button>

            </form>

            <a
                href={"/register"}
            >
                New user? Click here to register.
            </a>
        </>

    );
}

export default Loginpage;