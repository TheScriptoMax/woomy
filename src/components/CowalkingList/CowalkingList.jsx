
/// ----- Import Components ---- ///
import CowalkingCard from "../CowalkingCard/CowalkingCard";

/// ----- CSS ----- ///
import './cowalkingList.css'

/// ----- React Modules ----- ///
import { useState,useEffect } from 'react';

/// ----- Axios Modules ----- ///
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/'
})

function CowalkingList () {
    
    const [cowalks,setCowalks] = useState([])

    const getCowalks = async () => {
        const res = await axiosInstance.get('/cowalk')
        setCowalks(res.data)
        console.log(res.data)
        console.log(cowalks)
    }

    useEffect(()=>{
        getCowalks()
    },[])

    return (


        <div className="container">
            <ul className='cowalkingList'>
                {
                    cowalks.map((cowalk,index)=><CowalkingCard cowalk={cowalk} index={index} />)
                }
            </ul>
        </div>
        

    )
}

export default CowalkingList;