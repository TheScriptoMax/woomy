/// ----- Material UI ---- ///

import {Alert} from "@material-ui/lab";
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

/// ----- CSS ----- ///
import '../CowalkingCreate/cowalkingcreate.css';

/// ----- React Modules ----- ///

import {useEffect, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {TextField} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";

// FIREBASE
import {database} from '../../firebase'

///////// PAGE DE CREATION DES COPIETONNAGE //////////


function CowalkingEdit() {

    const {cowalkId} = useParams();

    const [locations, setLocations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true);
    const [currentCowalk, setCurrentCowalk] = useState({});
    const [goTo,setGoTo] = useState()
    const [startFrom,setStartFrom] = useState()

    const history = useHistory();

    useEffect(() => {
        database.locations.orderBy('name').get().then(locations => {
            const tempLocations = []
            locations.forEach(location => {
                tempLocations.push(database.formatDoc(location))
            })
            setLocations(tempLocations)
            
        })
    }, [])

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
        }, [cowalkId] ); // eslint-disable-line react-hooks/exhaustive-deps


    function handleSubmitCowalk(ev) {
        ev.preventDefault();

        const promises = [];
        setLoading(true);
        setError('');

        if (startFrom !== currentCowalk.startFrom) {
            promises.push(database.cowalks.doc(cowalkId).update({
                startFrom: startFrom,
            }))
        }
        

        if (goTo !== currentCowalk.goTo) {
            promises.push(database.cowalks.doc(cowalkId).update({
                goTo: goTo,
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
            {!pageLoading && currentCowalk &&
            <div className="container">
                <h2>Modifiez votre itinéraire</h2>
                <form className="createform">
                    <InputLabel className="label">Départ</InputLabel>
                    <TextField defaultValue={currentCowalk.startFrom}  value={startFrom} onChange={(event)=>setStartFrom(event.target.value)} select>
                        {locations.map((option) => (
                            <option key={option.id} value={option.name}>
                            {option.name}
                            </option>
                        ))}
                    </TextField>
                    <InputLabel className="label">Destination</InputLabel>
                    <TextField  defaultValue={currentCowalk.goTo} value={goTo} onChange={(event)=>setGoTo(event.target.value)} select>
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

