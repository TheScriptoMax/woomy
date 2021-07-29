import './Login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function Login () {
    return (
    <div className='login container'>
        <form className='login-content'>
            
            <TextField id="standard-basic" label="Entrez votre email" variant="standard" />
            
            <TextField id="standard-basic" label="Entrez votre mot de passe" variant="standard" />
            <p className='forgot-password'>Vous avez oublié votre mot de passe? <a href=''>Cliquez ici</a></p>
        </form>
        <div className='button-container'>
            <Button variant="contained">S'identifier</Button>
            <p>Pas de compte ?</p>
            <Button variant="contained">S'inscrire</Button>
        </div>
    </div>
    );
  }