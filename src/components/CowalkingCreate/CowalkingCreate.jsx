
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

import {useRef, useState, useEffect} from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {TextField} from "@material-ui/core";
import {useAuth} from "../../contexts/AuthContext";

// FIREBASE
import {database} from '../../firebase'
import {useHistory} from "react-router-dom";
import {Alert} from "@material-ui/lab";

///////// PAGE DE CREATION DES COPIETONNAGE //////////


function CoWalkingCreate() {

    const [locations, setLocations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const goToRef = useRef();
    const startFromRef = useRef();

    const {currentUser} = useAuth();

    const history = useHistory();

    useEffect(() => {
        database.locations.get().then(locations => {
            const tempLocations = []
            locations.forEach(location => {
                tempLocations.push(database.formatDoc(location))
            })
            setLocations(tempLocations)
            
        })
    }, [])

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
        }).then(()=>{
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
        <TextField select inputRef={startFromRef} label="Départ">
                {locations.map((option) => (
                <option key={option.id} value={option.name}>
                {option.name}
                </option>
            ))}
            </TextField>


            <TextField select inputRef={goToRef} label="Destination">
                {locations.map((option) => (
                <option key={option.id} value={option.name}>
                {option.name}
                </option>
            ))}
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

