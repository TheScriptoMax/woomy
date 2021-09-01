// IMPORT REACT
import React from 'react'


/// ----- Import image ----- ///
import {database} from '../../firebase';


/// ----- CSS ----- ///
import "./admincowalkingcard.css";

/// ----- React Modules ----- ///
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import firebase from 'firebase/app';

/////////// CARTE DE COPIETONNAGE //////////////

function AdminCowalkingCard ({cowalk,index}) {



    function handleDeleteCowalk(ev) {
        ev.preventDefault();
        const deletePromises = [];

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
                        approvalCowalk:firebase.firestore.FieldValue.arrayRemove(
                            cowalk.id
                        )
                    }))
                    deletePromises.push(
                        database.membersApproved(cowalk.id).doc(doc.id).delete()
                    )
                })
            })


        deletePromises.push(database.cowalks.doc(cowalk.id)
            .delete())

        Promise.all(deletePromises)
            .then(() => {
                console.log('Docs supprimés')
            })
            .catch((error) => {
                console.log(error)
            })
    }



    
    const currentCowalkStartTime = new Date(cowalk.startTime.seconds*1000).toLocaleString('fr-FR',{timeZone:"Europe/Paris",day:"numeric",month:"short", hour:"2-digit",minute:"2-digit"})
    
    return(

            <li className='cowalkingCard' key={cowalk.id}>
                <Link
                    to={`/ticket/${cowalk.id}`}
                >
                <div>
                    <div className='cowalkingCardTitle'>
                    <p className='cowalk-start'>Heure de départ : {currentCowalkStartTime}</p>
                        {/* <h3>itinéraire:{index+1}</h3> */}
                        <div className="main-card">
                            <div className="cowalk-bar">
                                <div className="dot"></div>
                                <div className="bar"></div>
                                <div className="dot"></div>
                            </div>
                                <div className='cowalkingCardRoute'>
                                    <div className="cowalkingCardDeparture">
                                        <p>Départ:  </p>
                                        <p>{cowalk.startFrom}</p>
                                    </div>
                                <div className="cowalkingCardDestination">
                                    <p>Destination:  </p>
                                    <p>{cowalk.goTo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
                <Button variant="contained" onClick={handleDeleteCowalk}>Supprimer le copiet</Button>
        </li>

    )
}


export default AdminCowalkingCard