/// ----- Material UI ----- ///
import InputLabel from '@material-ui/core/Inputlabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/Textfield';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Alert} from "@material-ui/lab";

/// ----- CSS ----- ///
import './cowalkingsearch.css';

/// ----- React Modules ----- ///

import {useRef, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {database} from "../../firebase";
import Button from "@material-ui/core/Button";
import CowalkingCard from "../CowalkingCard/CowalkingCard";
import {Link} from 'react-router-dom';



function CoWalkingSearch() {
    const startFromRef = useRef();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [resultsList, setResultsList] = useState([]);
    const [noSearch, setNoSearch] = useState(true)

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

                <InputLabel className="label">Départ</InputLabel>

                <TextField defaultValue="" inputRef={startFromRef} select labelId="label" id="select">
                    <MenuItem value="velpeau">Velpeau</MenuItem>
                    <MenuItem value="spdc">SPDC</MenuItem>
                    <MenuItem value="prout">Prout</MenuItem>
                </TextField>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
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