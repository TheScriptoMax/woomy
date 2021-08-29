import {database} from '../../firebase';
import {useState, useEffect} from 'react';
import {useAuth} from "../../contexts/AuthContext";


// MATERIAL UI IMPORT
import MessageIcon from '@material-ui/icons/Message';
import Button from '@material-ui/core/Button';
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
        
    },[])

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
                    })
            })
            

    }
    return (

        <li className="card-notif">

            <div className="separator-dark"></div>

            <div className="card-notif-top">
                <Avatar/>
                <div className="card-notif-md notif-part">
                    <p className="first">{userData.firstname} {userData.lastname}</p>
                    <p className="grey">Requete de copietonnage</p>
                </div>
                <div className="card-notif-bot notif-part first">
                    <p className="grey">Il y a </p>
                    <MessageIcon/>
                </div>
            </div>

            <div className="container-button">
                <Button variant="contained" onClick={(event)=>onGuestApproval()}>Accepter</Button>
            </div>
        </li>
    );
  }
  export default NotifCard;