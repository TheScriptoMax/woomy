// REACT IMPORT
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

// FIREBASE IMPORT
import {database, storage} from "../../firebase";
import {useAuth} from "../../contexts/AuthContext";

// MATERIAL UI IMPORT
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {CheckRounded} from "@material-ui/icons";
import CircularProgress from '@material-ui/core/CircularProgress';

// CSS IMPORT
import './AwaitingApproval.css';

//PAGE VALIDATION INCRIPTION

export default function AwaitingApproval () {

    const [error, setError] = useState('');

    const {currentUser} = useAuth();

    const [iconCard, setIconCard] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [urlCard, setUrlCard] = useState('');

    const [iconPicture, setIconPicture] = useState(false);
    const [pictureLoading, setPictureLoading] = useState(false);
    const [urlPicture, setUrlPicture] = useState('');


    useEffect(()=>{
        //On regarde si il y'a déja une carte d'identité
        database.idCardFiles.doc(currentUser.uid)
            .get()
            .then((doc) =>{
                if(doc.exists){
                    setUrlCard(doc.data().url)
                }
                else {
                    console.log('ça existe pas')
                }
            })
            .catch((error) => {
                setError(error.message)
            })

        //On regarde si il y'a déja une photo
        database.idPictureFiles.doc(currentUser.uid)
            .get()
            .then((doc) =>{
                if(doc.exists){
                    setUrlPicture(doc.data().url)
                }
                else {
                    console.log('ça existe pas')
                }
        })
            .catch((error) => {
                setError(error.message)
            })
    }, [])

    function handleIdCardUpload(ev) {
        const idCardFile = ev.target.files[0];
        if (!idCardFile) {
            return setError('Vous devez soumettre une copie du recto de votre carte d\'identité');
        }
        const filename = idCardFile.name;
        const idCardPath = `files/idCards/${currentUser.uid}.${filename.substring(filename.lastIndexOf('.')+1, filename.length)}`
        const uploadCard = storage
            .ref(idCardPath)
            .put(idCardFile)
        uploadCard.on('state_changed',
            snapshot => {
                setCardLoading(true)
            },
            error => {
                console.log(error.message)
            },
            () => {
                uploadCard.snapshot.ref.getDownloadURL()
                    .then(url=> {
                        database.idCardFiles.doc(currentUser.uid).set({
                            url:url,
                            createdAt: database.getCurrentTimestamp,
                        })
                        .then(() => {
                            setUrlCard(url)
                            setCardLoading(false)
                            setIconCard(true);
                        })
                    })
            })
    }

    function handleIdPictureUpload(ev){

        const idPictureFile = ev.target.files[0];
        if (!idPictureFile) {
            return setError('Vous devez soumettre une photo de vous');
        }

        const filename = idPictureFile.name;
        const idPicturePartPath = `files/idPictures/${currentUser.uid}`
        const idPicturePath = `${idPicturePartPath}.${filename.substring(filename.lastIndexOf('.')+1, filename.length)}`

        const uploadPicture = storage
            .ref(idPicturePath)
            .put(idPictureFile);

        uploadPicture.on('state_changed',
            snapshot => {
                setPictureLoading(true);
            },
            error => {
                console.log(error.message)
            },
            () => {
                uploadPicture.snapshot.ref.getDownloadURL()
                    .then(url=> {
                        database.idPictureFiles.doc(currentUser.uid).set({
                            url:url,
                            createdAt: database.getCurrentTimestamp,
                        })
                            .then(() => {
                                setUrlPicture(url)
                                setPictureLoading(false);
                                setIconPicture(true);
                            })
                    })
            })
    }

    return (
    <div className='signIn-confirm container'>
        
        <div className="text-confirm">
            <p>
                Votre email est bien validé.<br/>
                Une pièce d’identité + une photo de vous sont nécessaires pour établir votre propre sécurité et celles avec qui vous ferez du copiétonnage.<br/>
                Après chaque vérification nous détruisont celles ci.<br/>
                Le procéssus peut prendre un peu de temps, merci de votre patience.
            </p>

            <div className='confirm-id'>
                <div className='identity-confirm'>
                    <p>Pièce d'identité</p>
                    {/* MATERIAL UI BUTTON FOR LOGIN */}
                    <input
                        style={{ display: 'none' }}
                        id="raised-button-file-card"
                        type="file"
                        onChange={handleIdCardUpload}
                    />
                    <div className='container-img'>
                        <img className='img-card' src={urlCard}/>
                    </div>
                    <label htmlFor="raised-button-file-card">
                        <Button variant="raised" component="span">
                            {cardLoading ?
                                <CircularProgress hidden /> :
                                iconCard ?
                                    <CheckRounded /> : <ArrowDownwardIcon /> }
                        </Button>
                    </label>
                </div>

                <div className='photo-confirm'>
                    <p>Photo</p>
                    {/* MATERIAL UI BUTTON FOR DOWLOAD PICTURE PORTRAIT */}
                    <input
                        style={{ display: 'none' }}
                        id="raised-button-file-picture"
                        type="file"
                        onChange={handleIdPictureUpload}
                    />
                    <div className='container-img'>
                        <img className='img-picture' src={urlPicture}/>
                    </div>
                    <label htmlFor="raised-button-file-picture">
                        <Button variant="raised" component="span">
                            {pictureLoading ?
                                <CircularProgress hidden /> :
                                iconPicture ?
                                    <CheckRounded /> : <ArrowDownwardIcon /> }
                        </Button>
                    </label>
                </div>
            </div>

        </div>

    </div>
    );
  }