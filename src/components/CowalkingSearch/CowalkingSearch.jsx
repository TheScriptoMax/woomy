import './cowalkingsearch.css';
import  Select from '@material-ui/core/Select';
import  InputLabel from '@material-ui/core/Inputlabel';
import  MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function CoWalkingSearch() {
  const [selectedDate, handleDateChange] = useState(new Date());
    return (
      <div className="colwalkingsearch-container">
         <h2>Créer votre itinéraire</h2>
         <form className="searchform">

          <InputLabel className="label">Départ</InputLabel>

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