import React from 'react';
import {Navigate} from "react-router-dom";

const PrivateRoute = ({auth, children}) => {
    //Check authorisation status. Not authorised? Redirect to homepage.
    if (!auth) {
        return <Navigate to="/" replace/>;
    }
    // Authorised? Proceed to given children.
    else return children;
};

export default PrivateRoute;