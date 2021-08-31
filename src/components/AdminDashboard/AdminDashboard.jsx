import './admindashboard.css'
import {Button} from '@material-ui/core';
import {Link} from "react-router-dom";

function AdminDashboard() {
    return (

        <div className="container container-admin">
            <h1>Admin</h1>
            <Link to="/admin-users">
                <Button variant="contained">Chercher des Utilisatrices</Button>
            </Link>
            <Link to="/admin-accept-users">
                <Button variant="contained">Accepter des Utilisatrices</Button>
            </Link>
            <Link to="/admin-cowalks">
                <Button variant="contained">Copiétonnages</Button>
            </Link>
            <Link to="/admin-place">
                <Button variant="contained">Créer un lieu</Button>
            </Link>
            <Link to="/place-list">
                <Button variant="contained">Voir les lieux</Button>
            </Link>
            <Link to="/admin-district">
                <Button variant="contained">Créer un quartier</Button>
            </Link>
            <Link to="/district-list">
                <Button variant="contained">Voir les quartiers</Button>
            </Link>
        </div>
    )
}

export default AdminDashboard;