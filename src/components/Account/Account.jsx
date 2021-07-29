import './account.css';
import { Avatar } from '@material-ui/core';



function Account() {
    return (
      <div className='container'>
      <div className="account-top">
        <Avatar/>
        <h2>Mon compte</h2>
      </div>
        <div >
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
            <div className='account-field'>
                <p>Parametres</p>
                <div className="account-field-result">
                </div>
            </div>
        </div>
      </div>
    );
  }
  export default Account;