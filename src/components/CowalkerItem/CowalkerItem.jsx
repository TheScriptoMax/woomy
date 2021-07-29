import PhoneIcon from '@material-ui/icons/Phone';
import ButtonRound from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import './cowalkerItem.css'
import profilpic from './profile-pic-placeholder.png'

function CowalkerItem () {

    return(
        <li className="cowalkerItem">
            <figure>
                <img src={profilpic} alt="profil picture"/>
            </figure>
            <h3>Michelin Machin</h3>
            <div className="cowalkerItemButton">
                <ButtonRound>
                    <PhoneIcon/>
                </ButtonRound>
                <ButtonRound>
                    <MessageIcon/>
                </ButtonRound>
            </div>
        </li>
    )
}


export default CowalkerItem;