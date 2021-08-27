// REACT IMPORT
import {Link} from "react-router-dom";
import {useRef, useState} from "react";

// FIREBASE IMPORT
import {database, storage} from "../../firebase";
import {useAuth} from "../../contexts/AuthContext";

// MATERIAL UI IMPORT
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

// CSS IMPORT
import './AwaitingApproval.css';
import {CheckRounded} from "@material-ui/icons";

//PAGE VALIDATION INCRIPTION 

export default function AwaitingApproval () {

    const [error, setError] = useState('');
    const cardRef = useRef();
    const pictureRef = useRef();

    const {currentUser} = useAuth();

    let [uploadPicture, uploadCard] = useState();

    const [iconPicture, setIconPicture] = useState(false)
    const [iconCard, setIconCard] = useState(false)


    function handleIdCardUpload(ev) {
        const idCardFile = ev.target.files[0];
        if (!idCardFile) {
            return setError('Vous devez soumettre une copie du recto de votre carte d\'identité');
        }
        const filename = idCardFile.name;
        const idCardPath = `files/idCards/${currentUser.uid}.${filename.substring(filename.lastIndexOf('.')+1, filename.length)}`
        uploadCard = storage
            .ref(idCardPath)
            .put(idCardFile)
        setIconCard(true);
    }

    async function handleIdPictureUpload(ev){
        const idPictureFile = ev.target.files[0];
        if (!idPictureFile) {
            return setError('Vous devez soumettre une photo de vous');
        }
        const filename = idPictureFile.name;
        const idCardPath = `files/idPictures/${currentUser.uid}.${filename.substring(filename.lastIndexOf('.')+1, filename.length)}`
        uploadPicture = storage
            .ref(idCardPath)
            .put(idPictureFile)
        setIconPicture(true)
    }

    async function handleSubmit(ev){
        ev.preventDefault();

        //Pour la carte d'id
        uploadCard.on('state_changed',
            snapshot => {
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
                                console.log('Fichier envoyé')
                            })
                    })
            })

        //Pour la photo
        uploadPicture.on('state_changed',
            snapshot => {
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
                                console.log('Fichier envoyé')
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
                <form onSubmit={handleSubmit}>
                    <div className='identity-confirm'>
                        <p>Pièce d'identité</p>
                        {/* MATERIAL UI BUTTON FOR LOGIN */}
                        <input
                            style={{ display: 'none' }}
                            id="raised-button-file-card"
                            type="file"
                            onChange={handleIdCardUpload}
                        />
                        <label htmlFor="raised-button-file-card">
                            <Button variant="raised" component="span">
                                {iconCard ? <CheckRounded /> : <ArrowDownwardIcon />}
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
                        <label htmlFor="raised-button-file-picture">
                            <Button variant="raised" component="span">
                                {iconPicture ? <CheckRounded /> : <ArrowDownwardIcon />}
                            </Button>
                        </label>
                    </div>
                    <Button type="submit" variant="contained">Envoyer</Button>
                </form>
            </div>

        </div>

    </div>
    );
  }