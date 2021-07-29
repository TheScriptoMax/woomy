
import './messagecard.css';
import { Avatar } from '@material-ui/core';
function NotificationCard() {

  
    return (
        <div className="card-notif">
        <div className="separator-dark"></div>
            <div className="card-notif-top">
                <Avatar/>
                <div className="card-notif-md notif-part">
                    <p className="first">Barnadette Michel</p>
                    <p className="grey">Salut je m'appelle Bernie</p>
                </div>
                <div className="card-notif-bot notif-part first">
                    <p className="grey">Il y a une heure</p>
                </div>
            </div>
            <div className="container-button">

            </div>
        </div>
    );
  }
  
  export default NotificationCard;