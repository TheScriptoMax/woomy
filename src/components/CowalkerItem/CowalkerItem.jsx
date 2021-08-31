/// ----- Import React ----- //
import {useState, useEffect} from 'react';

/// ----- Material UI ----- ///
import PhoneIcon from '@material-ui/icons/Phone';
import ButtonRound from '@material-ui/core/IconButton';
import {Avatar} from "@material-ui/core";

/// ----- Import Img ----- ///
import ImageProfil from '../../assets/profile-pic-placeholder.png'

/// ----- CSS ----- ///
import './cowalkerItem.css'

///////// Carte copiétonneuse ///////

function CowalkerItem ({member}) {
    const [togglePhone, setTogglePhone] = useState(true)
    const [urlPicture , setUrlPicture] = useState('')
    const [loadingPicture, setLoadingPicture] = useState(false)

    const handlePhone = (event) =>{
        event.preventDefault()
        setTogglePhone(!togglePhone)
    }

    useEffect(() => {
        if(member.profilPic !== ''){
            setLoadingPicture(true)
        }
    })

    return(
        <li className="cowalkerItem">
            <figure>
                {loadingPicture ?
                    <img src={member.profilPic} alt="profil"/> :
                    <img src={ImageProfil} alt="profil"/>
                }
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