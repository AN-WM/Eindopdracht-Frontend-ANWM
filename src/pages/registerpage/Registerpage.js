import React from 'react';
import {useForm} from "react-hook-form";
import Header from "../../components/header/Header";
import Searchbar from "../../components/searchbar/Searchbar";
import logo from "../../assets/Newslogo.png";
import "./Registerpage.css";

function Registerpage({searchtype}) {
    const {handleSubmit, formState: {errors}, register, watch} = useForm();

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

            <h1>Welcome!</h1>

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
                        minLength: {value: 6, message: "Username must have more than 6 characters"},
                    })}
                />
                {errors.username && <p>{errors.username.message}</p>}

                <input
                    type="password"
                    className="input-bar login-detail"
                    placeholder="Enter password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password should have at least 6 characters"
                        },
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <input
                    type="password"
                    className="input-bar login-detail"
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                        required: "Confirmed password is required",
                        validate: (value: string) => {
                            if (watch('password') !== value) {
                                return "Your passwords do not match";
                            }
                        }
                    })}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

                <input
                    type="email"
                    className="input-bar login-detail"
                    placeholder="Enter e-mail address"
                    {...register("email", {
                        required: "E-mail is required",
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}

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