import React from 'react'
import {Button} from "@material-ui/core";
import {database} from "../../firebase";


export default function UserCard({user}) {

    function handleDeleteUser() {
        const deletePromises = []
        deletePromises.push(database.users.doc(user.id)
            .delete())
        database.notifications(user.id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(notif => {
                    deletePromises.push(database.notifications(user.id).doc(notif.id).delete())
                })
            })
        database.cowalks.where('owner','==',user.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(cowalk => {
                    deletePromises.push(database.cowalks.doc(cowalk.id).delete())
                    database.membersPending(cowalk.id)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(member => {
                                deletePromises.push(database.membersPending(cowalk.id).doc(member.id).delete())
                            })
                        })
                    database.membersApproved(cowalk.id)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(member => {
                                deletePromises.push(database.membersApproved(cowalk.id).doc(member.id).delete())
                            })
                        })
                })
            })

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