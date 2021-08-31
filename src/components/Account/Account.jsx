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
    const [pageLoading, setPageLoading] = useState(true)
    const [isShow, setIsShow] = useState(true);
    const [urlPicture, setUrlPicture] = useState('');
    const [pictureLoading, setPictureLoading] = useState(false);

    const {logout, resetPassword} = useAuth();

    const history = useHistory();

    const {currentUser} = useAuth();

    useEffect(() => {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
                if (doc.data().profilPic !== '') {
                    setUrlPicture(doc.data().profilPic)
                    setPictureLoading(true)
                    setPageLoading(false)
                } else {
                    setPageLoading(false)
                }
            })
            .catch(error => {
                console.log(error.message)
            })

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    async function clickResetPassword(e) {
        resetPassword(currentUser.email)
            .then(() => {
                console.log('email envoyé a ' + currentUser.email);
                setIsShow(!isShow);
            })
            .catch((error) => {

                console.log('Marche pas')

            })
    }

    async function handleLogout() {
        try {
            await logout().then(() => {
                history.push("/login");
            })
        } catch {
            console.log('Woops, on a pas réussi à vous déconnecter')
        }
    }

   function handlePicture(ev) {
        ev.preventDefault();


        const idPicture = ev.target.files[0];

        const filename = idPicture.name;
        const idPicturePartPath = `files/idPictureProfiles/${currentUser.uid}/${currentUser.uid}`;
        const idPicturePath = `${idPicturePartPath}.${filename.substring(filename.lastIndexOf('.') + 1, filename.length)}`

        const uploadPicture = storage
            .ref(idPicturePath)
            .put(idPicture)

        uploadPicture.on('state_changed',
            () => {
            setPageLoading(true)
                setPictureLoading(false);

            },
            error => {
                console.log(error.message)
            },
            () => {
                uploadPicture.snapshot.ref.getDownloadURL()
                    .then((url) => {
                        database.users.doc(currentUser.uid).update({
                            profilPic: url
                        })
                            .then(() => {
                                setUrlPicture(url)
                                setPictureLoading(true)
                                setPageLoading(false)
                            })
                    })
            }
        )
    }


    return (
        <div className='container'>

            {!pageLoading &&
            <>
                <div className="account-top">
                    {pictureLoading ?
                        <img className='img-picture-account' alt="Profil" src={urlPicture}/> :
                        <Avatar/>
                    }
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
                        <p>Prénom</p>
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
                    <div className='account-field'>
                        <input
                            style={{display: 'none'}}
                            id="picture-profil-account"
                            type="file"
                            onChange={handlePicture}
                        />
                        <label htmlFor="picture-profil-account">
                            <Button variant="raised" component="span">
                                Changer votre photo
                            </Button>
                        </label>
                    </div>


                    <Button onClick={clickResetPassword}>
                        <div className='account-field'>
                            <p>Réinitialiser le mot de passe</p>
                            <div className="account-field-result">
                            </div>
                        </div>
                    </Button>

                    {!isShow && <Alert severity="info">Un email vous a été envoyé</Alert>}
                    <div className="button-bot-account">
                        <Button variant="contained" onClick={handleLogout}> Se déconnecter </Button>
                    </div>
                </div>
            </>}
        </div>
    );
}

export default Account;
