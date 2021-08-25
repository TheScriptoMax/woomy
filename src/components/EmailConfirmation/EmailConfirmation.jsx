// MATERIAL UI IMPORT
import Button from '@material-ui/core/Button';
// CSS IMPORT

import './EmailConfirmation.css';

//PAGE VALIDATION INCRIPTION 

export default function EmailConfirmation () {
    return (

    <div className='signIn-confirm container'>
        
        <div className="text-confirm">
            <p>Votre email est validé.<br/> Vous pouvez dès maintenant vous connecter.</p>

            {/* MATERIAL UI BUTTON FOR LOGIN */}
            <Button variant="contained">Se connecter</Button>
        </div>

    </div>
    );
  }