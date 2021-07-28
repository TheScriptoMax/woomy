import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



function CowalkingCard () {
    
    return(
        <div>
            <ButtonRound aria-label="delete">
                <DeleteIcon/>
            </ButtonRound>
            <ButtonRound aria-label="edit">
                <EditIcon/>
            </ButtonRound>
        </div>
    ) 
}


export default CowalkingCard