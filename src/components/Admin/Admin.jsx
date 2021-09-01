// IMPORT CSS
import './admin.css'

// IMPORT MATERIAL
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Admin () {
    return (
     <div className="container container-admin">
         <h1>Admin</h1>
            <Button variant="contained">Utilisateurs</Button>
            <Link to="/adminplace">
            <Button variant="contained">Lieux</Button>
         </Link>
     </div>
    )
};
export default Admin;