/// ----- Material UI ----- ///

import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/// ----- CSS ----- ///

import './cowalkingTicketHeader.css';
import {Link} from "react-router-dom";

//////// HEADER DU TICKET DE COPIETONNAGE /////////

function CowalkingTicketHeader ({cowalk}) {

    return (
        <div className="cowalkingTicketHeader">
            <div className='cowalkingTicketHeaderTitle'>

                <ButtonRound aria-label="delete">
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
                <p>{cowalk.startTime.toString()}</p>
            </div>
            
        </div>
    )
};

export default CowalkingTicketHeader;