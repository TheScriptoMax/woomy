import './passwordchange.css';
import { useRef, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import firebase from 'firebase';

function PasswordChange () {
    const newPasswordRef = useRef();

    function passwordResetSubmit(){
    

    const urlSearchParams = new URLSearchParams(window.location.search);
    const actionCode = (Object.fromEntries(urlSearchParams.entries())).oobCode;
    //const actionCode = params.oobCode;
    firebase.auth().confirmPasswordReset(actionCode, newPasswordRef)
        .then(() => {
            console.log("C'est confirmé");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
     <div class="container">
         <h1>changer votre mot de passe</h1>
         <form>
         <TextField inputRef={newPasswordRef} type='password' placeholder='tappez votre nouveau mot de passe ici'/>
         <Button type="submit" onClick={passwordResetSubmit}>Valider</Button>
         </form>
     </div>
    )
};
export default PasswordChange;