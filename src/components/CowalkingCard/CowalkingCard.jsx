import {useState,useEffect} from 'react'
/// ----- Material UI ----- ///
import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import RemoveIcon from '@material-ui/icons/Remove';
/// ----- Import image ----- ///
import ImageProfil from './profile-pic-placeholder.png'


import {useAuth} from "../../contexts/AuthContext";


/// ----- CSS ----- ///
import "./cowalkingCard.css";

/// ----- React Modules ----- ///
import {Link} from "react-router-dom";

/////////// CARTE DE COPIETONNAGE //////////////

function CowalkingCard ({cowalk,index}) {

    const [isOwner,setIsOwner] = useState(false)

    const {currentUser} = useAuth();
    console.log(currentUser.uid)


    useEffect(() => {
        currentUser.uid === cowalk.owner ? setIsOwner(true) : setIsOwner(false)
    }, [cowalk.owner, currentUser.uid])

    
    const currentCowalkStartTime = new Date(cowalk.startTime.seconds*1000).toLocaleString('fr-FR',{timeZone:"Europe/Paris",day:"numeric",month:"short", hour:"2-digit",minute:"2-digit"})
    
    return(
        <Link
            to={`/ticket/${cowalk.id}`}
            >
            <li className='cowalkingCard' key={cowalk.id}>
                <div className='cowalkingCardTitle'>
                <p className='cowalk-start'>Heure de départ:{currentCowalkStartTime}</p>
                    {/* <h3>itinéraire:{index+1}</h3> */}
                    <div>
                        <div>
                            <div className="dot"></div>
                            <div classname="bar"></div>
                            <div className="dot"></div>
                        </div>
                            <div className='cowalkingCardRoute'>
                                <div className="cowalkingCardDeparture">
                                    <p>Départ:  </p>
                                    <p>{cowalk.startFrom}</p>
                                </div>
                            <div className="cowalkingCardDestination">
                                <p>Destination:  </p>
                                <p>{cowalk.goTo}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='cowalkingCardFooter'>
                    <div className='cowalkingCardCount'>
                        <figure>
                            <img src={ImageProfil} alt="profil" />
                        </figure>
                        <ul>
                            <li><span>+3</span></li>
                        </ul>
                        
                    </div>
                    <div className='cowalkingCardButtons'>
                    {isOwner && 
                    <div className='buttons-owner'>
                        <ButtonRound aria-label="delete" onClick={(e) => { 
                            e.preventDefault();
                            console.log('onClick'); }}>
                            <DeleteIcon/>
                        </ButtonRound>
                        <ButtonRound aria-label="edit" onClick={(e) => { 
                            e.preventDefault();
                            console.log('onClick2'); }}>
                            <EditIcon/>
                        </ButtonRound>
                    </div>
                    }
                    {!isOwner &&<ButtonRound aria-label="remove" onClick={(e) => { 
                        e.preventDefault();
                        console.log('remove'); }}>
                        <RemoveIcon/>
                    </ButtonRound>}
                    </div>
                </div>
            </li>
        </Link>
    )
}


export default CowalkingCard