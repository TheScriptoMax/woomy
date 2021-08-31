// IMPORT CSS
import './admindashboard.css'

// IMPORT MATERIAL
import { Button } from '@material-ui/core';

// IMPORT REACR
import {Link} from "react-router-dom";

function AdminDashboard () {
    return (

     <div className="container container-admin">
         <h1>Admin</h1>
         <Link to="/admin-users">
         <Button variant="contained">Utilisateurs</Button>
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