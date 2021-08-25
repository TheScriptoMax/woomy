import './passwordchange.css'
import { TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useHistory } from 'react-router';

function PasswordChange () {
    const history = useHistory();
    const [isShow, setIsShow] = useState(true);
    const handleClick = (e) => {
        e.preventDefault();
      setIsShow(!isShow);
      setTimeout(() => {
        history.push('/login');
    }, 5000)
    };
    return (
     <div class="container">
         <h1>Changer votre mot de passe</h1>
         <form onSubmit={handleClick}>
            <TextField type='password' placeholder='tappez votre nouveau mot de passe ici'/>
            <Button  type="submit" >Valider</Button>
            {!isShow && <Alert severity="info">Votre mot de passe a été réinitialisé</Alert>}
         </form>
     </div>
    )
};
export default PasswordChange;