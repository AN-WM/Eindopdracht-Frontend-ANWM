import React, {useContext} from 'react';
import logo from "../../assets/Newslogo.png";
import blankUserIcon from "../../assets/User icon.png"
import './Header.css';
import {AuthContext} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

function Header({page}) {
    const {authState: {isAuth}, signOutFunction} = useContext(AuthContext);
    const navigate = useNavigate();

    function iconClicked() {
        //If user is logged in, navigate to profile page, otherwise redirect to login page
        isAuth ? navigate("/profile") : navigate("/login");
    }

    function signIn() {
        navigate("/login");
    }

    function signOut() {
        signOutFunction();
        navigate("/");
    }

    return (
        <>
            <div
                className="header"
            >
                {page !== 'home'
                    ? <Link to="/"><img src={logo} alt="App logo" className="header-logo"/></Link>
                    : <p></p>}

                <div className="right-container">
                    {page !== 'registration' && page !== 'login'
                        ? <img
                            src={blankUserIcon}
                            alt="logged out usericon"
                            className="user-icon"
                            onClick={iconClicked}
                        />
                        : <p></p>}

                    {/*Don't show the button on registration and login page*/}
                    {page !== 'registration' && page !== 'login'
                        // If the user is not logged in, show a login button
                        ? isAuth === true
                            ? <button
                                type="button"
                                className="login-button"
                                onClick={signOut}
                            >
                                Log out
                            </button>
                            //If the user is logged in, show a logout button
                            : <button
                                type="button"
                                className="login-button"
                                onClick={signIn}
                            >
                                Login
                            </button>
                        : <p></p>}
                </div>
            </div>
        </>
    );
}

export default Header;