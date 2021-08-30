import './adminusers.css'
import {Button, TextField} from '@material-ui/core';
import {Link} from "react-router-dom";
import React, {useRef, useState} from "react";
import {database} from "../../firebase";
import UserCard from "../UserCard/UserCard";

function AdminUsers() {

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const userIdRef = useRef();
    const emailRef = useRef();
    const [searchResults, setSearchResults] = useState([]);

    function handleNameSearch(ev) {
        ev.preventDefault()
        database.users.where('firstname', '==', firstnameRef.current.value)
            .where('lastname', '==', lastnameRef.current.value)
            .get()
            .then(querySnapshot => {
                const membersRetrieved = [];
                querySnapshot.forEach(doc => {
                    membersRetrieved.push(database.formatDoc(doc))
                })
                setSearchResults(membersRetrieved);
                console.log(membersRetrieved)
            })
            .catch(error => {
                console.log(error.message);
            })


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
                    console.log(membersRetrieved)
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }


    function handleEmailSearch(ev) {
        ev.preventDefault();
        database.users.where('email', '==', emailRef.current.value)
            .get()
            .then(querySnapshot => {
                const membersRetrieved = [];
                querySnapshot.forEach(doc => {
                    membersRetrieved.push(database.formatDoc(doc))
                })
                setSearchResults(membersRetrieved);
                console.log(membersRetrieved)
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    function viewLastUsers() {
        database.users.orderBy('createdAt', 'desc').limit(20)
            .get()
            .then((querySnapshot) => {
                const membersRetrieved = [];
                querySnapshot.forEach(doc => {
                    membersRetrieved.push(database.formatDoc(doc))
                })
                setSearchResults(membersRetrieved);
                console.log(membersRetrieved)
            })
    }


    return (

        <div className="container container-admin">
            <h1>Administration des utilisatrices</h1>
            <Button variant="contained" onClick={viewLastUsers}>Voir les 20 dernières utilisatrices</Button>
            <form onSubmit={handleNameSearch}>
                <h2>Chercher une utilisatrice</h2>
                <h3>Par nom et prénom</h3>
                <TextField inputRef={firstnameRef} id="standard-basic" label="Prénom de l'utilisatrice"
                           variant="standard"/>
                <TextField inputRef={lastnameRef} id="standard-basic" label="Nom de l'utilisatrice" variant="standard"/>
                <Button type="submit" variant="contained">Rechercher</Button>
            </form>
            <br/>
            <form onSubmit={handleIdSearch}>
                <h3>Par ID</h3>
                <TextField inputRef={userIdRef} id="standard-basic" label="Entrez l'id de l'utilisatrice"
                           variant="standard"/>
                <Button type="submit" variant="contained">Rechercher</Button>
            </form>

            <form onSubmit={handleEmailSearch}>
                <h3>Par Mail</h3>
                <TextField type="email" inputRef={emailRef} id="standard-basic" label="Entrez l'email de l'utilisatrice"
                           variant="standard"/>
                <Button type="submit" variant="contained">Rechercher</Button>
            </form>

            <div>
                <ul>
                    {searchResults.map((user) => {
                        return <UserCard key={user.id} user={user}/>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default AdminUsers;