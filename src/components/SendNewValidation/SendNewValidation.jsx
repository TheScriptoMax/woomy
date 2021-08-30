// CSS FIREBASE
import {useAuth} from "../../contexts/AuthContext";
import {useState, useEffect} from "react";
import {database} from "../../firebase";

// MATERIAL UI IMPORT
import Button from '@material-ui/core/Button';

// CSS IMPORT

import './SendNewValidation.css';
import {Alert} from "@material-ui/lab";
import {useHistory} from "react-router-dom";

//PAGE VALIDATION INCRIPTION

export default function SendNewValidation () {

    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const {reSendEmail, currentUser} = useAuth();

    const history = useHistory();
    const {logout} = useAuth();

    useEffect(()=> {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
            })

    }, [currentUser.uid])


    async function sendEmail(ev){
        ev.preventDefault();
        console.log(currentUser)
        try{
            reSendEmail(currentUser)
                .then(() => {
                    setMessage('email envoyé a ' + currentUser.email);
                })
        } catch(error) {
            setError('Quelque chose n\' pas fonctionné ...');
        }
        console.log(message)
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

        <div className='signIn-Validation container'>
            {error ? <Alert severity="error">{error}</Alert> :
                <div className="text-validation">
                    <p>{userData.firstname}, un e-mail de confirmation vous a été renvoyé, merci de vérifier votre boite mail à l'adresse {currentUser.email}.<br/>
                        Attention, vérifiez si le mail n'est pas dans vos Spams.</p>
                </div>}

            {/* MATERIAL UI BUTTON FOR CLOSE VALIDATION */}
            <Button onClick={sendEmail}>Renvoyer un mail</Button>

            <div className="button-bot-account">
                <Button variant="contained" onClick={handleLogout}> Se deconnecter</Button>
            </div>

        </div>
    );
}