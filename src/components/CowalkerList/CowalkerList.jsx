/// ----- Import Components ----- ///
import CowalkerItem from "../CowalkerItem/CowalkerItem";

///////// liste des copiétonneuses //////////

function CowalkerList () {
    return (
        <div>
            
            <ul className="cowalkerList">
                <CowalkerItem/>
                <CowalkerItem/>
            </ul>
            
        </div>
    )
};



export default CowalkerList;