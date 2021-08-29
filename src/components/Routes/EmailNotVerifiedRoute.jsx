import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

export default function EmailNotVerifiedRoute({component: Component, ...rest})
{
    const {currentUser} = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                if (currentUser && currentUser.emailVerified) {
                    return <Redirect to="/account" />
                } else if (currentUser && !currentUser.emailVerified) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/login" />
                }
            }}
        >

        </Route>
    )
}