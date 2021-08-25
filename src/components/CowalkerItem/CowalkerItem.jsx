
/// ----- Material UI ----- ///
import PhoneIcon from '@material-ui/icons/Phone';
import ButtonRound from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';


/// ----- Import Img ----- ///
import profilpic from './profile-pic-placeholder.png';

/// ----- CSS ----- ///
import './cowalkerItem.css'


///////// Carte copiétonneuse ///////

function CowalkerItem () {


    return(
        <li className="cowalkerItem">
            <figure>
                <img src={profilpic} alt="profil"/>
            </figure>
            <h3>Michelin Machin</h3>
            <div className="cowalkerItemButton">
                <ButtonRound>
                    <PhoneIcon/>
                </ButtonRound>
            </div>
        </li>
    )
}


export default CowalkerItem;