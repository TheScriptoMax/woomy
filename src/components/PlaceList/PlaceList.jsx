// IMPORT FIREBASE
import { database } from '../../firebase';

// REACT IMPORT
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

// CARD COMPONENT IMPORT
import PlaceCard from '../PlaceCard/PlaceCard';

// MATERIAL UI IMPORT
import { Button } from '@material-ui/core';

// IMPORT COMPONENT
import BackToAdminDashboardButton from "../BackToAdminDashboardButton/BackToAdminDashboardButton";

//LIST ALL LOCATION
export default function PlaceList () {

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        database.locations.orderBy('name').get().then(locations => {
            const tempLocations = []
            locations.forEach(location => {
                tempLocations.push(database.formatDoc(location))
            })
            setLocations(tempLocations)
            
        })
    }, [])

    return (
      <div class="container container-admin">

          <BackToAdminDashboardButton />
         <h1>Lieux existants</h1>

         <Link to={'/admin-place'}><Button variant='contained'>Retour</Button></Link>
         
            <ul className='place-list'>
                {
                    locations.map((location) => <PlaceCard location={location} />)
                }
            </ul>


     </div>
    )
}