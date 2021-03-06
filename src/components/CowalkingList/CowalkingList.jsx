import CircularProgress from '@material-ui/core/CircularProgress';

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
        let tempUser = {}
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {

                tempUser=database.formatDoc(doc)
            })
        return database.cowalks
            .onSnapshot((querySnapshot) => {
            const tempResults = [];
            querySnapshot.forEach((doc) => {
                tempResults.push(database.formatDoc(doc))
            })
            
            const tempResultsActual = tempResults.filter(tempResult=>{
                
                return tempResult.startTime.seconds*1000 >= new Date().getTime()-3600000 ? true : false;
                  
            })
            const tempResultsProperty = tempResultsActual.filter(tempResultActual=>{
                
                return (tempResultActual.owner === currentUser.uid) ||(tempUser.approvalCowalk && (tempUser.approvalCowalk.includes(tempResultActual.id))) ? true : false ;

            })
            
            tempResultsProperty.sort(function compare (a,b){
                    if(a.startTime.seconds<b.startTime.seconds){
                        return -1
                    }
                    if(a.startTime.seconds>b.startTime.seconds){
                        return 1
                    }
                    return 0;
                })
            setPageLoading(false)
            setCowalks(tempResultsProperty)
            

        });

    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="container">

            <ul className='cowalkingList'>

                { pageLoading ? <div className="loading"><CircularProgress color="secondary" size="60px" /></div> : (cowalks.length > 0 ?

                    cowalks.map((cowalk,index)=><CowalkingCard key={cowalk.id} cowalk={cowalk} index={index} />) : <p>Aucun r??sultat</p>) }


            </ul>
        </div>
    )
}

export default CowalkingList;