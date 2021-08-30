import './admin.css'
import { Button } from '@material-ui/core';

function Admin () {
    return (
     <div class="container container-admin">
         <h1>Admin</h1>
         <Button variant="contained">Utilisateurs</Button>
         <Button variant="contained">Copiétonnages</Button>
         <Button variant="contained">Lieux</Button>
         <Button variant="contained">Quartier</Button>
     </div>
    )
};
export default Admin;