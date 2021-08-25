/// ----- Material UI ----- ///

import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/// ----- CSS ----- ///

import './cowalkingTicketHeader.css';

// IMPORT MODULES
import {Link, useHistory} from "react-router-dom";
import {useEffect} from "react";
import {database} from '../../firebase';

//////// HEADER DU TICKET DE COPIETONNAGE /////////

function CowalkingTicketHeader({cowalk}) {


    const history = useHistory();
    const currentCowalkStartTime = new Date(cowalk.startTime.seconds*1000).toLocaleString('fr-FR',{timeZone:"Europe/Paris", hour:"2-digit",minute:"2-digit"})

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
            .finally(() => {
                history.push("/list")
            })


    }

    return (
        <div className="cowalkingTicketHeader">
            <div className='cowalkingTicketHeaderTitle'>

                <ButtonRound onClick={handleDeleteCowalk} aria-label="delete">
                    <DeleteIcon/>
                </ButtonRound>
                <h2>Itinéraire:</h2>

                <Link
                    to={`/ticket/edit/${cowalk.id}`}
                >
                    <ButtonRound aria-label="edit">
                        <EditIcon/>
                    </ButtonRound>

                </Link>
            </div>
            <div className='cowalkingTicketRoute'>
                <div>
                    <h3>Départ:</h3>
                    <p>{cowalk.startFrom}</p>
                </div>
                <span>
                    <TrendingFlatIcon/>
                </span>
                <div>
                    <h3>Destination:</h3>
                    <p>{cowalk.goTo}</p>
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