import { database } from '../../firebase';

// REACT IMPORT
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

// CARD COMPONENT IMPORT
import DistrictCard from '../DistrictCard/DistrictCard';

// MATERIAL UI IMPORT
import { Button } from '@material-ui/core';
import BackToAdminDashboardButton from "../BackToAdminDashboardButton/BackToAdminDashboardButton";

//LIST ALL LOCATION
export default function DistrictList () {

    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        database.districts.orderBy('name').get().then(districts => {
            const tempDistricts = []
            districts.forEach(district => {
                tempDistricts.push(database.formatDoc(district))
            })
            setDistricts(tempDistricts)
            
        })
    }, [])

    return (
      <div className="container container-admin">

          <BackToAdminDashboardButton />
         <h1>Quartiers existants</h1>
         <Link to={'/admin-district'}><Button variant='contained'>Retour</Button></Link>

            <ul className='district-list'>
                {
                    districts.map((district) => <DistrictCard district={district} />)
                }
            </ul>
     </div>
    )
}