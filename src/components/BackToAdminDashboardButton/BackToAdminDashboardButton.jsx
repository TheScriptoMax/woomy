import React from 'react'
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

export default function BackToAdminDashboardButton () {


    return (
        <Link to="/admin">
        <Button variant="contained">Retour au dashboard</Button>
        </Link>
    )
}