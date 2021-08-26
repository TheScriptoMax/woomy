import './adminplace.css'
import {Button, TextField} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { database } from '../../firebase';

// REACT IMPORT
import {useRef, useState} from "react";
import { Link } from 'react-router-dom';

//ADD A LOCATION
export default function AdminPlace () {

    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [isShow, setIsShow] = useState(false);
    const [locationAdded, setLocationAdded] = useState(false);

    const formRef = useRef();
    const locationNameRef = useRef();
    const districtRef = useRef();
    const adressRef = useRef();

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
                createdAt: database.getCurrentTimestamp
            })
            .then((docRef) => {
                formRef.current.reset();
                if (isShow) {
                    setIsShow(!isShow);
                }
                setLocationAdded(!locationAdded);
            })
            .catch((error) => {
                setError('Quelque chose s\'est mal passé :(');
            });
        }
        
        //TODO: recherche des lieux
        //TODO: lien google maps/OSM (lieu en paramètres url query string)
        //TODO: changer la saisie des quartiers à la main par un select (collection séparée, requête de cette collection dans le textfield)
    
    }

    return (
      <div class="container container-admin">
         <h1>Lieux</h1>
         <TextField label="Rechercher" variant="outlined"/>
         <p className="placecreate">Création d'un nouveau lieu</p>
         <form onSubmit={addLocation} ref={formRef} className="placeform">
            <TextField inputRef={locationNameRef} label="Lieux" variant="outlined"/>
            <TextField inputRef={districtRef} label="Quartier" variant="outlined"/>
            <TextField inputRef={adressRef} label="adresse approx" variant="outlined"/>
            <Button disabled={loading} type="submit" variant='contained' className="admin-form-button">Ajouter</Button>
            {error && <Alert severity="error">{error}</Alert> }
            {locationAdded && <Alert severity="success">Le lieu a été ajouté</Alert>}
            {isShow && <Alert severity="warning">Tous les champs doivent être remplis !</Alert>}
         </form>
        

        <Link className="MuiButtonBase-root MuiButton-root MuiButton-contained admin-form-button" to={'/admindistrict'}>Ajouter un quartier</Link>
     </div>
    )
}