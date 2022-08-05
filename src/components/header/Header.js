import React from 'react';
import logo from "../../assets/Newslogo.png";
import blankUserIcon from "../../assets/User icon.png"
import './Header.css';

function Header({page}) {
    const pageType = page;

    function login() {
        console.log("We gaan inloggen!")
    }

    return (
        <>
            <div
                className="header"
            >
                {pageType !== 'home'
                    ? <img src={logo} alt="App logo" className="header-logo"/>
                    : <p></p>}

                <div className="right-container">
                    {pageType !== 'registration' && pageType !== 'login'
                        ? <img
                            src={blankUserIcon}
                            alt="logged out usericon"
                            className="user-icon"
                            onClick={login}
                        />
                        : <p></p>}
                    <button
                        type="button"
                        className="login-button"
                        onClick={login}
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    );
}

export default Header;