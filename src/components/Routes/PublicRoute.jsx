import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

export default function PublicRoute({component: Component, ...rest})
{
    const {currentUser} = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                if (currentUser && currentUser.emailVerified) {
                    return <Redirect to="/account" />
                } else if (currentUser && !currentUser.emailVerified) {
                    return <Redirect to="/send-new-validation" />
                } else {
                    return <Component {...props} />
                }
            }}
        >
        </Route>
    )
}