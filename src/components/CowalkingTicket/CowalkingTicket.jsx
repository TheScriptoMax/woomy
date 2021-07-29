import CowalkingTicketHeader from "../CowalkingTicketHeader/CowalkingTicketHeader";
import CowalkerList from "../CowalkerList/CowalkerList";

function CowalkingTicket () {

    return(
        <div className="container">
            <CowalkingTicketHeader/>
            <CowalkerList/>
        </div>
    )
};


export default CowalkingTicket;