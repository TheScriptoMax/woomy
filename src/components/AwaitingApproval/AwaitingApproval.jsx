// REACT IMPORT
import {useEffect, useState} from "react";

// FIREBASE IMPORT
import {database, storage} from "../../firebase";
import {useAuth} from "../../contexts/AuthContext";

// MATERIAL UI IMPORT
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {CheckRounded} from "@material-ui/icons";
import CircularProgress from '@material-ui/core/CircularProgress';

// CSS IMPORT
import './awaitingapproval.css';

import Alert from "@material-ui/lab/Alert";

import {useHistory} from "react-router-dom";
import imageCompression from "browser-image-compression";


//PAGE VALIDATION INCRIPTION

export default function AwaitingApproval() {


    const {currentUser, logout} = useAuth();

    const [iconCard, setIconCard] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [urlCard, setUrlCard] = useState('');
    const [error, setError] = useState('');
    const [iconPicture, setIconPicture] = useState(false);
    const [pictureLoading, setPictureLoading] = useState(false);
    const [urlPicture, setUrlPicture] = useState('');
    const [randomPoseString, setRandomPoseString] = useState('')

    const history = useHistory();

    useEffect(() => {
        const poseArray = ["pouce gauche levé", "pouce droit levé", "pince le nez", "main droite sur le coeur", "V avec les doigts", "tirez la langue", "se tenir le menton"];
        const randomPose = Math.floor(Math.random() * poseArray.length);
        setRandomPoseString(poseArray[randomPose]);
    }, [])


    useEffect(() => {
        //On regarde si il y'a déja une carte d'identité
        database.idCardFiles.doc(currentUser.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setUrlCard(doc.data().url)
                    setCardLoading(false)
                    setIconCard(true)
                } else {
                    console.log("Doesn't exist")
                }
            })


        //On regarde si il y'a déja une photo
        database.idPictureFiles.doc(currentUser.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setUrlPicture(doc.data().url)
                    setPictureLoading(false)
                    setIconPicture(true)
                } else {
                    console.log("Doesn't exist")
                }
            })

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleIdCardUpload(ev) {

        const idCardFileOriginal = ev.target.files[0];
        const compressionOptions = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
        };

        imageCompression(idCardFileOriginal, compressionOptions)
            .then(idCardFile => {

                const filename = idCardFile.name;
                const idCardPathPart = `files/idCards/${currentUser.uid}/${currentUser.uid}`
                const idCardPath = `${idCardPathPart}.${filename.substring(filename.lastIndexOf('.') + 1, filename.length)}`
                const uploadCard = storage
                    .ref(idCardPath)
                    .put(idCardFile)
                uploadCard.on('state_changed',
                    snapshot => {
                        setCardLoading(true)
                    },
                    error => {
                        setError('Echec à l\'envoi de la photo d\'identité')
                    },
                    () => {
                        uploadCard.snapshot.ref.getDownloadURL()
                            .then(url => {
                                database.idCardFiles.doc(currentUser.uid).set({
                                    url: url,
                                    createdAt: database.getCurrentTimestamp,
                                })
                                    .then(() => {
                                        setError('')
                                        setUrlCard(url)
                                        setCardLoading(false)
                                        setIconCard(true);
                                    })
                            })
                    })
            })
            .catch(() => {
                setError('Echec à la compression')
            })
    }

    function handleIdPictureUpload(ev) {
        const idPictureFileOriginal = ev.target.files[0];
        const compressionOptions = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
        };
        imageCompression(idPictureFileOriginal, compressionOptions)
            .then(idPictureFile => {

                const filename = idPictureFile.name;
                const idPicturePartPath = `files/idPictures/${currentUser.uid}/${currentUser.uid}`
                const idPicturePath = `${idPicturePartPath}.${filename.substring(filename.lastIndexOf('.') + 1, filename.length)}`

                const uploadPicture = storage
                    .ref(idPicturePath)
                    .put(idPictureFile);

                uploadPicture.on('state_changed',
                    snapshot => {
                        setPictureLoading(true);
                    },
                    error => {
                        setError('Echec à l\'envoi de la photo de pose')
                    },
                    () => {
                        uploadPicture.snapshot.ref.getDownloadURL()
                            .then(url => {
                                database.idPictureFiles.doc(currentUser.uid).set({
                                    url: url,
                                    poseString: randomPoseString,
                                    createdAt: database.getCurrentTimestamp,
                                })
                                    .then(() => {
                                        setError('')
                                        setUrlPicture(url)
                                        setPictureLoading(false);
                                        setIconPicture(true);
                                    })
                            })
                    })

            })
            .catch(() => {
                setError('Echec à la compression')
            })
    }


    async function handleLogout() {
        try {
            await logout().then(() => {
                history.push("/");
            })
        } catch {
            console.log("Connexion failed")
        }
    }

    return (
        <div className='signIn-confirm container'>

            <div className="text-confirm">
                <p>
                    Votre email est bien validé.<br/>
                    Une pièce d’identité et une photo de vous avec une pose particulière sont nécessaires pour
                    établir
                    votre identité et pour la sécurité des utilisatrices avec qui vous allez copiétonner.<br/>
                    Après chaque vérification nous détruisons celles ci.<br/>
                    <p className="pose">Pose demandée : "{randomPoseString}"</p>
                    Le processus peut prendre un peu de temps, merci de votre patience.
                </p>

                <div className='confirm-upload-account'>
                    <div className='identity-confirm'>
                        <p>Pièce d'identité</p>
                        {/* MATERIAL UI BUTTON FOR LOGIN */}
                        <input
                            style={{display: 'none'}}
                            id="raised-button-file-card"
                            type="file"
                            accept="image/*"
                            onChange={handleIdCardUpload}
                        />
                        {urlCard &&
                        <div className='container-img'>
                            <img className='img-card-awaiting' src={urlCard} alt="Votre carte d'identité"/>

                        </div>}
                        <label htmlFor="raised-button-file-card">
                            <Button variant="raised" component="span">
                                {cardLoading ?
                                    <CircularProgress hidden/> :
                                    iconCard ?
                                        <CheckRounded/> : <ArrowDownwardIcon/>}
                            </Button>
                        </label>
                    </div>

                    <div className='photo-confirm'>
                        <p>Photo</p>
                        {/* MATERIAL UI BUTTON FOR DOWLOAD PICTURE PORTRAIT */}
                        <input
                            style={{display: 'none'}}
                            id="raised-button-file-picture"
                            type="file"
                            accept="image/*"
                            onChange={handleIdPictureUpload}
                        />
                        {urlPicture &&
                        <div className='container-img'>
                            <img className='img-picture-awaiting' src={urlPicture} alt="Votre preuve d'identité'"/>
                        </div>}
                        <label htmlFor="raised-button-file-picture">
                            <Button variant="raised" component="span">
                                {pictureLoading ?
                                    <CircularProgress hidden/> :
                                    iconPicture ?
                                        <CheckRounded/> : <ArrowDownwardIcon/>}
                            </Button>
                        </label>
                    </div>
                </div>

                {iconCard && iconPicture ?
                    <Alert severity="info">Vos images ont bien été envoyées ! Merci de patienter.</Alert> :
                    ''
                }
                {error && <Alert severity="error">{error}</Alert>}

                <div className="button-bot-account">
                    <Button variant="contained" onClick={handleLogout}>Se déconnecter</Button>
                </div>


            </div>
        </div>
    );
}