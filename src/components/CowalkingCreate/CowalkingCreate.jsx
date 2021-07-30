
/// ----- Material UI ---- ///
import  Select from '@material-ui/core/Select';
import  InputLabel from '@material-ui/core/Inputlabel';
import  MenuItem from '@material-ui/core/MenuItem';
import  TextField from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';

/// ----- CSS ----- ///
import './cowalkingcreate.css';


///////// PAGE DE CREATION DES COPIETONNAGE //////////

function CoWalkingCreate() {


    return (
      <div className="container">
        <h2>Créer votre itinéraire</h2>
        <form className="createform">
            <InputLabel className="label">Départ</InputLabel>
            <Select labelId="label" id="select" >
                <MenuItem >Velpeau</MenuItem>
                <MenuItem >SPDC</MenuItem>
            </Select>
            <InputLabel className="label">Destination</InputLabel>
            <Select labelId="label" id="select" >
                <MenuItem >Velpeau</MenuItem>
                <MenuItem >SPDC</MenuItem>
            </Select> 
            <TextField
                id="time"
                label="Heure du départ"
                type="time"
                />
            <div className="button-container">
            <Button variant="contained">Créer</Button>
            </div>
        </form>
      </div>
    );
  }
  export default CoWalkingCreate;
