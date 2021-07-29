import './Login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function Login () {
    return (
    <div className='login container'>
        <form className='login-contain'>
            <p>E-Mail</p>
            <TextField id="standard-basic" label="Entrez votre email" variant="standard" />
            <p>Mot de passe</p>
            <TextField id="standard-basic" label="Entrez votre mot de passe" variant="standard" />
            <p>Vous avez oublié votre mot de passe? <span>Cliquez ici</span></p>
        </form>
        <div>
            <Button variant="contained">S'identifier</Button>
            <p>Pas de compte ?</p>
            <Button variant="contained">S'inscrire</Button>
        </div>
    </div>
    );
  }