import React, {useContext} from 'react';
import logo from "../../assets/Newslogo.png";
import blankUserIcon from "../../assets/User icon.png"
import './Header.css';
import {AuthContext} from "../../context/AuthContext";

function Header({page}) {
    const {authState: {isAuth}} = useContext(AuthContext);

    function loadSignInPage() {
        window.location.href = "/login";
    }

    function signOut() {
        console.log("We gaan uitloggen!");
    }

    return (
        <>
            <div
                className="header"
            >
                {page !== 'home'
                    ? <a href="/"><img src={logo} alt="App logo" className="header-logo"/></a>
                    : <p></p>}

                <div className="right-container">
                    {page !== 'registration' && page !== 'login'
                        ? <img
                            src={blankUserIcon}
                            alt="logged out usericon"
                            className="user-icon"
                            onClick={loadSignInPage}
                        />
                        : <p></p>}

                    {/*Don't show the button on registration and login page*/}
                    {page !== 'registration' && page !== 'login'
                        // If the user is not logged in, show a login button
                        ? isAuth === false
                            ? <button
                                type="button"
                                className="login-button"
                                onClick={loadSignInPage}
                            >
                                Login
                            </button>
                            //If the user is logged in, show a logout button
                            : <button
                                type="button"
                                className="login-button"
                                onClick={signOut}
                            >
                                Log out
                            </button>
                        : <p></p>}
                </div>
            </div>
        </>
    );
}

export default Header;