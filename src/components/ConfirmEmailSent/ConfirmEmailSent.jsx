// Import React
import {useState, useEffect} from "react";

// CSS FIREBASE
import {useAuth} from "../../contexts/AuthContext";
import {database} from "../../firebase";

// REACT ROUTER DOM
import {Link, useHistory} from "react-router-dom";

// MATERIAL UI IMPORT
import Button from '@material-ui/core/Button';
import {Alert} from "@material-ui/lab";

// CSS IMPORT
import './ConfirmEmailSent.css';

//PAGE VALIDATION INCRIPTION 

export default function ConfirmEmailSent () {

    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const {currentUser, reSendEmail} = useAuth();

    const history = useHistory();

    const {logout} = useAuth();


    useEffect(()=> {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
            })
            .catch(error => {
            setError((error.message))
        })

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    async function sendEmail(ev){
        ev.preventDefault();
        try{
        reSendEmail(currentUser)
            .then(() => {
                history.push('/send-new-validation');
            }).catch(()=> {
                setError('Echec lors de l\'envoi du mail, patientez un peu et réessayez');
        })
        } catch(error) {
            setError('Marche pas');
        }
    }

    async function handleLogout() {
        try {
            await logout().then(()=> {
                history.push("/");
            })
        } catch {
            setError('Woops, on a pas réussi à vous déconnecter')
        }
    }


    return (

    <div className='sign-in-validation container'>

        <div className="text-validation">

            {error ? <Alert severity="error">{error}</Alert> :
                <>
            <p>{userData.firstname}, votre inscription a bien été prise en compte.
            Un e-mail de confirmation vous a été envoyé, merci de vérifier votre boite mail.
                <br></br>Attention, vérifiez si le mail n'est pas dans vos Spams.</p>

                <Alert severity="warning">Une fois le mail validé, déconnectez vous à l'aide du bouton ci-dessous puis reconnectez vous pour poursuivre le processus d'inscription</Alert></>}

        </div>

        {/* MATERIAL UI BUTTON FOR CLOSE VALIDATION */}
        <Button component={Link} to={'/send-new-validation'} onClick={sendEmail}>Renvoyer un mail</Button>

        <div className="button-bot-account">
            <Button variant="contained" onClick={handleLogout}> Se déconnecter</Button>
        </div>

    </div>
    );
  }