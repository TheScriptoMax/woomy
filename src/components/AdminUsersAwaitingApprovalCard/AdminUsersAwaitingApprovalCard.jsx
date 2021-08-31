// IMPORT REACT
import React, {useEffect, useState} from 'react'

// IMPORT MATERIAL
import {Button} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

// IMPORT FIREBASE
import {database, storage} from "../../firebase";


export default function AdminUsersAwaitingApprovalCard({user}) {

    const [urlPicture, setUrlPicture] = useState('');
    const [urlCard, setUrlCard] = useState('');
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {

        database.idCardFiles.doc(user.id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setUrlCard(doc.data().url)
                } else {
                    console.log('ça existe pas')
                }
            })
            .catch((error) => {
                console.log(error.message)
            })

        //On regarde si il y'a déja une photo
        database.idPictureFiles.doc(user.id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setUrlPicture(doc.data().url)
                } else {
                    console.log('ça existe pas')
                }
            }).catch(error => {
            console.log(error.message)
        })
    }, [user]);

    function handleApproveUser() {
        const approvalPromises = [];
        approvalPromises.push(
            database.users
                .doc(user.id)
                .update({
                    accepted:true
                }))

        storage.ref(`/files/idPictures/${user.id}/`).listAll().then((files) => {
            files.items.forEach(file => {
                approvalPromises.push(file.delete())
            })
        }).catch(error => {
            console.log('Something went wrong' + error.message)
        })
        // Référence à l'image de pose dans la bdd
        database.idPictureFiles.doc(user.id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    approvalPromises.push(database.idPictureFiles.doc(user.id).delete())
                }
            })

        // Carte d'identité
        storage.ref(`/files/idCards/${user.id}/`).listAll().then((files) => {
            files.items.forEach(file => {
                approvalPromises.push(file.delete())
            })
        }).catch(error => {
            console.log('Something went wrong' + error.message)
        })
        // Référence à la carte d'identité bdd
        database.idCardFiles.doc(user.id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    approvalPromises.push(database.idCardFiles.doc(user.id).delete())
                }
            })

            Promise.all(approvalPromises)
                .then(() => {
                    setMessage('Utilisatrice acceptée')
                    console.log('Utilisatrice acceptée')
                })
                .catch(() => {
                    setError('Erreur lors de l\'acceptation de l\'utilisatrice')
                })



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
                setError('Suppression ratée')
            })
    }

    return (
        <div className="admin-user-card">
            <span className="user-name">{user.firstname} </span>
            <span className="user-name">{user.lastname}</span>
            <p>utilisatrice inscrite - {new Date(user.createdAt.seconds*1000).toLocaleString('fr-FR',{timeZone:"Europe/Paris",day:"numeric",month:"short", hour:"2-digit",minute:"2-digit"})}</p>
            <p>E-mail: <a href={`mailto:${user.email}`}>{user.email}</a></p>
            <p>Téléphone: <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a></p>
        
            <div className="admin-user-card-img-container">
                    {urlPicture ? <a href={urlPicture} target="_blank" rel="noreferrer">Photo de confirmation: <br/><img src={urlPicture} alt="Profil" className="admin-user-card-img"/></a> : <p>Pas encore de photo de pose</p>}

                    {urlCard ? <a href={urlCard} target="_blank" rel="noreferrer">Pièce d'identité: <br/><img src={urlCard} alt="Carte d'identité" className="admin-user-card-img"/></a> : <p>Pas encore de carte d'identité</p>}


            </div>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            {urlPicture && urlCard &&
            <Button variant="contained" onClick={handleApproveUser} color="primary">Accepter</Button>}
            <Button variant="contained" onClick={handleDeleteUser}>Supprimer</Button>
        </div>
    )
}