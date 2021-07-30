// MATERIAL UI IMPORT
import { Avatar } from '@material-ui/core';

// CSS IMPORT
import './params.css'

//PAGE PARAMETRES
function Params() {
    return (
    <div className="container">
        <h2>Paramètres</h2>

        <div >
                <div className='account-field'>
                    <Avatar/>
                    <div>
                        <p>Mon compte</p>
                        <p>Chloé Sadry</p>
                    </div>
                </div>
        </div>

        <div className='account-field'>
            <p>notification</p>
        </div>
        <div className='account-field'>
            <p>Sécurité</p>
        </div>
        <div className='account-field'>
            <p>Conditions générales</p>
        </div>
        <div className='account-field'>
            <p>Nous contacter</p>
        </div>
        
    </div>
    );
  }
  export default Params;
