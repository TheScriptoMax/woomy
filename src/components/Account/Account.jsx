/// ----- Material UI ----- ///
import {Avatar, Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

/// ----- CSS ----- ///
import './account.css';

/// ----- React modules ----- ///
import {useAuth} from "../../contexts/AuthContext";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";


/// ----- Firebase ///
import {database, storage} from "../../firebase";

//////// Page de profile ////////

function Account() {

    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const {logout, resetPassword} = useAuth();

    const [isShow, setIsShow] = useState(true);

    const history = useHistory();

    const {currentUser} = useAuth();

    useEffect(()=> {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
            })
            .catch(error => {
                setError(error.message)
            })

    }, [currentUser.uid])

    async function clickResetPassword(e){
        resetPassword(currentUser.email)
            .then(() => {
                console.log('email envoyé a ' + currentUser.email);
                setIsShow(!isShow);
            })
            .catch((error) =>{
                setError('Marche pas')
            })
    }


    async function handleLogout() {
        try {
            await logout().then(()=> {
                history.push("/login");
            })
        } catch {
            setError('Woops, on a pas réussi à vous déconnecter')
        }
    }

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
                    <p>{userData.birthdate}</p>
                </div>
            </div>
            <div className='account-field'>
                <p>Téléphone</p>
                <div className="account-field-result">
                    <p>{userData.phoneNumber}</p>
                </div>
            </div>
            <Link to="/change-profile">
                <div className='account-field'>
                    <p>Changer vos informations</p>
                    <div className="account-field-result">
                    </div>
                </div>
            </Link>
            <Button onClick={clickResetPassword}>
                <div className='account-field'>
                        <p>Réinitialiser le mot de passe</p>
                        <div className="account-field-result">
                        </div>
                </div>
            </Button>
            {!isShow && <Alert severity="info">Un email vous a été envoyé</Alert>}
            <Link to="/param">
                <div className='account-field'>
                    <p>Parametres</p>
                    <div className="account-field-result">
                    </div>
                </div>
            </Link>
            <div className="button-bot-account">
                <Button variant="contained" onClick={handleLogout}> Se deconnecter </Button>
            </div>
        </div>
      </div>
    );
  }
  export default Account;
