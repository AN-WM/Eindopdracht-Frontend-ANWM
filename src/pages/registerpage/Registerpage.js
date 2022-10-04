import React, {useState, useContext} from 'react';
import {useForm} from "react-hook-form";
import Header from "../../components/header/Header";
import Searchbar from "../../components/searchbar/Searchbar";
import logo from "../../assets/Newslogo.png";
import greenTick from "../../assets/Green tick.png";
import redCross from "../../assets/Red cross.png";
import "./Registerpage.css";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

function Registerpage() {
    const {signInFunction} = useContext(AuthContext);
    const {handleSubmit, register, watch} = useForm();
    const [errorMessage, setErrorMessage] = useState("Something went wrong");
    const [error, toggleError] = useState(false);
    const navigate = useNavigate();
    const passwordCheck = new RegExp(/(?=.*[^A-Za-z0-9])(?=.*\d)/);
    const emailCheck = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

    function confirmRegistration(data) {
        signInFunction(data.username, data.password);
        navigate('/profile')
    }

    async function registerUser(data) {
        toggleError(false);
        setErrorMessage("Something went wrong");

        try {
            const {status} = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signup`, {
                    "username": data.username,
                    "email": data.email,
                    "password": data.password,
                    "role": ["user"]
                }
            );
            toggleError(false);
            status === 200 && confirmRegistration(data);
        } catch (e) {
            setErrorMessage(e.response.data.message);
            toggleError(true);
        }
    }

    function onFormSubmit(data) {
        registerUser(data);
    }

    return (
        <>
            <Header
                page='login'
            />

            <Searchbar/>

            <img src={logo} alt="App logo" className="large-logo"/>

            <h1>Welcome!</h1>

            {error && <h4 className="error-message">{errorMessage}</h4>}

            <form
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <input
                    type="text"
                    className="input-bar login-detail"
                    placeholder="Enter username"
                    maxLength="20"
                    {...register("username", {
                        required: "Username is required",
                        minLength: {value: 6},
                    })}
                />

                {/*Check whether username has the required length, and display validation symbol accordingly*/}
                <div className="validation">
                    {watch("username") && watch("username").length >= 6 && watch("username").length <= 20
                        ? <img src={greenTick} alt="valid" className="validation-icon"/>
                        : <img src={redCross} alt="invalid" className="validation-icon"/>
                    }
                    <p id="requirement">Username must be between 6-20 characters</p>
                </div>

                <input
                    type="password"
                    className="input-bar login-detail"
                    placeholder="Enter password"
                    maxLength="20"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {value: 6}, pattern: passwordCheck
                    })}
                />

                {/*Check whether password has the required length, and display validation requirements accordingly*/}
                <div className="validation">
                    {watch("password") && watch("password").length >= 6 && watch("password").length <= 20
                        ? <img src={greenTick} alt="valid" className="validation-icon"/>
                        : <img src={redCross} alt="invalid" className="validation-icon"/>
                    }
                    <p id="requirement">Password must be between 6-20 characters</p>
                </div>

                {/*Check whether password has at least one symbol and one number, and display validation requirements accordingly*/}
                <div className="validation">
                    {passwordCheck.test(watch("password"))
                        ? <img src={greenTick} alt="valid" className="validation-icon"/>
                        : <img src={redCross} alt="invalid" className="validation-icon"/>
                    }
                    <p id="requirement">Must contain at least one symbol and one number</p>
                </div>

                <input
                    type="password"
                    className="input-bar login-detail"
                    placeholder="Confirm password"
                    maxLength="20"
                    {...register("confirmPassword", {
                        required: "Confirmed password is required",
                        validate: (value: string) => {
                            if (watch('password') !== value) {
                                return "Your passwords do not match";
                            }
                        }
                    })}
                />

                {/*Check whether both passwords match, and display validation requirements accordingly*/}
                <div className="validation">
                    {watch("password") && watch("password") === watch("confirmPassword")
                        ? <img src={greenTick} alt="valid" className="validation-icon"/>
                        : <img src={redCross} alt="invalid" className="validation-icon"/>
                    }
                    <p id="requirement">Passwords must match</p>
                </div>

                <input
                    type="email"
                    className="input-bar login-detail"
                    placeholder="Enter e-mail address"
                    {...register("email", {
                        required: "E-mail is required", pattern: emailCheck
                    })}
                />

                {/*Check whether e-mail address is valid, and display validation requirements accordingly*/}
                <div className="validation">
                    {emailCheck.test(watch("email"))
                        ? <img src={greenTick} alt="valid" className="validation-icon"/>
                        : <img src={redCross} alt="invalid" className="validation-icon"/>
                    }
                    <p id="requirement">Must be a valid e-mail address</p>
                </div>

                <button
                    type="submit"
                    id="register-button"
                >
                    Register
                </button>

            </form>

            <a
                href={"/login"}
            >
                Already have an account? Log in here.
            </a>
        </>

    );
}

export default Registerpage;