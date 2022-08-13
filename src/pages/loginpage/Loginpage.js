import React from 'react';
import {useForm} from 'react-hook-form';
import Searchbar from "../../components/searchbar/Searchbar";
import Header from "../../components/header/Header";
import logo from "../../assets/Newslogo.png";
import "./Loginpage.css";

function Loginpage(searchtype) {
    const {handleSubmit, formState: {errors}, register} = useForm();

    function onFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <Header
                page='login'
            />

            <Searchbar
                inputType={searchtype}
            />

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