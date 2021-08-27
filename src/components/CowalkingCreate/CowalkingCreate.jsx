
/// ----- Material UI ---- ///
import  InputLabel from '@material-ui/core/Inputlabel';
import  MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

/// ----- CSS ----- ///
import './cowalkingcreate.css';

/// ----- React Modules ----- ///

import {useEffect, useRef, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {TextField} from "@material-ui/core";
import {useAuth} from "../../contexts/AuthContext";

// FIREBASE
import {database} from '../../firebase'
import {useHistory} from "react-router-dom";
import {Alert} from "@material-ui/lab";

///////// PAGE DE CREATION DES COPIETONNAGE //////////


function CoWalkingCreate() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userData, setUserData] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const goToRef = useRef();
  const startFromRef = useRef();

  const {currentUser} = useAuth();

  const history = useHistory();

  useEffect(() => {
    database.users.doc(currentUser.uid)
        .get()
        .then(doc => {
          setUserData(database.formatDoc(doc))
        })
  }, []);

  async function handleSubmitCowalk(ev) {
    ev.preventDefault();
    try {
      setError('');
      setLoading(true)
      await database.cowalks.add({
        startFrom: startFromRef.current.value,
        goTo: goToRef.current.value,
        startTime: selectedDate,
        createdAt: database.getCurrentTimestamp,
        owner: currentUser.uid,
        contactPhone: userData.phoneNumber
      })
          .then(()=>{
            history.push("/list")
          })
    } catch(error) {
      setError(error.message)
    }
    setLoading(false);
  }


    return (
      <div className="container">
        <h2>Créer votre itinéraire</h2>
        <form className="createform">
          <InputLabel className="label">Départ</InputLabel>
          <TextField defaultValue="" inputRef={startFromRef} select>
            <MenuItem value="spdc" >SPDC</MenuItem>
            <MenuItem value="prout" >Prout</MenuItem>
            <MenuItem value="velpeau" >Velpeau</MenuItem>
          </TextField>
          <InputLabel className="label">Destination</InputLabel>
          <TextField defaultValue="" inputRef={goToRef} select>
            <MenuItem value="vealpeau" >Velpeau</MenuItem>
            <MenuItem value="spdcgo" >SPDC</MenuItem>
            <MenuItem value="prout" >Prout</MenuItem>
          </TextField>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
            value={selectedDate}
            onChange={setSelectedDate}
            minutesStep={5}
            />
          </MuiPickersUtilsProvider>
          <div className="button-container">
            <Button disabled={loading} onClick={handleSubmitCowalk} type="submit" variant="contained">Créer</Button>
            {error && <Alert severity="error">{error}</Alert>}
          </div>
        </form>
      </div>
    );
  }

export default CoWalkingCreate;

