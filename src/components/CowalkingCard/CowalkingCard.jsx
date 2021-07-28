import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import "./cowalkingCard.css";



function CowalkingCard () {
    
    return(
        <li className='cowalkingCard'>
            <div>
                <h3>itinéraire:</h3>
                <div>
                    <p>Départ:</p>
                    <span></span>
                    <p>Destination:</p>
                </div>
                <p>Heure de départ:</p>
            </div>
            <div>
                <div>
                    <GroupIcon/>
                    <span></span>
                </div>
            </div>
            <div>
                <ButtonRound aria-label="delete">
                    <DeleteIcon/>
                </ButtonRound>
                <ButtonRound aria-label="edit">
                    <EditIcon/>
                </ButtonRound>
            </div>
        </li>
    ) 
}


export default CowalkingCard