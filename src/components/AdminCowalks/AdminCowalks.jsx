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
import firebase from "firebase";
import {Alert} from "@material-ui/lab";

function AdminCowalks() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchResults, setSearchResults] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    function handleSubmitSearch(ev) {
        ev.preventDefault();
        const rangeStart = new Date(selectedDate);
        const rangeEnd = new Date(selectedDate);
        rangeStart.setHours(rangeStart.getHours() - 2);
        rangeEnd.setHours(rangeEnd.getHours() + 2);
        database.cowalks.where("startTime", ">=", rangeStart).where("startTime", "<=", rangeEnd).orderBy("startTime", "asc")
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


    function viewOldCowalks() {
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() - 8)
        database.cowalks.where("startTime", "<=", currentTime).orderBy("startTime", "desc")
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

    function deleteOldestCowalks() {
        const currentTime = new Date();
        currentTime.setDate(currentTime.getDate() - 15);
        const deletePromises = [];
        database.cowalks.where("startTime", "<=", currentTime).orderBy("startTime", "asc").limit(20)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(cowalk => {
                    deletePromises.push(database.cowalks.doc(cowalk.id).delete())

                    database.membersPending(cowalk.id)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                deletePromises.push(
                                    database.membersPending(cowalk.id).doc(doc.id).delete()
                                )
                            })
                        })

                    database.membersApproved(cowalk.id)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                deletePromises.push(database.users.doc(doc.id).update({
                                    approvalCowalk: firebase.firestore.FieldValue.arrayRemove(
                                        cowalk.id
                                    )
                                }))
                                deletePromises.push(
                                    database.membersApproved(cowalk.id).doc(doc.id).delete()
                                )
                            })
                        })
                })
            })

        Promise.all(deletePromises)
            .then(() => {
                console.log('Docs supprimés')
                setMessage('Copiétonnages supprimés')
            })
            .catch((error) => {
                console.log(error)
                setError('Problèmes à la suppression !')
            })

    }


    return (

        <div className="container container-admin">
            <BackToAdminDashboardButton/>
            <h1>Administration des copiétonnages</h1>
            <p>Le bouton ci-dessous affiche les copiétonnages vieux de plus de 8 heures.</p>
            <Button variant="contained" onClick={viewOldCowalks}>Voir les anciens copiétonnages</Button>
            
            <p>Le bouton ci-dessous supprimera les 20 copiétonnages les plus anciens. Les copiétonnages dont la date de départ a eu
                lieu jusque deux semaines avant la date actuelle ne seront pas pris en compte. Utilisez ce bouton à vos propres risques !</p>
            <Button variant="contained" onClick={deleteOldestCowalks}>Supprimer les copiétonnages les plus
                anciens</Button>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            

            <p>Le bouton ci-dessous affiche les 20 derniers copiétonnages créés et ordonnés par date de création.</p>
            <Button variant="contained" onClick={viewLastCowalks}>Voir les 20 dernières copiétonnages crées</Button>
            
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