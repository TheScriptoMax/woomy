/// ----- React Modules ----- ///
import SignIn from '../SignIn/SignIn'
import React, {useRef, useState} from "react";
import {useHistory, Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

// MATERIAL UI IMPORT
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// CSS IMPORT
import './Login.css';
import {Alert} from "@material-ui/lab";

//PAGE CONNEXION
export default function Login () {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(ev){
        ev.preventDefault();

        try {
            setLoading(true);

            setError('');
            await login(emailRef.current.value, passwordRef.current.value).then(()=> {
                history.push('/account');
            })

        } catch(error) {
            setError('Echec de connexion');
        }

        setLoading(false);
    }

    return (

    <div className='login container'>

        {error && <Alert severity="error">{error}</Alert> }
        <form className='login-content' onSubmit={handleSubmit}>

            {/* MATERIAL UI INPUT TO COMPLETE FOR LOGIN */}
            <TextField inputRef={emailRef} id="standard-basic" label="Entrez votre email" variant="standard" />

            <TextField type="password" inputRef={passwordRef} id="standard-basic" label="Entrez votre mot de passe" variant="standard" />
            <p className='forgot-password'>Vous avez oublié votre mot de passe? <a href=''>Cliquez ici</a></p>
            <div className='button-container'>
                <Button disabled={loading} type='submit' variant="contained">S'identifier</Button>
            </div>
        </form>


        <div className='button-container'>

            {/* MATERIAL UI INPUT TO COMPLETE FOR SIGNIN */}
            <p>Pas de compte ?</p>
            <Button component={Link} to={'/signin'} variant="contained">S'inscrire</Button>

        </div>

    </div>
    );
  }