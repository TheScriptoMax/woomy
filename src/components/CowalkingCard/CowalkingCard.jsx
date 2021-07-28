import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import "./cowalkingCard.css";



function CowalkingCard () {
    
    return(
        <li className='cowalkingCard'>
            <div className='cowalkingCardTitle'>
                <h3>itinéraire:</h3>
                <div className='cowalkingCardRoute'>
                    <p>Départ:</p>
                    <span>
                        <TrendingFlatIcon/>
                    </span>
                    <p>Destination:</p>
                </div>
                <p>Heure de départ:</p>
            </div>
            <div className='cowalkingCardFooter'>
                <div className='cowalkingCardCount'>
                    <GroupIcon/>
                    <span></span>
                </div>
                <div className='cowalkingCardButtons'>
                    <ButtonRound aria-label="delete">
                        <DeleteIcon/>
                    </ButtonRound>
                    <ButtonRound aria-label="edit">
                        <EditIcon/>
                    </ButtonRound>
                </div>
            </div>
        </li>
    ) 
}


export default CowalkingCard