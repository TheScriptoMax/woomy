/// 

import {useState} from 'react';

/// ----- Material UI ----- ///
import PhoneIcon from '@material-ui/icons/Phone';
import ButtonRound from '@material-ui/core/IconButton';


/// ----- Import Img ----- ///
import profilpic from './profile-pic-placeholder.png';

/// ----- CSS ----- ///
import './cowalkerItem.css'


///////// Carte copiétonneuse ///////

function CowalkerItem ({member}) {
    const [togglePhone, setTogglePhone] = useState(true)

    const handlePhone = (event) =>{
        event.preventDefault()
        setTogglePhone(!togglePhone)
    }

    console.log(member)

    return(
        <li className="cowalkerItem">
            <figure>
                <img src={profilpic} alt="profil"/>
            </figure>
            <h3>{member.firstname} {member.lastname}</h3>
            <div className="cowalkerItemButton">
                {togglePhone ? (<ButtonRound onClick={(event)=>handlePhone(event)}>
                    <PhoneIcon/>
                </ButtonRound>) : (<a href={`tel:${member.phoneNumber}`}>{member.phoneNumber}</a>)}
            </div>
        </li>
    )
}


export default CowalkerItem;