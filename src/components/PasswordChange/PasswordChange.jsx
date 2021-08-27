// [import './passwordchange.css';
// import { useRef, useState } from 'react';
// import { TextField, Button } from '@material-ui/core';
// <<<<<<< HEAD
// import Alert from '@material-ui/lab/Alert';
// import { useState } from 'react';
// import { useHistory } from 'react-router';

// function PasswordChange () {
//     const history = useHistory();
//     const [isShow, setIsShow] = useState(true);
//     const handleClick = (e) => {
//         e.preventDefault();
//       setIsShow(!isShow);
//       setTimeout(() => {
//         history.push('/login');
//     }, 5000)
//     };
//     return (
//      <div class="container">
//          <h1>Changer votre mot de passe</h1>
//          <form onSubmit={handleClick}>
//             <TextField type='password' placeholder='tappez votre nouveau mot de passe ici'/>
//             <Button  type="submit" >Valider</Button>
//             {!isShow && <Alert severity="info">Votre mot de passe a été réinitialisé</Alert>}
// =======
// import firebase from 'firebase';

// function PasswordChange () {
//     const newPasswordRef = useRef();

//     function passwordResetSubmit(){
    

//     const urlSearchParams = new URLSearchParams(window.location.search);
//     const actionCode = (Object.fromEntries(urlSearchParams.entries())).oobCode;
//     //const actionCode = params.oobCode;
//     firebase.auth().confirmPasswordReset(actionCode, newPasswordRef)
//         .then(() => {
//             console.log("C'est confirmé");
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     }

//     return (
//      <div class="container">
//          <h1>changer votre mot de passe</h1>
//          <form>
//          <TextField inputRef={newPasswordRef} type='password' placeholder='tappez votre nouveau mot de passe ici'/>
//          <Button type="submit" onClick={passwordResetSubmit}>Valider</Button>
// >>>>>>> dev
//          </form>
//      </div>
//     )
// };
// export default PasswordChange;