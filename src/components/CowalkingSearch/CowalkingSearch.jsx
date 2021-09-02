/// ----- Material UI ----- ///

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Alert, Autocomplete} from "@material-ui/lab";
import CowalkingCard from "../CowalkingCard/CowalkingCard";

/// ----- CSS ----- ///
import './cowalkingsearch.css';

/// ----- React Modules ----- ///
import {useState, useEffect} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {Link} from 'react-router-dom';

/// ----- Database ----- ///
import {database} from '../../firebase';


function CoWalkingSearch() {

    const [locations, setLocations] = useState([]);
    const [startFrom, setStartFrom] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [resultsList, setResultsList] = useState([]);
    const [noSearch, setNoSearch] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        database.locations.orderBy('name').get().then(locations => {
            const tempLocations = []
            locations.forEach(location => {
                tempLocations.push(database.formatDoc(location))
            })
            setLocations(tempLocations)
            setLoading(false);

        })
    }, [])

    function handleSubmitSearch(ev) {
        ev.preventDefault();
        const rangeStart = new Date(selectedDate);
        const rangeEnd = new Date(selectedDate);
        rangeStart.setHours(rangeStart.getHours() - 2);
        rangeEnd.setHours(rangeEnd.getHours() + 2);
        database.cowalks.where("startFrom", "==", startFrom.name).where("startTime", ">=", rangeStart).where("startTime", "<=", rangeEnd).orderBy("startTime")
            .get()
            .then((queryResults) => {
                const tempResults = []
                queryResults.forEach(result => {
                    tempResults.push(database.formatDoc(result))
                })
                setResultsList(tempResults);
                setNoSearch(false);

            })
    }

    function viewNextCowalks() {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() - 15)
        database.cowalks.where("startTime", ">=", currentTime).orderBy("startTime").limit(15)
            .get()
            .then((queryResults) => {
                const tempResults = []
                queryResults.forEach(result => {
                    tempResults.push(database.formatDoc(result))
                })
                setResultsList(tempResults);
                setNoSearch(false);

            })
    }

    return (
        <>
        {!loading &&
    <div className="container colwalkingsearch-container">
        <h2>Rechercher un itinéraire</h2>
        <form className="searchform ">

            <Autocomplete
                value={startFrom}
                options={locations}
                onChange={(event, newValue) => setStartFrom(newValue)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField
                    {...params}
                    variant="standard"
                    label="Choix du point de départ"
                    placeholder="Point de départ"
                    margin="normal"
                    fullWidth
                />}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minutesStep={5}
                />
            </MuiPickersUtilsProvider>

            <Button type="submit" onClick={(event) => handleSubmitSearch(event)}
                    variant="contained">Rechercher</Button>

            <Button onClick={viewNextCowalks} variant="contained">Prochains copiétonnages</Button>
        </form>

        <div className="separator"></div>
        {!noSearch &&
        <ul className='cowalkingList'>
            {resultsList.length > 0
                ? resultsList.map((cowalk, index) => <CowalkingCard key={cowalk.id} cowalk={cowalk} index={index}/>)
                : <>
                    <Alert severity="warning">Pas de copiétonnages. Pourquoi ne pas en ajouter un ?</Alert>
                    <Link to="/create">
                        <Button variant="contained">Créer un copiétonnage</Button>
                    </Link>
                </>
            }
        </ul>
        }
    </div>}
        </>
    );
}

export default CoWalkingSearch;