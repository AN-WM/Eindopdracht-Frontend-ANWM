import React, {useContext} from "react";
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
import PrivateRoute from "./components/PrivateRoute";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {authState: {isAuth}} = useContext(AuthContext);
    // const apiKey = '4889b0ac0f97463aa0a71286db8da667';
    // Alternate APIkey:
    const apiKey = '5d77ac405bbd4ac9972f3543df74af8c';

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
                                        apikey={apiKey}
                                    />
                                }
                            />

                            <Route
                                path="/search-results"
                                element={
                                    <Searchpage
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
                                    <PrivateRoute
                                        auth={isAuth}
                                    >
                                        <Profilepage/>
                                    </PrivateRoute>
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
