// IMPORT REACT
import {useState,useEffect} from 'react'

/// ----- Material UI ----- ///
import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/// ----- Import image ----- ///
import ImageProfil from '../../assets/profile-pic-placeholder.png'

// IMPORT FIREBASE
import {useAuth} from "../../contexts/AuthContext";

/// ----- CSS ----- ///
import "./cowalkingCard.css";

/// ----- React Modules ----- ///
import {Link} from "react-router-dom";
import firebase from 'firebase/app';
import {database} from '../../firebase';

/////////// CARTE DE COPIETONNAGE //////////////

function CowalkingCard ({cowalk,index}) {

    const [isOwner,setIsOwner] = useState(false)
    const [membersList, setMembersList] = useState([]);


    const [urlPicture, setUrlPicture] = useState('')
    const [pictureLoading, setPictureLoading] = useState(false)



    const {currentUser} = useAuth();
     



    useEffect(() => {
        currentUser.uid === cowalk.owner ? setIsOwner(true) : setIsOwner(false)
        const uid = cowalk.owner
        database.users.doc(uid)
            .get()
            .then((doc) => {
                // database.formatDoc(doc)
                if (doc.data().profilPic !== '') {
                    setUrlPicture(doc.data().profilPic)
                    setPictureLoading(true)
                }
            })
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
                    deletePromises.push(database.users.doc(doc.id).update({
                        approvalCowalk:firebase.firestore.FieldValue.arrayRemove(
                            cowalk.id
                        )
                    }))
                    deletePromises.push(
                        database.membersApproved(cowalk.id).doc(doc.id).delete()
                    )
                })
            })


        deletePromises.push(database.cowalks.doc(cowalk.id)
            .delete())

        Promise.all(deletePromises)
            .then(() => {
                console.log('Docs supprim??s')
            })

    }



    
    const currentCowalkStartTime = new Date(cowalk.startTime.seconds*1000).toLocaleString('fr-FR',{timeZone:"Europe/Paris",day:"numeric",month:"short", hour:"2-digit",minute:"2-digit"})
    
    return(

            <li className='cowalkingCard' key={cowalk.id}>
                <Link
                    to={`/ticket/${cowalk.id}`}
                >
                <div>
                    <div className='cowalkingCardTitle'>
                    <p className='cowalk-start'>Heure de d??part : {currentCowalkStartTime}</p>
                        {/* <h3>itin??raire:{index+1}</h3> */}
                        <div className="main-card">
                            <div className="cowalk-bar">
                                <div className="dot"></div>
                                <div className="bar"></div>
                                <div className="dot"></div>
                            </div>
                                <div className='cowalkingCardRoute'>
                                    <div className="cowalkingCardDeparture">
                                        <p>D??part:  </p>
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
                                {pictureLoading ?
                                    <img src={urlPicture} alt="profil" /> :
                                    <img src={ImageProfil} alt="profil" />
                                }
                            </figure>
                            <ul>
                                <li>
                                    {membersList.length > 0 ?
                                        <span className='members-list'>+{membersList.length}</span> :
                                        <span className='members-list'>+0</span>
                                    }
                                </li>
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
                </div>
            </Link>
        </li>

    )
}


export default CowalkingCard