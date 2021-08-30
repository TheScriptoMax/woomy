// Import React
import {useState, useEffect} from "react";

// CSS FIREBASE
import {useAuth} from "../../contexts/AuthContext";
import {database} from "../../firebase";

// REACT ROUTER DOM
import {Link, useHistory} from "react-router-dom";


// MATERIAL UI IMPORT
import Button from '@material-ui/core/Button';

// CSS IMPORT

import './ConfirmEmailSent.css';
import {Alert} from "@material-ui/lab";

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

    }, [currentUser.uid])


    async function sendEmail(ev){
        ev.preventDefault();
        console.log(currentUser)
        try{
        reSendEmail(currentUser)
            .then(() => {
                console.log('email envoyé a ' + currentUser.email);
                history.push('/send-new-validation');
            })
        } catch(error) {
            setError('Marche pas');
        }
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

    <div className='sign-in-validation container'>

        <div className="text-validation">

            {error ? <Alert severity="error">{error}</Alert> :
            <p>{userData.firstname}Votre inscription a bien été prise en compte.
            Un e-mail de confirmation vous a été envoyé, merci de vérifier votre boite mail.
                <br></br>Attention, vérifiez si le mail n'est pas dans vos Spams.</p>}

        </div>

        {/* MATERIAL UI BUTTON FOR CLOSE VALIDATION */}
        <Button component={Link} to={'/send-new-validation'} onClick={sendEmail}>Renvoyer un mail</Button>

        <div className="button-bot-account">
            <Button variant="contained" onClick={handleLogout}> Se deconnecter </Button>
        </div>

    </div>
    );
  }