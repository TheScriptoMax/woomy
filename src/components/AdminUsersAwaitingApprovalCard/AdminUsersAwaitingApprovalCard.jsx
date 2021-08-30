import React, {useEffect, useState} from 'react'
import {Button} from "@material-ui/core";
import {database} from "../../firebase";


export default function AdminUsersAwaitingApprovalCard({user}) {

    const [urlPicture, setUrlPicture] = useState('');
    const [urlCard, setUrlCard] = useState('');

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


    }

    return (
        <div>
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
            <a href={`mailto:${user.email}`}>{user.email}</a>
            <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
            {urlPicture ? <img src={urlPicture} alt="Profil"/> : <p>Pas encore de photo de pose</p>}
            {urlCard ? <img src={urlCard} alt="Carte d'identité"/> : <p>Pas encore de carte d'identité</p>}
            <Button variant="contained" onClick={handleApproveUser}>Coucou</Button>
        </div>
    )
}