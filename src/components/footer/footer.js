
import "./footer.css"

import Flag from "@material-ui/icons/Flag";
import Add from "@material-ui/icons/Add";
import MessageIcon from '@material-ui/icons/Message';


function Footer() {
    return (
   <footer>
        <div>
            <Flag/>
            <p>Itinéraire(s)</p>
        </div>
        <div> 
            <Add/>
            <p>Créer</p>
        </div>
        <div>
            <MessageIcon/>
            <p>Message</p>
        </div>

   </footer>
    );
  }
  
  export default Footer;
  