/// ----- Material UI ----- ///
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Alert} from "@material-ui/lab";
import CowalkingCard from "../CowalkingCard/CowalkingCard";

/// ----- CSS ----- ///
import './cowalkingsearch.css';

/// ----- React Modules ----- ///
import { useState, useRef, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {Link} from 'react-router-dom';

/// ----- Database ----- ///
import { database } from '../../firebase';


function CoWalkingSearch() {

    const [locations, setLocations] = useState([]);
    const startFromRef = useRef();
    const [selectedDate, handleDateChange] = useState(new Date());
    const [resultsList, setResultsList] = useState([]);
    const [noSearch, setNoSearch] = useState(true)

    useEffect(() => {
        database.locations.orderBy('name').get().then(locations => {
            const tempLocations = []
            locations.forEach(location => {
                tempLocations.push(database.formatDoc(location))
            })
            setLocations(tempLocations)
            
        })
    }, [])

    function handleSubmitSearch(ev) {
        ev.preventDefault();
        const rangeStart = new Date(selectedDate);
        const rangeEnd = new Date(selectedDate);
        rangeStart.setHours(rangeStart.getHours() - 2);
        rangeEnd.setHours(rangeEnd.getHours() + 2);
        database.cowalks.where("startFrom", "==", startFromRef.current.value).where("startTime", ">=", rangeStart).where("startTime", "<=", rangeEnd).orderBy("startTime")
            .get()
            .then((queryResults) => {
                const tempResults = []
                queryResults.forEach(result => {
                    tempResults.push(database.formatDoc(result))
                })
                setResultsList(tempResults);
                setNoSearch(false);
                console.log(tempResults)
                console.log("Requete envoyée")
            })
    }

    return (
      <div className=" container colwalkingsearch-container">
         <h2>Rechercher un itinéraire</h2>
         <form onSubmit={handleSubmitSearch} className="searchform">

            <TextField select inputRef={startFromRef} label="Départ">
                {locations.map((option) => (
                <option key={option.id} value={option.name}>
                {option.name}
                </option>
            ))}
            </TextField>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                value={selectedDate}
                onChange={handleDateChange}
                minutesStep={5}
              />
            </MuiPickersUtilsProvider>

            <Button type="submit" variant="contained">Rechercher</Button>

          </form>

          <div className="separator"></div>
            {!noSearch &&
                <ul className='cowalkingList'>
                {resultsList.length > 0
                    ? resultsList.map((cowalk,index)=><CowalkingCard cowalk={cowalk} index={index} />)
                    : <>
                        <Alert severity="warning">Pas de copiétonnages. Pourquoi ne pas en ajouter un ?</Alert>
                        <Link to="/create">
                        <Button variant="contained">Créer un copiétonnage</Button>
                        </Link>
                    </>

                }
            </ul>

            }

        </div>
    );
}

export default CoWalkingSearch;