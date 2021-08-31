// IMPORT REACT
import React, {useState} from 'react'

// IMPORT MATERIAL
import {Button} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

// IMPORT FIREBASE
import {database, storage} from "../../firebase";


export default function UserCard({user}) {

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    function handleDeleteUser() {
        const deletePromises = []

        //Suppression de l'entrée dans la collection User
        deletePromises.push(database.users.doc(user.id)
            .delete())

        //Suppression des notifications
        database.notifications(user.id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(notif => {
                    deletePromises.push(database.notifications(user.id).doc(notif.id).delete())
                })
            })

        //Suppression des copiétonnages
        database.cowalks.where('owner','==',user.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(cowalk => {
                    // SUppression des membres pending du copiétonnage
                    deletePromises.push(database.cowalks.doc(cowalk.id).delete())
                    database.membersPending(cowalk.id)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(member => {
                                deletePromises.push(database.membersPending(cowalk.id).doc(member.id).delete())
                            })
                        })
                    // Suppression des membres approved du copiétonnage
                    database.membersApproved(cowalk.id)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(member => {
                                deletePromises.push(database.membersApproved(cowalk.id).doc(member.id).delete())
                            })
                        })
                })
            })

        // Suppression des images liées au compte si elles existent
        // Image de profile
        storage.ref(`/files/idProfilePictures/${user.id}/`).listAll().then((files) => {
            files.items.forEach(file => {
                deletePromises.push(file.delete())
            })
        }).catch(error => {
            console.log(error.message)
        })

        // Image de pose
        storage.ref(`/files/idPictures/${user.id}/`).listAll().then((files) => {
            files.items.forEach(file => {
                deletePromises.push(file.delete())
            })
        }).catch(error => {
            console.log('Something went wrong' + error.message)
        })
        // Référence à l'image de pose dans la bdd
        database.idPictureFiles.doc(user.id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    deletePromises.push(database.idPictureFiles.doc(user.id).delete())
                }
            })

        // Carte d'identité
        storage.ref(`/files/idCards/${user.id}/`).listAll().then((files) => {
            files.items.forEach(file => {
                deletePromises.push(file.delete())
            })
        }).catch(error => {
            console.log('Something went wrong' + error.message)
        })
        // Référence à la carte d'identité bdd
        database.idCardFiles.doc(user.id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    deletePromises.push(database.idCardFiles.doc(user.id).delete())
                }
            })


        // Résolution des promesses
        Promise.all(deletePromises)
            .then(()=> {
                setMessage('Utilisateur supprimé de la base de donnée, à supprimer égaement dans l\'authentification')
            })
            .catch(()=> {
                setError('Erreur à la suppression de l\'utilisateur');
            })
    }

    return (
        <div>
            {user.profilPic && <img src={user.profilPic} alt="Profile" /> }
            <h3>{user.firstname} {user.lastname}</h3>
            <p>utilisatrice inscrite - {user.createdAt.toString()}</p>
            <a href={`mailto:${user.email}`}>{user.email}</a>
            <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
            <Button variant="contained" onClick={handleDeleteUser}>Supprimer l'utilisateur</Button>
            {message && <Alert severity="success">{message}</Alert> }
            {error && <Alert severity="error">{error}</Alert> }
        </div>
    )
}