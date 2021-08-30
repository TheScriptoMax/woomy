import React, {useEffect, useState} from 'react'
import './adminacceptusers.css'
import {database} from "../../firebase";
import UserCard from "../UserCard/UserCard";

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
            <div>
                {pageLoading ? <p>Loading</p> :
                    <ul>
                        {waitingForApprovalUsers.map((user) => {
                            return <UserCard key={user.id} user={user}/>
                        })}
                    </ul>
                }
            </div>
        </div>
    )
}