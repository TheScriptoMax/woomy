import React, {useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {database} from "../../firebase";

export default function PublicRoute({component: Component, ...rest}) {
    const [isAccepted, setIsAccepted] = useState(false);
    const [loading, setLoading] = useState(true)
    const {currentUser} = useAuth();


    return (
        <>
            <Route
                {...rest}
                render={props => {
                    if (currentUser && currentUser.emailVerified) {
                        return <Redirect to="/account"/>
                    } else if (currentUser && currentUser.emailVerified) {
                        return <Redirect to="/awaiting-approval"/>
                    } else if (currentUser && !currentUser.emailVerified) {
                        return <Redirect to="/send-new-validation"/>
                    } else {
                        return <Component {...props} />
                    }
                }}
            >
            </Route>

        </>
    )
}