import './cowalkingcreate.css';
import  Select from '@material-ui/core/Select';
import  InputLabel from '@material-ui/core/Inputlabel';
import  MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';




function CoWalkingCreate() {
  const [selectedDate, handleDateChange] = useState(new Date());

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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
            value={selectedDate}
            onChange={handleDateChange}
            minutesStep={5}
            />
          </MuiPickersUtilsProvider>
          <div className="button-container">
            <Button variant="contained">Créer</Button>
          </div>
        </form>
      </div>
    );
  }
  export default CoWalkingCreate;