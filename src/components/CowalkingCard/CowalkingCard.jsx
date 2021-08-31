import {useState,useEffect} from 'react'
/// ----- Material UI ----- ///
import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/// ----- Import image ----- ///
import ImageProfil from './profile-pic-placeholder.png'
import {database} from '../../firebase';


import {useAuth} from "../../contexts/AuthContext";


/// ----- CSS ----- ///
import "./cowalkingCard.css";

/// ----- React Modules ----- ///
import {Link} from "react-router-dom";

/////////// CARTE DE COPIETONNAGE //////////////

function CowalkingCard ({cowalk,index}) {

    const [isOwner,setIsOwner] = useState(false)
    const [membersList, setMembersList] = useState([]);

    const {currentUser} = useAuth();
     



    useEffect(() => {
        currentUser.uid === cowalk.owner ? setIsOwner(true) : setIsOwner(false)
    }, [cowalk]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        return database.membersApproved(cowalk.id).onSnapshot((querySnapshot) => {
            const approvedMembers = [];
            querySnapshot.forEach((doc) => {
                approvedMembers.push(database.formatDoc(doc))
            })
            setMembersList(approvedMembers)
        });
    }, [cowalk]) // eslint-disable-line react-hooks/exhaustive-deps

    function handleDeleteCowalk(ev) {
        ev.preventDefault();
        const deletePromises = [];


        database.membersPending(cowalk.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    deletePromises.push(
                        database.membersPending(cowalk.id).doc(doc.id).delete()
                    )
                })
            })

        database.membersApproved(cowalk.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    deletePromises.push(
                        database.membersApproved(cowalk.id).doc(doc.id).delete()
                    )
                })
            })


        deletePromises.push(database.cowalks.doc(cowalk.id)
            .delete())

        Promise.all(deletePromises)
            .then(() => {
                console.log('Docs supprimés')
            })
            .catch((error) => {
                console.log(error)
            })
    }



    
    const currentCowalkStartTime = new Date(cowalk.startTime.seconds*1000).toLocaleString('fr-FR',{timeZone:"Europe/Paris",day:"numeric",month:"short", hour:"2-digit",minute:"2-digit"})
    
    return(
        <Link
            to={`/ticket/${cowalk.id}`}
            >
            <li className='cowalkingCard' key={cowalk.id}>
                <div className='cowalkingCardTitle'>
                <p className='cowalk-start'>Heure de départ:{currentCowalkStartTime}</p>
                    {/* <h3>itinéraire:{index+1}</h3> */}
                    <div className="main-card">
                        <div className="cowalk-bar">
                            <div className="dot"></div>
                            <div className="bar"></div>
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
                                <li><span>+{membersList.length+1}</span></li>
                            </ul>
                        </div>
                        <div className='cowalkingCardButtons'>
                            {isOwner && 
                            <div className='buttons-owner'>
                                <ButtonRound aria-label="delete" onClick={handleDeleteCowalk}>
                                    <DeleteIcon/>
                                </ButtonRound>
                                <Link
                                to={`/ticket/edit/${cowalk.id}`}
                                >
                                    <ButtonRound aria-label="edit">
                                        <EditIcon/>
                                    </ButtonRound>
                                </Link>
                            </div>}
                    
                        
                    </div>    
                </div>
            </li>
        </Link>
    )
}


export default CowalkingCard