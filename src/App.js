import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Homepage from "./pages/homepage/Homepage.js"
import Searchpage from "./pages/searchpage/Searchpage.js"
import Articlepage from "./pages/articlepage/Articlepage.js"
import Loginpage from "./pages/loginpage/Loginpage.js"
import Profilepage from "./pages/profilepage/Profilepage.js"
import './App.css';

function App() {

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
                                        searchtype="article"
                                        country="nl"
                                        apikey={apiKey}
                                    />
                                }
                            />

                            <Route
                                path="/:article-id"
                                element={<Articlepage/>}
                            />

                            <Route
                                path="/login"
                                element={<Loginpage/>}
                            />

                            <Route
                                path="/profile"
                                element={<Profilepage/>}
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;
