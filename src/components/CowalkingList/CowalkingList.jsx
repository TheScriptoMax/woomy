/// ----- Import Components ---- ///
import CowalkingCard from "../CowalkingCard/CowalkingCard";

/// ----- CSS ----- ///
import './cowalkingList.css'

/// ----- React Modules ----- ///
import { useState,useEffect } from 'react';

//FIREBASE
import {database} from '../../firebase'

import {useAuth} from "../../contexts/AuthContext";



function CowalkingList () {


    const [cowalks, setCowalks] = useState([])
    const [pageLoading, setPageLoading] = useState(true);

    const {currentUser} = useAuth();
    let cowalksbleu = database.cowalks
    console.log(cowalksbleu)
    useEffect(() => {
        return database.cowalks
            .onSnapshot((querySnapshot) => {
            const tempResults = [];
            querySnapshot.forEach((doc) => {
                tempResults.push(database.formatDoc(doc))
            })
            
            
            
            
            
            
            const tempResultsActual = tempResults.filter(tempResult=>{
                return tempResult.startTime.seconds*1000 >= new Date().getTime()-3600000 ? true : false ;
                  
            })
            tempResultsActual.sort(function compare (a,b){
                    if(a.startTime.seconds<b.startTime.seconds){
                        return -1
                    }
                    if(a.startTime.seconds>b.startTime.seconds){
                        return 1
                    }
                    return 0;
                })
            setPageLoading(false)
            setCowalks(tempResultsActual)
            

        });
    }, [])


    return (
        <div className="container">

            <ul className='cowalkingList'>

                { pageLoading ? <p>Loading</p> : (cowalks.length>0 ?

                    cowalks.map((cowalk,index)=><CowalkingCard key={cowalk.id} cowalk={cowalk} index={index} />) : <p>Aucun résultat</p>) }


            </ul>
        </div>
    )
}

export default CowalkingList;