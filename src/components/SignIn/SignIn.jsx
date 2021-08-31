// REACT IMPORT
import {useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {database} from '../../firebase';

// MATERIAL UI IMPORT
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// CSS IMPORT
import './SignIn.css';
import {useAuth} from "../../contexts/AuthContext";
import {Alert} from "@material-ui/lab";

//PAGE INSCRIPTION
export default function SignIn () {

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const phoneRef = useRef();
    const birthdateRef = useRef();
    const history = useHistory();

    const {signup} = useAuth()

    async function handleSubmit(ev) {
        ev.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Vos mots de passe doivent correspondre.');
        }
        try {
            setLoading(true);
            setError('');
            await signup(emailRef.current.value, passwordRef.current.value)
                .then((authUser) => {
                    database.users
                        .doc(authUser.user.uid)
                        .set({
                            email: emailRef.current.value,
                            firstname: firstnameRef.current.value,
                            lastname: lastnameRef.current.value,
                            phoneNumber: phoneRef.current.value,
                            birthdate: birthdateRef.current.value,
                            createdAt: database.getCurrentTimestamp,
                            profilPic: '',
                            accepted:false,
                            admin:false
                        })
                        .then(() => {
                            console.log('Crée dans la database')
                            history.push("/send-confirm")
                        })
                        .catch((error)=> {
                            console.log(error.message)
                        });
                })
                .catch((error) => {
                    console.log("Message d'erreur: " + error.message)

                })
        } catch
            (error) {
            setError(error.message)
        }
        setLoading(false);
    }


    return (

    <div className='sign-in container'>

        <form onSubmit={handleSubmit} className='sign-in-content'>

            {/* MATERIAL UI INPUT TO COMPLETE FOR SIGNIN */}
            <TextField inputRef={firstnameRef} id="standard-basic" label="Entrez votre nom" variant="standard" />
            
            <TextField inputRef={lastnameRef} id="standard-basic" label="Entrez votre prénom" variant="standard" />
            
            <TextField inputRef={emailRef} type='email' id="standard-basic" label="Entrez votre email" variant="standard" />


            <TextField type="tel" inputRef={phoneRef} id="standard-basic" label="Entrez votre numéro de téléphone" variant="standard" />

            <TextField type="date" inputRef={birthdateRef} id="standard-basic" label="Entrez votre date de naissance" variant="standard"  InputLabelProps={{

          shrink: true,
        }}/>

            <TextField type="password" inputRef={passwordRef} id="standard-basic" label="Entrez un mot de passe" variant="standard" />
            
            <TextField type="password" inputRef={passwordConfirmRef} id="standard-basic" label="Confirmez le mot de passe" variant="standard" />

            {error && <Alert severity="error">{error}</Alert>}

            <Button disabled={loading} type="submit" variant="contained">S'inscrire</Button>



        </form>

        <div className='valid-sign-in'>
                <p>Une pièce d’identité et une photo de vous, seront demandées, car nécessaires pour établir votre propre sécurité et celles avec qui vous ferez du copiétonnage. Après chaque vérification, nous détruirons celles-ci.
                </p>
        </div>

    </div>
    );
  }