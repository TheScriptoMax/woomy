// IMPORT REACT
import React from 'react'
import {Link} from "react-router-dom";

// IMPORT MATERIAL
import {Button} from "@material-ui/core";

export default function BackToAdminDashboardButton () {


    return (
        <Link to="/admin">
        <Button variant="contained">Retour au dashboard</Button>
        </Link>
    )
}