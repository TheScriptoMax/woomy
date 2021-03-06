// REACT IMPORT
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {database} from '../../firebase';

// MATERIAL UI IMPORT
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// CSS IMPORT
import './SignIn.css';
import {useAuth} from "../../contexts/AuthContext";
import {Alert} from "@material-ui/lab";

import BandeauWarning from "../../components/BandeauWarning/BandeauWarning";

//PAGE INSCRIPTION
export default function SignIn () {

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [phone,setPhone] = useState('');
    const [birthdate,setBirthdate] = useState('');
    const history = useHistory();

    const {signup} = useAuth()

    async function handleSubmit(ev) {
        ev.preventDefault();
        if (password !== passwordConfirm) {
            return setError('Vos mots de passe doivent correspondre.');
        }
        try {
            setLoading(true);
            setError('');
            await signup(email, password)
                .then((authUser) => {
                    database.users
                        .doc(authUser.user.uid)
                        .set({
                            email: email,
                            firstname: firstname,
                            lastname: lastname,
                            phoneNumber: phone,
                            birthdate: birthdate,
                            profilPic: '',
                            createdAt: database.getCurrentTimestamp,
                            accepted:false,
                            admin:false,
                            approvalCowalk:[]
                        })
                        .then(() => {
                            history.push("/send-confirm")
                        })

                })

        } catch
            (error) {
            setError(error.message)
        }
        setLoading(false);
    }


    return (
    <div>
        <div className='sign-in container'>

            <form onSubmit={handleSubmit} className='sign-in-content'>

                {/* MATERIAL UI INPUT TO COMPLETE FOR SIGNIN */}
                <TextField label="Entrez votre pr??nom" variant="standard" value={firstname} onChange={(event)=>setFirstname(event.target.value)} />
                
                <TextField label="Entrez votre nom" variant="standard" value={lastname} onChange={(event)=>setLastname(event.target.value)} />
                
                <TextField type='email' label="Entrez votre email" variant="standard" value={email} onChange={(event)=>setEmail(event.target.value)} />


                <TextField type="tel" label="Entrez votre num??ro de t??l??phone" variant="standard" value={phone} onChange={(event)=>setPhone(event.target.value)} />

                <TextField type="date" label="Entrez votre date de naissance" variant="standard" value={birthdate} onChange={(event)=>setBirthdate(event.target.value)}  InputLabelProps={{

            shrink: true}}  />

                <TextField type="password" label="Entrez un mot de passe" variant="standard" value={password} onChange={(event)=>setPassword(event.target.value)} />
                
                <TextField type="password"  label="Confirmez le mot de passe" variant="standard" value={passwordConfirm} onChange={(event)=>setPasswordConfirm(event.target.value)} />

                {error && <Alert severity="error">{error}</Alert>}

                <Button disabled={loading} type="submit" onClick={handleSubmit} variant="contained">S'inscrire</Button>



            </form>

            <div className='valid-sign-in'>
                    <p>Une pi??ce d???identit?? et une photo de vous, seront demand??es, car n??cessaires pour ??tablir votre propre s??curit?? et celles avec qui vous ferez du copi??tonnage. Apr??s chaque v??rification, nous d??truirons celles-ci.
                    </p>
            </div>
        </div>
        <BandeauWarning/>
    </div>
    );
  }