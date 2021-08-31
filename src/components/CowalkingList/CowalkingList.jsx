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
    

    useEffect(() => {
        return database.cowalks
            .onSnapshot((querySnapshot) => {
            const tempResults = [];
            querySnapshot.forEach((doc) => {
                /* let tempResult = database.formatDoc(doc) */
                /* console.log(tempResult) */
                tempResults.push(database.formatDoc(doc))
            })
            setPageLoading(false)
            setCowalks(tempResults)
            

        });
    }, [])


    
    
   /*  useEffect(() => {
        database.cowalks.where('owner','==',currentUser.uid)
            .orderBy('startTime')
            .get()
            .then((querySnapshot) => {

                    const tempResults = [];
                    querySnapshot.forEach((doc) => {
                        tempResults.push(
                            database.formatDoc(doc)
                        )
                    })
                setCowalks(tempResults);
                setPageLoading(false)

            })
        
    }, []); */

    return (
        <div className="container">

            <ul className='cowalkingList'>

                { pageLoading ? <p>Loading</p> : (cowalks.length > 0 ?

                    cowalks.map((cowalk,index)=><CowalkingCard key={cowalk.id} cowalk={cowalk} index={index} />) : <p>Aucun résultat</p>) }


            </ul>
        </div>
    )
}

export default CowalkingList;