// MATERIAL UI IMPORT
import MessageIcon from '@material-ui/icons/Message';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';

// CSS IMPORT
import './notif-card.css';

//PAGE NOTIFICATION CARTE COPIETONNEUSE
function NotificationCard() {

    return (

        <div className="card-notif">

            <div className="separator-dark"></div>

            <div className="card-notif-top">
                <Avatar/>
                <div className="card-notif-md notif-part">
                    <p className="first">Barnadette Michel</p>
                    <p className="grey">Requete de copietonnage</p>
                </div>
                <div className="card-notif-bot notif-part first">
                    <p className="grey">Il y a une heure</p>
                    <MessageIcon/>
                </div>
            </div>

            <div className="container-button">
                <Button variant="contained">Accepter</Button>
            </div>
            
        </div>
    );
  }
  
  export default NotificationCard;