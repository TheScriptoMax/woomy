/// ----- Import Components ----- ///
import CowalkerItem from "../CowalkerItem/CowalkerItem";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './cowalkerList.css'
///////// liste des copiétonneuses //////////

function CowalkerList () {
    return (
        <div className='CowalkerListcontainer'>
           <AddCircleIcon/>
            <ul className="cowalkerList">
                <CowalkerItem/>
                <CowalkerItem/>
            </ul>
            
        </div>
    )
};



export default CowalkerList;