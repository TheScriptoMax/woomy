// IMPORT CSS
import './adminusers.css'

// IMPORT MATERIAL
import {Button, TextField} from '@material-ui/core';

// IMPORT REACT
import React, {useRef, useState} from "react";

// IMPORT FIREBASE
import {database} from "../../firebase";

// IMPORT COMPONENT
import AdminUserCard from "../AdminUserCard/AdminUserCard";
import BackToAdminDashboardButton from "../BackToAdminDashboardButton/BackToAdminDashboardButton";

function AdminUsers() {

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const userIdRef = useRef();
    const emailRef = useRef();
    const [searchResults, setSearchResults] = useState([]);

    function handleNameSearch(ev) {
        ev.preventDefault()
        if (firstnameRef.current.value.length === 0 && lastnameRef.current.value.length > 0) {
            database.users
                .where('lastname', '==', lastnameRef.current.value)
                .get()
                .then(querySnapshot => {
                    const membersRetrieved = [];
                    querySnapshot.forEach(doc => {
                        membersRetrieved.push(database.formatDoc(doc))
                    })
                    setSearchResults(membersRetrieved);
                })

        } else if (firstnameRef.current.value.length > 0 && lastnameRef.current.value.length === 0) {
            database.users
                .where('firstname', '==', firstnameRef.current.value)
                .get()
                .then(querySnapshot => {
                    const membersRetrieved = [];
                    querySnapshot.forEach(doc => {
                        membersRetrieved.push(database.formatDoc(doc))
                    })
                    setSearchResults(membersRetrieved);
                })


        } else {
            database.users
                .where('firstname', '==', firstnameRef.current.value)
                .where('lastname', '==', lastnameRef.current.value)
                .get()
                .then(querySnapshot => {
                    const membersRetrieved = [];
                    querySnapshot.forEach(doc => {
                        membersRetrieved.push(database.formatDoc(doc))
                    })
                    setSearchResults(membersRetrieved);
                })


        }


    }


    function handleIdSearch(ev) {
        ev.preventDefault()
        database.users.doc(userIdRef.current.value)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const membersRetrieved = [];
                    membersRetrieved.push(database.formatDoc(doc))
                    setSearchResults(membersRetrieved);
                }
            })

    }


    function handleEmailSearch(ev) {
        ev.preventDefault();
        database.users
            .where('email', '==', emailRef.current.value)
            .get()
            .then(querySnapshot => {
                const membersRetrieved = [];
                querySnapshot.forEach(doc => {
                    membersRetrieved.push(database.formatDoc(doc))
                })
                setSearchResults(membersRetrieved)
            })

    }

    function viewLastUsers() {

        database.users
            .orderBy('createdAt', 'desc').limit(20)
            .get()
            .then((querySnapshot) => {
                const membersRetrieved = [];
                querySnapshot.forEach(doc => {
                    membersRetrieved.push(database.formatDoc(doc))
                })
                setSearchResults(membersRetrieved);
            })
    }



    return (

        <div className="container container-admin">
            <h1>Administration des utilisatrices</h1>
            <BackToAdminDashboardButton />
            <Button variant="contained" onClick={viewLastUsers}>Voir les 20 derni??res utilisatrices</Button>
            <h2>Chercher une utilisatrice</h2>
            <h3>Par nom et pr??nom</h3>
            <form onSubmit={handleNameSearch}>
                <TextField inputRef={firstnameRef} id="standard-basic" label="Pr??nom de l'utilisatrice"
                           variant="standard"/>
                <TextField inputRef={lastnameRef} id="standard-basic" label="Nom de l'utilisatrice" variant="standard"/>
                <Button type="submit" variant="contained">Rechercher</Button>
            </form>

            <h3>Par ID</h3>
            <form onSubmit={handleIdSearch}>
                <TextField inputRef={userIdRef} id="standard-basic" label="Entrez l'id de l'utilisatrice"
                           variant="standard"/>
                <Button type="submit" variant="contained">Rechercher</Button>
            </form>

            <h3>Par Mail</h3>
            <form onSubmit={handleEmailSearch}>
                <TextField type="email" inputRef={emailRef} id="standard-basic" label="Entrez l'email de l'utilisatrice"
                           variant="standard"/>
                <Button type="submit" variant="contained">Rechercher</Button>
            </form>

            <div>
                <ul>
                    {searchResults.length === 0 ? <p>Pas d'utilisatrice</p> : searchResults.map((user) => {
                        return <AdminUserCard key={user.id} user={user}/>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default AdminUsers;