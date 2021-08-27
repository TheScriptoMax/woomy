import { database } from '../../firebase';

// REACT IMPORT
import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

// CARD COMPONENT IMPORT
import DistrictCard from '../DistrictCard/DistrictCard';

// MATERIAL UI IMPORT
import { Button } from '@material-ui/core';

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
      <div class="container container-admin">
         <h1>Quartiers existants</h1>
         <Link to={'/admindistrict'}><Button variant='contained'>Retour</Button></Link>

            <ul className='district-list'>
                {
                    districts.map((district) => <DistrictCard district={district} />)
                }
            </ul>
     </div>
    )
}