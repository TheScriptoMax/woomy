/// ----- Material UI ----- ///

import  Select from '@material-ui/core/Select';
import  InputLabel from '@material-ui/core/Inputlabel';
import  MenuItem from '@material-ui/core/MenuItem';
import  TextField from '@material-ui/core/Textfield';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

/// ----- CSS ----- ///
import './cowalkingsearch.css';

/// ----- React Modules ----- ///
import { useState, useRef, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';

/// ----- Database ----- ///
import { database } from '../../firebase';


function CoWalkingSearch() {

    const [locations, setLocations] = useState([]);
    const locationSearchRef = useRef();
    const [selectedDate, handleDateChange] = useState(new Date());

    useEffect(() => {
        database.locations.get().then(locations => {
            const tempLocations = []
            locations.forEach(location => {
                tempLocations.push(database.formatDoc(location))
            })
            setLocations(tempLocations)
            
        })
    }, [])

    return (
      <div className=" container colwalkingsearch-container">
         <h2>Rechercher un itinéraire</h2>
         <form className="searchform">

            <TextField select inputRef={locationSearchRef} label="Départ">
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

          </form>
        <div className="separator"></div>
        {/* <ul className='cowalkingList'>
            {
                cowalks.map((cowalk,index)=><CowalkingCard cowalk={cowalk} index={index} />)
            }
        </ul> */}

      </div>
    );
  }

  export default CoWalkingSearch;