// MATERIAL UI IMPORT
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

// CSS IMPORT

import './ConfirmEmailSent.css';

//PAGE VALIDATION INCRIPTION 

export default function ConfirmEmailSent () {



    return (

    <div className='signIn-Validation container'>

        <div className="text-validation">
            <p>Votre inscription a bien été prise en compte. 
            Nous vous enverrons un e-mail de confirmation pour vous confirmer l’activation de votre compte Woomy.
            Et cela dans les meilleurs délais possible.</p>
        </div>

        {/* MATERIAL UI BUTTON FOR CLOSE VALIDATION */}
        <IconButton aria-label="close">
            <CloseIcon />
        </IconButton>

    </div>
    );
  }