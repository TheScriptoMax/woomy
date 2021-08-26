// MATERIAL UI IMPORT
import Button from '@material-ui/core/Button';
// CSS IMPORT

import './AwaitingApprouval.css';
import {Link} from "react-router-dom";

//PAGE VALIDATION INCRIPTION 

export default function AwaitingApprouval () {


    return (
    <div className='signIn-confirm container'>
        
        <div className="text-confirm">
            <p>Votre email est validé.<br/> Vous êtes en attente de validation par un administrateur.</p>

            {/* MATERIAL UI BUTTON FOR LOGIN */}
            <Button component={Link} to={'/login'} variant="contained">Se connecter</Button>
        </div>

    </div>
    );
  }