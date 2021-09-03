/// ----- React Modules ----- ///
import React, {useState} from "react";
import {useHistory, Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

// MATERIAL UI IMPORT
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Alert} from "@material-ui/lab";

import BandeauWarning from "../../components/BandeauWarning/BandeauWarning";

// CSS IMPORT
import './login.css';

//PAGE CONNEXION
export default function Login () {


    const [email,setEmail] = useState ("")
    const [password,setPassword] = useState ("")
    const [error, setError] = useState('');
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

   
    async function handleSubmit(ev){
        ev.preventDefault();
        
        try {
            setLoading(true);
            setError('');
            email && password && login(email,password).then(()=> {
                history.push('/account');
                }
            )
                .catch(() => {
                    setError('Echec de connexion')
                })
            setEmail('')
            setPassword('')

        } catch(error) {
            setError('Echec de connexion');
            
        }
        setLoading(false);
    }

    return (

    <div className='login'>
        <div className="container">
            <div className='logo-woomy-login'>
                <svg width="120" height="85" viewBox="0 0 120 85" fill="none" xmlns="http://www.w3.org/2000/svg">

                <path fillRule="evenodd" clipRule="evenodd" d="M26.0499 9.01515C21.7823 9.01515 18.3227 12.4748 18.3227 16.7424C18.3227 21.0101 21.7823 24.4697 26.0499 24.4697C30.3176 24.4697 33.7772 21.0101 33.7772 16.7424C33.7772 12.4748 30.3176 9.01515 26.0499 9.01515ZM9.30752 16.7424C9.30752 7.49584 16.8034 0 26.0499 0C35.2965 0 42.7924 7.49584 42.7924 16.7424C42.7924 20.9147 41.2662 24.7306 38.7416 27.6621C39.9993 28.0997 41.2861 28.6314 42.6015 29.2753C47.9674 31.9019 53.5518 36.2676 59.5221 43.2373C65.4924 36.2676 71.0768 31.9019 76.4427 29.2753C77.7581 28.6314 79.0449 28.0997 80.3026 27.6621C77.778 24.7306 76.2518 20.9147 76.2518 16.7424C76.2518 7.49584 83.7477 0 92.9942 0C102.241 0 109.737 7.49584 109.737 16.7424C109.737 21.3904 107.843 25.596 104.784 28.6296C109.985 31.3386 113.657 35.6968 115.944 40.5322C119.594 48.2467 119.907 57.5026 117.482 63.7673C116.583 66.0889 113.973 67.2424 111.651 66.3437C109.329 65.4451 108.176 62.8345 109.075 60.5129C110.513 56.7966 110.505 50.115 107.795 44.3873C105.243 38.9934 100.491 34.7727 92.3503 34.7727C88.5692 34.7727 84.7105 35.2655 80.4062 37.3724C76.1041 39.4783 71.061 43.3436 65.1733 50.5295C69.1453 56.2197 72.5962 62.5897 73.8269 68.2444C74.6464 72.0101 74.6844 76.4329 72.0187 79.9821C69.2861 83.6204 64.7413 84.9999 59.5348 84.9999V75.9848C63.4155 75.9848 64.5188 74.9562 64.8103 74.568C65.1688 74.0907 65.6071 72.8688 65.0179 70.1615C64.2784 66.7632 62.24 62.5593 59.5221 58.2971C56.8041 62.5593 54.7658 66.7632 54.0263 70.1615C53.4371 72.8688 53.8753 74.0907 54.2338 74.568C54.5254 74.9562 55.6287 75.9848 59.5093 75.9848V84.9999C54.3029 84.9999 49.7581 83.6204 47.0254 79.9821C44.3598 76.4329 44.3978 72.0101 45.2173 68.2444C46.4479 62.5897 49.8989 56.2197 53.8709 50.5295C47.9832 43.3436 42.94 39.4783 38.6379 37.3724C34.3337 35.2655 30.475 34.7727 26.6939 34.7727C18.5534 34.7727 13.8008 38.9934 11.2492 44.3873C8.53963 50.115 8.53093 56.7966 9.9695 60.5129C10.8682 62.8345 9.71469 65.4451 7.3931 66.3437C5.07151 67.2424 2.46095 66.0889 1.56227 63.7673C-0.862811 57.5026 -0.549529 48.2467 3.09985 40.5322C5.38727 35.6968 9.05926 31.3386 14.2599 28.6296C11.2016 25.596 9.30752 21.3904 9.30752 16.7424ZM100.722 16.7424C100.722 12.4748 97.2619 9.01515 92.9942 9.01515C88.7266 9.01515 85.267 12.4748 85.267 16.7424C85.267 21.0101 88.7266 24.4697 92.9942 24.4697C97.2619 24.4697 100.722 21.0101 100.722 16.7424Z" fill="url(#paint0_linear)"/>
                <defs>
                <linearGradient id="paint0_linear" x1="101" y1="6.83224e-06" x2="3.56042e-06" y2="85" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F21323"/>
                <stop offset="1" stopColor="#DD0081"/>

                </linearGradient>
                </defs>
                </svg>
            </div>

            {error && <Alert severity="error">{error}</Alert> }
            <form className='login-content' onSubmit={handleSubmit}>

                {/* MATERIAL UI INPUT TO COMPLETE FOR LOGIN */}
                <TextField value={email} onChange={(e)=>setEmail(e.target.value)} id="email" label="Entrez votre email" variant="standard" />

                <TextField type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" label="Entrez votre mot de passe" variant="standard" />

                <div className='button-container'>
                    <Button disabled={loading} type='submit' variant="contained">S'identifier</Button>
                </div>
                <p className="forgot-password">Mot de passe oublié ? <br/>
                    Demandez une réinitialisation à<br/>
                    <a href="mailto:contact@woomy.fr">contact@woomy.fr</a></p>
            </form>


            <div className='button-container noAccount'>

                {/* MATERIAL UI INPUT TO COMPLETE FOR SIGNIN */}
                <p>Pas de compte ?</p>
                <Button component={Link} to={'/signin'} variant="contained">S'inscrire</Button>

            </div>
        </div>
    <BandeauWarning/>
    </div>
    );
  }