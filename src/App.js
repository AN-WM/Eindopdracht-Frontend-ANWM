import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Homepage from "./pages/homepage/Homepage.js"
import Searchpage from "./pages/searchpage/Searchpage.js"
import Loginpage from "./pages/loginpage/Loginpage.js"
import Profilepage from "./pages/profilepage/Profilepage.js"
import Registerpage from "./pages/registerpage/Registerpage";
import './App.css';

function App() {

    // const apiKey = '5d77ac405bbd4ac9972f3543df74af8c';
    const apiKey = '4889b0ac0f97463aa0a71286db8da667';

    return (
        <>
            <Router>
                <div
                    className="page"
                >
                    <div
                        className="inhoud"
                    >
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Homepage
                                        country="nl"
                                        apikey={apiKey}
                                    />
                                }
                            />

                            <Route
                                path="/search-results"
                                element={
                                    <Searchpage
                                        searchkey="test"
                                        country="nl"
                                        apikey={apiKey}
                                    />
                                }
                            />

                            <Route
                                path="/login"
                                element={
                                    <Loginpage/>
                                }
                            />

                            <Route
                                path="/register"
                                element={
                                    <Registerpage/>
                                }
                            />

                            <Route
                                path="/profile"
                                element={
                                    <Profilepage/>
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;
