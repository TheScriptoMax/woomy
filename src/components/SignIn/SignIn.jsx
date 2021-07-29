import './SignIn.css';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';


export default function SignIn () {
    return (
    <div className='signIn container'>
        <form className='signIn-content'>
    
            <TextField id="standard-basic" label="Entrez votre nom" variant="standard" />
            
            <TextField id="standard-basic" label="Entrez votre prénom" variant="standard" />
            
            <TextField id="standard-basic" label="Entrez votre email" variant="standard" />
            
            <TextField id="standard-basic" label="Entrez un mot de passe" variant="standard" />
            
            <TextField id="standard-basic" label="Confirmez le mot de passe" variant="standard" />
        </form>
        <div className='confirm-id'>
            <div className='photo-confirm'>
                <p>Photo</p>
                <IconButton aria-label="download">
                    <ArrowDownwardIcon />
                </IconButton>
            </div>
            <div className='identity-confirm'>
                <p>Pièce d'identité</p>
                <IconButton aria-label="download">
                    <ArrowDownwardIcon />
                </IconButton>
            </div>  
        </div>
        <div className='valid-signIn'>
                <p>Une pièce d’identité + une photo de vous sont nécessaires pour établir votre propre sécurité et celles avec qui vous ferez du copiétonnage. Après chaque vérification nous détruisont celles ci.
                </p>
                <Button variant="contained">S'inscrire</Button>
        </div>
    </div>
    );
  }