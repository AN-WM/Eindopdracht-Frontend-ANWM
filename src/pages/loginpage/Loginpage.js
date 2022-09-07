import React, {useContext} from 'react';
import {useForm} from 'react-hook-form';
import Searchbar from "../../components/searchbar/Searchbar";
import Header from "../../components/header/Header";
import logo from "../../assets/Newslogo.png";
import "./Loginpage.css";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

function Loginpage() {
    const {handleSubmit, formState: {errors}, register} = useForm();
    const {signInFunction} = useContext(AuthContext);
    const navigate = useNavigate();

    function onFormSubmit(data) {
        signInFunction(data.username, data.password);
        navigate('/profile');
    }

    return (
        <>
            <Header
                page='login'
            />

            <Searchbar/>

            <img src={logo} alt="App logo" className="large-logo"/>

            <h1>Welcome back!</h1>

            <form
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <input
                    type="text"
                    className="input-bar login-detail"
                    placeholder="Enter username"
                    {...register("username", {required: "Username is required"})}
                />
                {errors.username && <p>{errors.username.message}</p>}

                <input
                    type="password"
                    className="input-bar login-detail"
                    placeholder="Enter password"
                    {...register("password", {required: "Password is required"})}
                />
                {errors.password && <p>{errors.password.message}</p>}

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