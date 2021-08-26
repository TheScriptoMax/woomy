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

import {useRef, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {database} from "../../firebase";
import Button from "@material-ui/core/Button";


function CoWalkingSearch() {
    const startFromRef = useRef();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [resultsList, setResultsList] = useState([])

  function handleSubmitSearch(ev) {
      ev.preventDefault();
      const startTimeRange = {
          rangeStart: new Date(selectedDate - 2*3600*1000),
          rangeEnd: new Date(selectedDate + 2*3600*1000),
      }
      database.cowalks.where("startFrom", "==", startFromRef.current.value).where("startTime", ">=",startTimeRange.rangeStart).where("startTime", "<=",startTimeRange.rangeEnd)
          .get()
          .then((queryResults) => {
              queryResults.forEach(result=> {
                  console.log(result.id, "=>", result.data())
              })
              console.log("Requete envoyée")

          })


  }

    return (
      <div className=" container colwalkingsearch-container">
         <h2>Rechercher un itinéraire</h2>
         <form onSubmit={handleSubmitSearch} className="searchform">

          <InputLabel className="label">Départ</InputLabel>

            <TextField defaultValue="" inputRef={startFromRef} select labelId="label" id="select" >
              <MenuItem value="velpeau" >Velpeau</MenuItem>
                <MenuItem value="spdc" >SPDC</MenuItem>
                <MenuItem value="prout" >Prout</MenuItem>
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
        {
            /* <ul className='cowalkingList'>
            {
                cowalks.map((cowalk,index)=><CowalkingCard cowalk={cowalk} index={index} />)
            }
        </ul> */
        }

      </div>
    );
  }

  export default CoWalkingSearch;