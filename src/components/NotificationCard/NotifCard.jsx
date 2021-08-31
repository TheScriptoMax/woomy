import {database} from '../../firebase';
import {useState, useEffect} from 'react';
import {useAuth} from "../../contexts/AuthContext";

// MATERIAL UI IMPORT

import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import { Avatar } from '@material-ui/core';

// CSS IMPORT
import './notifCard.css';

//PAGE NOTIFICATION CARTE COPIETONNEUSE
function NotifCard({notif}) {
    const [userData, setUserData] = useState({})

    const {currentUser} = useAuth();


    useEffect(() => {
        database.users.doc(notif.guest)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
            })


    },[notif])


    function handleDeleteNotif (e) {
        e.preventDefault();
        database.notifications(currentUser.uid).doc(notif.id)
        .delete()
        .then(()=>
            console.log('notif Clear')
        )
    }



    function onGuestApproval () {
        database.membersApproved(notif.cowalkRequested).doc(notif.guest)
            .set(
                userData
            ) 
            .then(()=>{
                database.membersPending(notif.cowalkRequested).doc(notif.guest)
                    .delete()
                    .then(()=>{
                        database.notifications(currentUser.uid).doc(notif.id)
                        .delete()
                        .then(()=> {
                             console.log('notif delete')
                        })

                        database.notifications(notif.guest)
                            .add({
                                cowalkRequested: notif.cowalkRequested,
                                guest: notif.guest,
                                status:'approval request',
                                requestDate:new Date()
                            })

                    })
            })
            

    }
    return (

        <li className="card-notif">
            { notif.status !== 'approval request' ? (
            <><div className="separator-dark"></div>

            <div className="card-notif-top">
                <Avatar/>
                <div className="card-notif-md notif-part">
                    <p className="first first-name">{userData.firstname} {userData.lastname}</p>
                    <p className="grey">Requete de copietonnage</p>
                </div>
                <div className="card-notif-bot notif-part first">
                    <Button onClick={(event)=>handleDeleteNotif(event)}><Clear/></Button>
                    <div className="container-button">
                <Button variant="contained" onClick={(event)=>onGuestApproval()}>Accepter</Button>

                    </div>
                </div>
                
            </div>

            </>):(
                <><div className="separator-dark"></div>

            <div className="card-notif-top">
            <Avatar/>
                <div className="card-notif-md notif-part">                
                    <p className="first">Vous avez été accepté dans le copiétonnage de : <span className="grey">{userData.firstname} {userData.lastname}</span></p>
                 
                </div>
                
               
                <Button onClick={(event)=>handleDeleteNotif(event)}><Clear/></Button>
                
            </div>
            </>
            
            )}

        </li>
    );
  }
  export default NotifCard;