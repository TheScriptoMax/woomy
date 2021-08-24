
/// ----- Import Components ---- ///
import CowalkingCard from "../CowalkingCard/CowalkingCard";

/// ----- CSS ----- ///
import './cowalkingList.css'

/// ----- React Modules ----- ///
import { useState,useEffect } from 'react';

//FIREBASE
import {database} from '../../firebase'


function CowalkingList () {

    const [cowalks,setCowalks] = useState([])

    useEffect(() => {
        database.cowalks
            .get()
            .then((querySnapshot) => {
                const tempResults = [];
                querySnapshot.forEach((doc) => {
                    tempResults.push(
                        database.formatDoc(doc)
                    )
                })
                setCowalks(tempResults);
                console.log(tempResults);
            })
    }, []);

    return (


        <div className="container">
            {cowalks.length ?
            <ul className='cowalkingList'>
                {
                    cowalks.map((cowalk,index)=><CowalkingCard cowalk={cowalk} index={index} />)
                }
            </ul> : <p>Allez vous faire cuire un oeuf</p> }
        </div>


    )
}

export default CowalkingList;