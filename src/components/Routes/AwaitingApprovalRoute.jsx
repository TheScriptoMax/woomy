import React, {useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {database} from "../../firebase";


export default function AwaitingApprovalRoute({component: Component, ...rest})
{
    const [isAccepted, setIsAccepted] = useState(false);
    const [loading, setLoading] = useState(true)
    const {currentUser} = useAuth();

    useEffect(() => {
        database.users.doc(currentUser.uid)
            .get()
            .then((doc) => {
                setIsAccepted(doc.data().accepted)
                setLoading(false)
            })
    }, [currentUser.uid])


    return (
        <>
            {!loading &&
            <Route
                {...rest}
                render={props => {
                    if (currentUser && currentUser.emailVerified && isAccepted) {
                        return <Component {...props} />
                    } else if (currentUser && currentUser.emailVerified) {
                        return <Redirect to="/awaiting-approval" />
                    } else if (currentUser){
                        return <Redirect to="/send-new-validation" />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            >
            </Route>
            }
        </>
    )
}