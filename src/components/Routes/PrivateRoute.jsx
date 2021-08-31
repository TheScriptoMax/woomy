import React, {useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {database} from "../../firebase";

export default function PrivateRoute({component: Component, ...rest})
{
    const [loading, setLoading] = useState(true)
    const [isAccepted, setIsAccepted] = useState(false)
    const {currentUser} = useAuth();

    useEffect(() => {
        if (currentUser){
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setIsAccepted(doc.data().accepted)
                setLoading(false)
            })}
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {!loading &&
            <Route
                {...rest}
                render={props => {
                    if (currentUser && currentUser.emailVerified && isAccepted) {
                        return <Component {...props} />
                    } else if (currentUser && currentUser.emailVerified && !isAccepted) {
                        return <Redirect to="/awaiting-approval"/>
                } else if (currentUser && !currentUser.emailVerified && !isAccepted) {
                    return <Redirect to="/send-new-validation"/>
                }else {
                        return <Redirect to="/login"/>
                    }
                }}
            >
            </Route>
            }
        </>
    )
}