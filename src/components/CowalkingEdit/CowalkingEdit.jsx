/// ----- Material UI ---- ///

import {Alert} from "@material-ui/lab";
import InputLabel from '@material-ui/core/Inputlabel';
import MenuItem from '@material-ui/core/MenuItem';
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
import {useHistory, useParams} from "react-router-dom";

// FIREBASE
import {database} from '../../firebase'

///////// PAGE DE CREATION DES COPIETONNAGE //////////


function CowalkingEdit() {

    const {cowalkId} = useParams();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true);
    const [currentCowalk, setCurrentCowalk] = useState({});
    const goToRef = useRef();
    const startFromRef = useRef();

    const history = useHistory();


    useEffect(() => {
            database.cowalks.doc(cowalkId)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        setCurrentCowalk(database.formatDoc(doc))
                        setPageLoading(false);
                        setSelectedDate(new Date(doc.data().startTime.seconds * 1000));
                    } else {
                        console.log("no such documents")
                    }
                }).then(() => {
            })
                .catch((error) => {
                    console.log("Error getting document:", error);
                })
        }, [cowalkId]
    );


    function handleSubmitCowalk(ev) {
        ev.preventDefault();

        const promises = [];
        setLoading(true);
        setError('');
        if (goToRef.current.value !== currentCowalk.goTo) {
            promises.push(database.cowalks.doc(cowalkId).update({
                goTo: goToRef.current.value,
            }))
        }

        if (startFromRef.current.value !== currentCowalk.startFrom) {
            promises.push(database.cowalks.doc(cowalkId).update({
                startFrom: startFromRef.current.value,
            }))
        }

        if (selectedDate !== new Date(currentCowalk.startTime.seconds * 1000)) {
            promises.push(database.cowalks.doc(cowalkId).update({
                startTime: selectedDate,
            }))
        }

        Promise.all(promises)
            .then(() => {
                console.log('Edit updated successfully');
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                history.push(`/ticket/${cowalkId}`);
            })
    }

    return (
        <>
            {!pageLoading &&
            <div className="container">
                <h2>Créer votre itinéraire</h2>
                <form className="createform">
                    <InputLabel className="label">Départ</InputLabel>
                    <TextField defaultValue={currentCowalk.startFrom} inputRef={startFromRef} select>
                        <MenuItem value="spdc">SPDC</MenuItem>
                        <MenuItem value="prout">Prout</MenuItem>
                        <MenuItem value="velpeau">Velpeau</MenuItem>
                    </TextField>
                    <InputLabel className="label">Destination</InputLabel>
                    <TextField defaultValue={currentCowalk.goTo} inputRef={goToRef} select>
                        <MenuItem value="vealpeaugo">Velpeau</MenuItem>
                        <MenuItem value="spdcgo">SPDC</MenuItem>
                        <MenuItem value="prout">Prout</MenuItem>
                    </TextField>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            value={selectedDate}
                            onChange={setSelectedDate}
                            minutesStep={5}
                        />
                    </MuiPickersUtilsProvider>

                    <div className="button-container">
                        <Button disabled={loading} onClick={handleSubmitCowalk} type="submit"
                                variant="contained">Modifier</Button>
                        {error && <Alert>{error}</Alert>}
                    </div>
                </form>
            </div>}
        </>
    );
}

export default CowalkingEdit;

