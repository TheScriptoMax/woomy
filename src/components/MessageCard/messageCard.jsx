// MATERIAL UI IMPORT
import { Avatar } from '@material-ui/core';

// CSS IMPORT
import './messagecard.css';


// PAGE NOTIFICATION MESSAGE CARTE COPIETONNEUSE
function MessageCard() {

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
                {/* CEST QUOI CE BOUTON? */}
            </div>

        </div>
    );
    }

    export default MessageCard;