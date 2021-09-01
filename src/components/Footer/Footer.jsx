
/// ----- Material UI ----- ///
import Flag from "@material-ui/icons/Flag";
import Add from "@material-ui/icons/Add";
import MessageIcon from '@material-ui/icons/Message';

/// ----- CSS ----- ///
import "./Footer.css"

/// ----- React Modules ----- /// 
import {Link}from "react-router-dom";
import BandeauWarning from "../BandeauWarning/BandeauWarning";

////// FOOTER //////

function Footer() {
    return (
    <footer>
            <Link to="/list">
                <div>
                    <div className="itinIcon">
                        <Flag/>
                    </div>
                    <p>Itinéraire(s)</p>
                </div>
            </Link>
            <Link to="/create">
                <div> 
                    <div className="createIcon">
                        <Add/>
                    </div>
                    <p>Créer</p>
                </div>
            </Link>
            <Link to="/message">
                <div>
                    <div className="messageIcon">
                        <MessageIcon/>
                    </div>
                    <p>Message</p>
                </div>
            </Link>
        <BandeauWarning/>
    </footer>
    );
  }
  
  export default Footer;
  