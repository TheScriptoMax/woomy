// IMPORT REACT
import React, {useEffect, useState} from 'react'

// IMPORT CSS
import './adminacceptusers.css'

// IMPORT FIREBASE
import {database} from "../../firebase";

// IMPORT COMPONENT
import AdminUsersAwaitingApprovalCard from "../AdminUsersAwaitingApprovalCard/AdminUsersAwaitingApprovalCard";
import BackToAdminDashboardButton from "../BackToAdminDashboardButton/BackToAdminDashboardButton";

export default function AdminAcceptUsers() {
    const [waitingForApprovalUsers, setWaitingForApprovalUsers] = useState([]);
    const [pageLoading, setPageLoading] = useState(true)

    useEffect(() => {
        database.users.where('accepted', '==',false)
            .get()
            .then(querySnapshot => {
                const tempMembers = []
                querySnapshot.forEach(user => {
                    tempMembers.push(database.formatDoc(user))
                })
                setWaitingForApprovalUsers(tempMembers)
                setPageLoading(false)
            })

    }, [])

    return (

        <div className="container container-admin">
                <BackToAdminDashboardButton />
                <h1>Approbation des utilisatrices</h1>
                {pageLoading ? <p>Loading</p> : waitingForApprovalUsers.length === 0 ? <p>Pas d'utilisatrice à approuver</p> :
                    <ul>
                        {waitingForApprovalUsers.map((user) => {
                            return <AdminUsersAwaitingApprovalCard key={user.id} user={user}/>
                        })}
                    </ul>
                }
        </div>
    )
}