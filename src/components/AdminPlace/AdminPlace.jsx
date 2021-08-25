import './adminplace.css'
import {Button, TextField} from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

function AdminPlace () {
    return (
     <div class="container container-admin">
         <h1>Lieux</h1>
         <TextField label="Rechercher" variant="outlined"/>
         <p className="placecreate">Création d'un nouveau lieu</p>
         <form className="placeform">
            <TextField label="Lieux" variant="outlined"/>
            <TextField label="Quartier" variant="outlined" select>
                <MenuItem></MenuItem>
            </TextField>
            <TextField label="adresse approx" variant="outlined"/>
            <Button variant='contained'>submit</Button>
         </form>
        
     </div>
    )
};
export default AdminPlace;