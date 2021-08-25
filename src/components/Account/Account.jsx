
/// ----- Material UI ----- ///
import {Avatar, Button} from '@material-ui/core';

/// ----- CSS ----- ///
import './account.css';

/// ----- React modules ///
import {useAuth} from "../../contexts/AuthContext";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


/// ----- Firebase ///
import {database} from "../../firebase";

//////// Page de profile ////////

function Account() {

    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const {logout, resetPassword} = useAuth();

    const {currentUser} = useAuth();
    useEffect(()=> {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
            })

    }, [currentUser.uid])

    async function clickResetPassword(){
        resetPassword(currentUser.email)
            .then(() => {
                console.log('email envoyé a ' + currentUser.email);
            })
            .catch((error) =>{
                setError('Marche pas')
            })
    }

    /*
    async function handleLogout() {
        try {
            await logout().then(()=> {
                history.push("/login");
            })
        } catch {
            setError('Woops, on a pas réussi à vous déconnecter')
        }
    }
     */


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
                    <p>{userData.lastname}</p>
                </div>
            </div>
            <div className='account-field'>
                <p>Prenom</p>
                <div className="account-field-result">
                    <p>{userData.firstname}</p>
                </div>
            </div>
            <div className='account-field'>
                <p>E-mail</p>
                <div className="account-field-result">
                    <p>{currentUser.email}</p>
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
                    <p>{userData.phoneNumber}</p>
                </div>
            </div>
            <Link to="/param">
                <div className='account-field'>
                    <p>Parametres</p>
                    <div className="account-field-result">
                    </div>
                </div>
            </Link>
            <Button onClick={clickResetPassword}>Reset</Button>
        </div>
      </div>
    );
  }
  export default Account;
