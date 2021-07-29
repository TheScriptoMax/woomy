import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './cowalkingTicketHeader.css';



function CowalkingTicketHeader () {
    return (
        <div className="cowalkingTicketHeader">
            <div className='container'>
                <div className='cowalkingTicketHeaderTitle'>
                    <ButtonRound aria-label="delete">
                        <DeleteIcon/>
                    </ButtonRound>
                    <h2>Itinéraire:</h2>
                    <ButtonRound aria-label="edit">
                        <EditIcon/>
                    </ButtonRound>
                </div>
                <div className='cowalkingTicketRoute'>
                    <div>
                        <h3>Départ:</h3>
                        <p></p>
                    </div>
                    <span>
                        <TrendingFlatIcon/>
                    </span>
                    <div>
                        <h3>Destination:</h3>
                        <p></p>
                    </div>
                </div>
                <div className='cowalkingTicketDeparture'>
                    <h3>Heure de départ:</h3>
                    <p></p>
                </div>
            </div>
        </div>
    )
};

export default CowalkingTicketHeader;