import './passwordchange.css'
import { TextField, Button } from '@material-ui/core';

function PasswordChange () {
    return (
     <div class="container">
         <h1>changer votre mot de passe</h1>
         <form>
         <TextField type='password' placeholder='tappez votre nouveau mot de passe ici'/>
         <Button type="submit">Valider</Button>
         </form>
     </div>
    )
};
export default PasswordChange;