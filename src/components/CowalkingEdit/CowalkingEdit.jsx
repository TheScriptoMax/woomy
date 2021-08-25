
/// ----- Material UI ---- ///

import {Alert} from "@material-ui/lab";
import  InputLabel from '@material-ui/core/Inputlabel';
import  MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

/// ----- CSS ----- ///
import '../CowalkingCreate/cowalkingcreate.css';

/// ----- React Modules ----- ///

import {useEffect, useRef, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {TextField} from "@material-ui/core";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";

// FIREBASE
import {database} from '../../firebase'

///////// PAGE DE CREATION DES COPIETONNAGE //////////


function CowalkingEdit() {

  const {cowalkId} = useParams();

  const [selectedDate, handleDateChange] = useState(new Date());
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true);
  const [currentCowalk, setCurrentCowalk] = useState({});
  const goToRef = useRef();
  const startFromRef = useRef();

  const {currentUser} = useAuth();

  const history = useHistory();


  useEffect(() => {
    console.log(selectedDate)
        database.cowalks.doc(cowalkId)
            .get()
            .then((doc)=> {
              if (doc.exists) {
                setCurrentCowalk(database.formatDoc(doc))
                setPageLoading(false);
                handleDateChange(new Date(doc.data().startTime.seconds * 1000));
              } else {
                console.log("no such documensst")
              }
            }).then(() => {
        })
            .catch((error) => {
              console.log("Error getting document:", error);
            })
      }, []
  );



    return (
        <>
          {!pageLoading &&
          <div className="container">
            <h2>Créer votre itinéraire</h2>
            <form className="createform">
              <InputLabel className="label">Départ</InputLabel>
              <TextField defaultValue={currentCowalk.startFrom} inputRef={startFromRef} select>
                <MenuItem value="spdc" >SPDC</MenuItem>
                <MenuItem value="prout" >Prout</MenuItem>
                <MenuItem value="velpeau" >Velpeau</MenuItem>
              </TextField>
              <InputLabel className="label">Destination</InputLabel>
              <TextField defaultValue={currentCowalk.goTo} inputRef={goToRef} select>
                <MenuItem value="vealpeaugo" >Velpeau</MenuItem>
                <MenuItem value="spdcgo" >SPDC</MenuItem>
                <MenuItem value="prout" >Prout</MenuItem>
              </TextField>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    minutesStep={5}
                />
              </MuiPickersUtilsProvider>

              <div className="button-container">
                <Button disabled={loading} onClick={handleSubmitCowalk} type="submit" variant="contained">Créer</Button>
                {error && <Alert>{error}</Alert>}
              </div>
            </form>
          </div>}</>
    );
  }

export default CowalkingEdit;

