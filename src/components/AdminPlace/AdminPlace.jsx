import './adminplace.css'
import {Button, TextField} from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { database } from '../../firebase';

// REACT IMPORT
import {useRef, useState, useEffect} from "react";
import { Link } from 'react-router-dom';

//ADD A LOCATION
export default function AdminPlace () {


    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [isShow, setIsShow] = useState(false);
    const [locationAdded, setLocationAdded] = useState(false);
    const [districts, setDistricts] = useState([]);

    const formRef = useRef();
    const locationNameRef = useRef();
    const districtRef = useRef();
    const adressRef = useRef();

    useEffect(() => {
        database.districts.orderBy('name').get().then(districts => {
            const tempDistricts = []
            districts.forEach(district => {
                tempDistricts.push(database.formatDoc(district))
            })
            setDistricts(tempDistricts)
        })
    }, [])

    const addLocation = (e) => {
        e.preventDefault();
        
        if(locationNameRef.current.value.length < 1 || districtRef.current.value.length < 1 || adressRef.current.value.length < 1){
            setIsShow(!isShow);
            if(locationAdded){
                setLocationAdded(!locationAdded);
            }
        } else {

            database.locations.add({
                name: locationNameRef.current.value,
                district: districtRef.current.value,
                adress: adressRef.current.value,
                createdAt: database.getCurrentTimestamp,
                mapUrl: ("https://www.google.com/maps/place/"+ (adressRef.current.value).split(' ').join('+') + "+tours")
            })
            .then((docRef) => {
                formRef.current.reset();
                if (isShow) {
                    setIsShow(!isShow);
                }

                if(!locationAdded){
                    setLocationAdded(!locationAdded);
                }
            })
            .catch((error) => {
                setError('Quelque chose s\'est mal passé :(');
            });
        }

    }


    return (
      <div class="container container-admin">
         <h1>Lieux</h1>

         <Link to={'/place-list'}><Button variant='contained'>Voir tous les lieux</Button></Link>

         <h2 className="placecreate">Création d'un nouveau lieu</h2>

         <form onSubmit={addLocation} ref={formRef} className="placeform">
            <TextField inputRef={locationNameRef} label="Lieux" variant="outlined"/>
            <TextField select inputRef={districtRef} label="Quartier" variant="outlined">
                {districts.map((option) => (
                <option key={option.id} value={option.name}>
                {option.name}
                </option>
            ))}
            </TextField>
            <TextField inputRef={adressRef} label="Adresse" variant="outlined"/>

            <Button disabled={loading} type="submit" color="secondary" variant='contained' className="admin-form-btn">Ajouter</Button>

            {error && <Alert severity="error">{error}</Alert> }
            {locationAdded && <Alert severity="success">Le lieu a été ajouté</Alert>}
            {isShow && <Alert severity="warning">Tous les champs doivent être remplis !</Alert>}

         </form>
        

        <Link to={'/admin-district'}><Button variant='contained'>Ajouter un quartier</Button></Link>
     </div>
    )
}