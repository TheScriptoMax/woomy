
/// ----- Import Components ---- ///
import CowalkingCard from "../CowalkingCard/CowalkingCard";

/// ----- CSS ----- ///
import './cowalkingList.css'

/// ----- React Modules ----- ///
import { useState,useEffect } from 'react';

//FIREBASE
import {database} from '../../firebase'


function CowalkingList () {

    const [initialCowalks, setInitialCowalks] = useState([])
    const [updatedCowalks,setUpdatedCowalks] = useState([])
    const [lastInitialDate, setLastInitialDate] = useState(new Date())
    const [completeCowalksList, setCompleteCowalksList] = useState([])


    useEffect(() => {
        return database.cowalks.where("createdAt",">=",lastInitialDate).onSnapshot((querySnapshot) => {
            const tempResults = [];
            querySnapshot.forEach((doc) => {
                tempResults.push(database.formatDoc(doc))
            })
            setUpdatedCowalks(tempResults)
        });
    }, [])

    useEffect(() => {
        database.cowalks
            .orderBy('startTime')
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.length > 0) {
                    const tempResults = [];
                    querySnapshot.forEach((doc) => {
                        tempResults.push(
                            database.formatDoc(doc)
                        )
                    })
                    const lastCreatedAt = new Date(Math.max(...tempResults.map(e => e.createdAt.seconds)) * 1000)
                    setLastInitialDate(lastCreatedAt);
                    console.log(lastCreatedAt)
                    setInitialCowalks(tempResults);
                    console.log(tempResults);
                }
            })
    }, []);

    return (
        <div className="container">

            {initialCowalks.length ?

            <ul className='cowalkingList'>
                {
                    initialCowalks.map((cowalk,index)=><CowalkingCard key={cowalk.id} cowalk={cowalk} index={index} />)
                }

                { updatedCowalks.length > 0 &&
                    updatedCowalks.map((cowalk,index)=><CowalkingCard key={cowalk.id} cowalk={cowalk} index={index} />)
                }
            </ul> : <p>Loading</p> }
        </div>
    )
}

export default CowalkingList;