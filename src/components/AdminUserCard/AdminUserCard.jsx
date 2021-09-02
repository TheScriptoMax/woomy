// IMPORT REACT
import React, {useState} from 'react'

import './adminusercard.css'
// IMPORT MATERIAL
import {Button} from "@material-ui/core";
import { Avatar } from '@material-ui/core';
import {Alert} from "@material-ui/lab";

// IMPORT FIREBASE
import {database, storage} from "../../firebase";


export default function UserCard({user}) {

    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
    const [message, setMessage] = useState('');

    const showConfirmAction = () => {
        setShowConfirm(!showConfirm);
    }

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
        })

        // Image de pose
        storage.ref(`/files/idPictures/${user.id}/`).listAll().then((files) => {
            files.items.forEach(file => {
                deletePromises.push(file.delete())
            })
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
                setMessage('Utilisateur supprimé de la base de donnée, à supprimer également dans l\'authentification')
                setShowConfirm(false);
                setButtonIsDisabled(true);
            })
            .catch(()=> {
                setError('Erreur à la suppression de l\'utilisateur');
            })
    }

    return (
        <div className="admin-user-card">
            {user.profilPic && <img src={user.profilPic} alt="Profile" className="profile-pic"/> }
            {!user.profilPic && <Avatar/> }
            <h3>{user.firstname} {user.lastname}</h3>
            <p><b>utilisatrice inscrite</b> - {new Date(user.createdAt.seconds*1000).toLocaleString('fr-FR',{timeZone:"Europe/Paris",day:"numeric",month:"short", hour:"2-digit",minute:"2-digit"})}</p>
            <p><b>ID de l'utilisatrice :</b> {user.id}</p>
            <p><b>Email : </b><a href={`mailto:${user.email}`}>{user.email}</a></p>
            <p><b>Téléphone : </b><a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a></p>
            <Button disabled={showConfirm} color="secondary" variant="contained" onClick={showConfirmAction}>Supprimer</Button>
            {showConfirm && 
                <div>
                    <Alert severity="warning">Voulez-vous vraiment supprimer cette utilisatrice ? Cette action est irréversible !</Alert>
                    <div className="confirm-btns">
                        <span>
                            <Button disabled={buttonIsDisabled} color="secondary" variant="contained" onClick={handleDeleteUser}>Supprimer</Button>
                        </span>
                        <span>
                            <Button disabled={buttonIsDisabled} variant="contained" onClick={showConfirmAction}>Annuler</Button>
                        </span>
                    </div>
                </div>
                }


            {message && <Alert severity="success">{message}</Alert> }
            {error && <Alert severity="error">{error}</Alert> }
        </div>
    )
}