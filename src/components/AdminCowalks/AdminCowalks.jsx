// IMPORT CSS
import './admincowalks.css'

// IMPORT MATERIAL
import {Button} from '@material-ui/core';

// IMPORT REACT

import React, {useState} from "react";

// IMPORT FIREBASE
import {database} from "../../firebase";

// IMPORT COMPONENT

import BackToAdminDashboardButton from "../BackToAdminDashboardButton/BackToAdminDashboardButton";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AdminCowalkingCard from "../AdminCowalkingCard/AdminCowalkingCard";

function AdminCowalks() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchResults, setSearchResults] = useState([]);


    function handleSubmitSearch(ev) {
        ev.preventDefault();
        const rangeStart = new Date(selectedDate);
        const rangeEnd = new Date(selectedDate);
        rangeStart.setHours(rangeStart.getHours() - 2);
        rangeEnd.setHours(rangeEnd.getHours() + 2);
        database.cowalks.where("startTime", ">=", rangeStart).where("startTime", "<=", rangeEnd).orderBy("startTime","asc")
            .get()
            .then((queryResults) => {
                const tempResults = []
                queryResults.forEach(result => {
                    tempResults.push(database.formatDoc(result))
                })
                setSearchResults(tempResults);

                console.log("Requete envoyée")
            })
    }

    function viewLastCowalks() {
        database.cowalks.orderBy('createdAt', 'asc').limit(20)
            .get()
            .then((querySnapshot) => {
                const cowalksRetrieved = [];
                querySnapshot.forEach(doc => {
                    cowalksRetrieved.push(database.formatDoc(doc))
                })
                setSearchResults(cowalksRetrieved);
            })
    }



    return (

        <div className="container container-admin">
            <BackToAdminDashboardButton />
            <h1>Administration des copiétonnages</h1>
            <Button variant="contained" onClick={viewLastCowalks}>Voir les 20 dernières copiétonnages</Button>
            <form onSubmit={handleSubmitSearch}>
                <h2>Chercher un cowalk</h2>
                <h3>Par date</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                        minutesStep={5}
                    />
                </MuiPickersUtilsProvider>
                <Button type="submit" variant="contained">Rechercher</Button>
            </form>

            <div>
                <ul>
                    {searchResults.map((cowalk, index) => {
                        return <AdminCowalkingCard key={cowalk.id} cowalk={cowalk} index={index}/>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default AdminCowalks;