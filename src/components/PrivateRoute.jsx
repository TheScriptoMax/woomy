import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export default function PrivateRoute({component: Component, ...rest})
{
    const {currentUser} = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                if (currentUser && currentUser.emailVerified) {
                    return <Component {...props} />
                } else if (currentUser && !currentUser.emailVerified) {
                    return <Redirect to="/send-email" />
                } else {
                    return <Redirect to="/login" />
                }
            }}
        >

        </Route>
    )
}