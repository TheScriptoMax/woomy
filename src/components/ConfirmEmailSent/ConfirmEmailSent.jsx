// CSS FIREBASE
import {useAuth} from "../../contexts/AuthContext";
import {useState, useEffect} from "react";

// MATERIAL UI IMPORT
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import {Link} from "react-router-dom";

// CSS IMPORT

import './ConfirmEmailSent.css';
import {auth, database} from "../../firebase";

//PAGE VALIDATION INCRIPTION 

export default function ConfirmEmailSent () {

    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const {logout, reSendEmail} = useAuth();

    const {currentUser} = useAuth();

    useEffect(()=> {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
            })

    }, [currentUser.uid])


    function sendEmail(){
        const userEmail = auth.currentUser.email;

        reSendEmail(auth.currentUser)
            .then(
                console.log('Email envoyé')
            );

        ;
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

    <div className='signIn-Validation container'>

        <div className="text-validation">
            <p>Votre inscription a bien été prise en compte. 
            Un e-mail de confirmation vous a été envoyé, merci de vérifier votre boite mail.
                Attention, vérifiez si le mail n'est pas dans vos Spams.</p>

        </div>

        {/* MATERIAL UI BUTTON FOR CLOSE VALIDATION */}
        <Button>Renvoyer un mail</Button>

    </div>
    );
  }