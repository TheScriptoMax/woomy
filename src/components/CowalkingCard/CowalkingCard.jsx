import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import "./cowalkingCard.css";



function CowalkingCard ({cowalk,index}) {
    
    return(
        <li className='cowalkingCard' key={cowalk.id} onClick={()=>{ console.log('onClickli'); }}>
            <div className='cowalkingCardTitle'>
                <h3>itinéraire:{index+1}</h3>
                <div className='cowalkingCardRoute'>
                    <div className="cowalkingCardDeparture">
                        <p>Départ:</p>
                        <span>{cowalk.startFrom}</span>
                    </div>
                    <span>
                        <TrendingFlatIcon/>
                    </span>
                    <div className="cowalkingCardDestination">
                        <p>Destination:</p>
                        <span>{cowalk.goTo}</span>
                    </div>
                </div>
                <p>Heure de départ:{cowalk.startTime.match(/[\d]{2}:[\d]{2}/g)}</p>
            </div>
            <div className='cowalkingCardFooter'>
                <div className='cowalkingCardCount'>
                    <GroupIcon/>
                    <span></span>
                </div>
                <div className='cowalkingCardButtons'>
                    <ButtonRound aria-label="delete" onClick={(e) => { 
                        e.stopPropagation()
                        console.log('onClick'); }}>
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