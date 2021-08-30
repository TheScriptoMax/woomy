
/// ----- Material UI ----- ///
import Flag from "@material-ui/icons/Flag";
import Add from "@material-ui/icons/Add";
import MessageIcon from '@material-ui/icons/Message';

/// ----- CSS ----- ///
import "./Footer.css"

/// ----- React Modules ----- /// 
import {Link}from "react-router-dom";



////// FOOTER //////


function Footer() {
    return (
   <footer>
        <Link to="/list">
            <div>
                <Flag/>
                <p>Itinéraire(s)</p>
            </div>
        </Link>
        <Link to="/create">
            <div> 
                <Add/>
                <p>Créer</p>
            </div>
        </Link>
        <Link to="/message">
            <div>
                <MessageIcon/>
                <p>Message</p>
            </div>
        </Link>

   </footer>
    );
  }
  
  export default Footer;
  