/// ----- Material UI ----- ///
import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {database} from '../../firebase';

import EditIcon from '@material-ui/icons/Edit';

/// ----- CSS ----- ///
import './cowalkingTicketHeader.css';

// IMPORT MODULES
import {Link, useHistory} from "react-router-dom";
import {useEffect,useState} from "react";
import {database} from '../../firebase';

import {useAuth} from "../../contexts/AuthContext";



//////// HEADER DU TICKET DE COPIETONNAGE /////////

function CowalkingTicketHeader({cowalk}) {


    const [isOwner,setIsOwner] = useState(false);
    const [startFromUrl, setStartFromUrl] = useState([]);
    const [goToUrl, setGoToUrl] = useState([]);

    const history = useHistory();
    const currentCowalkStartTime = new Date(cowalk.startTime.seconds*1000).toLocaleString('fr-FR',{timeZone:"Europe/Paris",day:"numeric",month:"short", hour:"2-digit",minute:"2-digit"})

    const {currentUser} = useAuth();
    

    useEffect(() => {
        currentUser.uid === cowalk.owner ? setIsOwner(true) : setIsOwner(false);

        database.locations.where("name", "==", cowalk.startFrom)
            .get()
            .then((querySnapshot) => {
                const tempSnapshot = []
                querySnapshot.forEach(result => {
                    tempSnapshot.push(database.formatDoc(result))
                })
                setStartFromUrl(tempSnapshot[0].mapUrl)
            });

            database.locations.where("name", "==", cowalk.goTo)
            .get()
            .then((querySnapshot) => {
                const tempSnapshot = []
                querySnapshot.forEach(result => {
                    tempSnapshot.push(database.formatDoc(result))
                })
                setGoToUrl(tempSnapshot[0].mapUrl)
            })
            
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
                        approvalCowalk:database.approvalCowalkRemove(cowalk.id)
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
                console.log('Docs supprimés')
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                history.push("/list")
            })

    }

    

    return (
        <div className="cowalkingTicketHeader">
        
        <h2>Itinéraire</h2>
        {isOwner &&
            <div className="cowalkingTicketHeaderButtonWrapper">
                <div className='cowalkingTicketHeaderButton'>
                    <ButtonRound onClick={handleDeleteCowalk} aria-label="delete">
                        <DeleteIcon/>
                    </ButtonRound>
                    <Link
                        to={`/ticket/edit/${cowalk.id}`}
                    >
                        <ButtonRound aria-label="edit">
                            <EditIcon/>
                        </ButtonRound>

                    </Link>
                </div>
            </div>}
            <div className={isOwner ? 'cowalkingTicketRoute' : 'cowalkingTicketRoute marginTop' }>
                <div>
                    <h3>Départ:</h3>
                    <p>{cowalk.startFrom}</p>
                    <a className='cowalk-header-map' href={startFromUrl} target="_blank" rel="noreferrer">Voir sur la carte</a>
                </div>

                <div className="ticket-to-go">
                    <h3>Destination :</h3>
                    <p >{cowalk.goTo}</p>
                    <a className='cowalk-header-map' href={goToUrl} target="_blank" rel="noreferrer">Voir sur la carte</a>
                </div>
            </div>
            <div className='cowalkingTicketDeparture'>
                <h3>Heure de départ:</h3>
                <p>{currentCowalkStartTime}</p>
            </div>
        </div>
    )
};

export default CowalkingTicketHeader;