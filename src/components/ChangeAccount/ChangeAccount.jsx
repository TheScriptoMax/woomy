// REACT IMPORT
import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";

// MATERIAL UI IMPORT
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// CSS IMPORT
import './ChangeAccount.css';
import {useAuth} from "../../contexts/AuthContext";
import {database} from "../../firebase";
import {Alert} from "@material-ui/lab";

//PAGE INSCRIPTION
export default function ChangeAccount () {

    const [userData, setUserData] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState('');


    const history = useHistory();

    const {currentUser} = useAuth();

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const phoneRef = useRef();


    useEffect(()=> {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
                setPageLoading(false)
            })


    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function handleSubmit(ev) {
        ev.preventDefault();
        const promises = [];

        if (lastnameRef.current.value !== userData.lastname) {
            promises.push(database.users.doc(currentUser.uid).update({
                lastname: lastnameRef.current.value,
            }))
        }

        if (firstnameRef.current.value !== userData.firstname) {
            promises.push(database.users.doc(currentUser.uid).update({
                firstname: firstnameRef.current.value,
            }))
        }
        if (phoneRef.current.value !== userData.phoneNumber) {
            promises.push(database.users.doc(currentUser.uid).update({
                phoneNumber: phoneRef.current.value,
            }))
        }

        Promise.all(promises)
            .then(() => {
                history.push('/account');
            })
            .catch((error) => {
                setError('Problème lors de la mise à jour');
            })
    }


    return (

        <div className='changeAccount container'>

            {!pageLoading &&


            <form onSubmit={handleSubmit} className='changeAccount-content'>

                {/* MATERIAL UI INPUT TO COMPLETE FOR CHANGEACCOUNT */}

                <TextField inputRef={firstnameRef} id="standard-basic" label="Prénom" defaultValue={userData.firstname} variant="standard" />

                <TextField inputRef={lastnameRef} id="standard-basic"  label="Nom" defaultValue={userData.lastname} variant="standard"/>

                <TextField type="tel" inputRef={phoneRef} id="standard-basic" label="Numéro de téléphone" defaultValue={userData.phoneNumber} variant="standard" />

                {error && <Alert severity="error">{error}</Alert>}
                <Button  type="submit" variant="contained">Envoyer</Button>

            </form>}


        </div>
    );
}