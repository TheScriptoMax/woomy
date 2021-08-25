/// ----- Material UI ----- ///
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
/// ----- CSS ----- ///
import './account.css';

/// ----- React modules ///
import {Link} from "react-router-dom";

//////// Page de profile ////////

function Account() {
        const [isShow, setIsShow] = useState(true);
      
        const handleClick = () => {
          setIsShow(!isShow);
        };

    return (
      <div className='container'>
      <div className="account-top">
        <Avatar/>
        <h2>Mon compte</h2>
      </div>
        <div className="account-list">
            <div className='account-field'>
                <p>Nom</p>
                <div className="account-field-result">
                    <p>Sadry</p>
                </div>
            </div>
            <div className='account-field'>
                <p>Prenom</p>
                <div className="account-field-result">
                    <p>Chloé</p>
                </div>
            </div>
            <div className='account-field'>
                <p>E-mail</p>
                <div className="account-field-result">
                    <p>pasvrai@fake.com</p>
                </div>
            </div>
            <div className='account-field'>
                <p>Date de naissance</p>
                <div className="account-field-result">
                    <p>08 08 1954</p>
                </div>
            </div>
            <div className='account-field'>
                <p>Téléphone</p>
                <div className="account-field-result">
                    <p>0600000000</p>
                </div>
            </div>
            <button onClick={handleClick}>
                <div className='account-field'>
                        <p>Réinitialiser le mot de passe</p>
                        <div className="account-field-result">
                        </div>
                </div>
            </button>
            {!isShow && <Alert severity="info">Un email vous a été envoyé</Alert>}
            <Link to="/param">
                <div className='account-field'>
                    <p>Parametres</p>
                    <div className="account-field-result">
                    </div>
                </div>
            </Link>
            <div className="button-bot-account">
                <Button variant="contained"> Se deconnecter </Button>
            </div>
   
        </div>
      </div>
    );
  }
  export default Account;
