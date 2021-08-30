/// ----- Import Components ---- ///
import CowalkingCard from "../CowalkingCard/CowalkingCard";

/// ----- CSS ----- ///
import './cowalkingList.css'

/// ----- React Modules ----- ///
import { useState,useEffect } from 'react';

//FIREBASE
import {database} from '../../firebase'




function CowalkingList () {


    const [cowalks, setCowalks] = useState([])
    const [pageLoading, setPageLoading] = useState(true);

    const [initialCowalks, setInitialCowalks] = useState([])
    const [updatedCowalks,setUpdatedCowalks] = useState([])
    const [lastInitialDate, setLastInitialDate] = useState(new Date())

 /*    const [completeCowalksList, setCompleteCowalksList] = useState([]); */
    const [pageLoading, setPageLoading] = useState(true);

    




    useEffect(() => {
        return database.cowalks.onSnapshot((querySnapshot) => {
            const tempResults = [];
            querySnapshot.forEach((doc) => {
                tempResults.push(database.formatDoc(doc))
            })
            setCowalks(tempResults)
        });
    }, [])

    useEffect(() => {
        database.cowalks
            .orderBy('startTime')
            .get()
            .then((querySnapshot) => {

                const tempResults = [];
                querySnapshot.forEach((doc) => {
                    tempResults.push(
                        database.formatDoc(doc)
                    )
                }
                const lastCreatedAt = new Date(Math.max(...tempResults.map(e => e.createdAt.seconds)) * 1000)
                setLastInitialDate(lastCreatedAt);    
                setInitialCowalks(tempResults);
                setPageLoading(false)

            })
    }, []);

    return (
        <div className="container">

            <ul className='cowalkingList'>


                { pageLoading ? <p>Loading</p> : (initialCowalks.length>0 ?

                    initialCowalks.map((cowalk,index)=><CowalkingCard key={cowalk.id} cowalk={cowalk} index={index} />) : <p>Aucun résultat</p>) }


                { updatedCowalks.length > 0 &&
                    updatedCowalks.map((cowalk,index)=><CowalkingCard cowalk={cowalk} index={index} />)

                }
            </ul>
        </div>
    )
}

export default CowalkingList;