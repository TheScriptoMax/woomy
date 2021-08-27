/// ----- Import Components ----- ///
import CowalkingTicketHeader from "../CowalkingTicketHeader/CowalkingTicketHeader";
import CowalkerList from "../CowalkerList/CowalkerList";

// IMPORT MODULES
import {useParams} from "react-router-dom";
import {database} from '../../firebase'
import {useEffect, useState} from "react";

///////////  TICKET D'UN COPIETONNAGE  //////////


function CowalkingTicket () {
    const [currentCowalk, setCurrentCowalk] = useState({});
    const [loading, setLoading] = useState(true)
    const {cowalkId} = useParams();


    useEffect(() => {
            database.cowalks.doc(cowalkId)
                .get()
                .then((doc)=> {
                    if (doc.exists) {
                        setCurrentCowalk(database.formatDoc(doc))
                        setLoading(false);
                    } else {
                        console.log("no such document")
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                })
        }, [cowalkId]
    );


    return(
        <div className="container">
            {!loading && <> <CowalkingTicketHeader cowalk={currentCowalk}/> <CowalkerList cowalk={currentCowalk} /> </>}
        </div>
    )
};


export default CowalkingTicket;