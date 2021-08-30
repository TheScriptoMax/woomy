// IMPORT CSS
import './admin.css'

// IMPORT MATERIAL
import { Button } from '@material-ui/core';

function Admin () {
    return (
     <div class="container container-admin">
         <h1>Admin</h1>
         <Button variant="contained">Utilisateurs</Button>
         <Button variant="contained">Lieux</Button>
     </div>
    )
};
export default Admin;