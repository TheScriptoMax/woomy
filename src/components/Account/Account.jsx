
/// ----- Material UI ----- ///
import {Avatar, Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
/// ----- CSS ----- ///
import './account.css';

/// ----- React modules ///
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

    function handleIdCardUpload(ev) {
        const idCardFile = ev.target.files[0];
        if (!idCardFile) {
            return setError('Vous devez soumettre une copie du recto de votre carte d\'identité');
        }
        const filename = idCardFile.name;
        const idCardPath = `files/idCards/${currentUser.uid}.${filename.substring(filename.lastIndexOf('.')+1, filename.length)}`
        const uploadTask = storage
            .ref(idCardPath)
            .put(idCardFile)

        uploadTask.on('state_changed',
            snapshot => {
            },
            error => {
            console.log(error.message)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(url=> {
                    database.idCardFiles.add({
                        url:url,
                        createdAt: database.getCurrentTimestamp,
                        userId: currentUser.uid
                    })
                        .then(() => {
                            console.log('Fichier envoyé')
                        })
                })
            })

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
                    <p>08 08 1954</p>
                </div>
            </div>
            <div className='account-field'>
                <p>Téléphone</p>
                <div className="account-field-result">
                    <p>{userData.phoneNumber}</p>
                </div>
            </div>
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
            <input
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleIdCardUpload}
            />
            <label htmlFor="raised-button-file">
                <Button variant="raised" component="span">
                    Upload
                </Button>
            </label>
        </div>
      </div>
    );
  }
  export default Account;
