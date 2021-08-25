/// ----- Import Components ----- ///
import CowalkingTicketHeader from "../CowalkingTicketHeader/CowalkingTicketHeader";
import CowalkerList from "../CowalkerList/CowalkerList";

///////////  TICKET D'UN COPIETONNAGE  //////////

function CowalkingTicket () {

    return(
        <div className="container">
            <CowalkingTicketHeader/>
            <CowalkerList/>
        </div>
    )
};


export default CowalkingTicket;