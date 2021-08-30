import React from 'react'
import {Button} from "@material-ui/core";
import {database} from "../../firebase";


export default function AdminUsersAwaitingApprovalCard({user}) {

    function handleApproveUser() {

    }

    return (
        <div>
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
            <p>{user.email}</p>
            <Button variant="contained" onClick={handleApproveUser}>Coucou</Button>
        </div>
    )
}