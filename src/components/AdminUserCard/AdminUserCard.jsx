import React from 'react'
import {Button} from "@material-ui/core";
import {database, storage} from "../../firebase";


export default function UserCard({user}) {

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
            console.log('Something went wrong' + error.message)
        })

        // Image de pose
        storage.ref(`/files/idPictures/${user.id}/`).listAll().then((files) => {
            files.items.forEach(file => {
                deletePromises.push(file.delete())
            })
        }).catch(error => {
            console.log('Something went wrong' + error.message)
        })

        // Carte d'identité
        storage.ref(`/files/idCards/${user.id}/`).listAll().then((files) => {
            files.items.forEach(file => {
                deletePromises.push(file.delete())
            })
        }).catch(error => {
            console.log('Something went wrong' + error.message)
        })


        // Résolution des promesses
        Promise.all(deletePromises)
            .then(()=> {
                console.log('Utilisateur supprimé de la base de donnée, à supprimer égaement dans l\'authentification')
            })
            .catch(()=> {
                console.log('Woops ...')
            })
    }

    return (
        <div>
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
            <p>{user.email}</p>
            <Button variant="contained" onClick={handleDeleteUser}>Coucou</Button>
        </div>
    )
}