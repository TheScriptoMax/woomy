import './admindistrict.css'
import {Button, TextField} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { database } from '../../firebase';

// REACT IMPORT
<<<<<<< HEAD
import {useRef, useState, useEffect} from "react";
import { Link } from 'react-router-dom';
=======
import {useRef, useState} from "react";
import { useEffect } from 'react';
>>>>>>> chloe

//ADD A LOCATION
export default function AdminDistrict () {

    //TODO: composant pour la liste des quartiers

    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [isShow, setIsShow] = useState(false);
    const [districtAdded, setDistrictAdded] = useState(false);
    const [towns, setTowns] = useState([]);


    const formRef = useRef();
    const districtNameRef = useRef();
    const townRef = useRef();


    useEffect(() => {
        database.towns.get().then(towns => {
            const tempTowns = []
            towns.forEach(town => {
                tempTowns.push(database.formatDoc(town))
            })
            tempTowns.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
            setTowns(tempTowns)
            
        })
    }, [])


    const addDistrict = (e) => {
        e.preventDefault();
        
        if(districtNameRef.current.value.length < 1 || townRef.current.value.length < 1){
            setIsShow(!isShow);
            if(districtAdded){
                setDistrictAdded(!districtAdded);
            }
        } else {

            database.districts.add({
                name: districtNameRef.current.value,
                town: townRef.current.value,
                createdAt: database.getCurrentTimestamp
            })
            .then((docRef) => {
                formRef.current.reset();
                if (isShow) {
                    setIsShow(!isShow);
                }
                if (!districtAdded){
                    setDistrictAdded(!districtAdded);
                }
            })
            .catch((error) => {
                setError('Quelque chose s\'est mal passé :(');
            });
<<<<<<< HEAD

    return (
      <div class="container container-admin">
         <h1>Quartiers</h1>

         {/* Ajouter un lien et un composant vers un liste des quartiers */}
=======
        }}
        
        //TODO: changer la saisie des communes à la main par un select (collection séparée, requête de cette collection dans le textfield)
        //TODO: recherche des quartiers

    return (
      <div class="container container-admin">
         <h2>Quartiers</h2>
>>>>>>> chloe
         <TextField label="Rechercher" variant="outlined"/>
         <h2 className="create-district">Ajout d'un nouveau quartier</h2>
         <form onSubmit={addDistrict} ref={formRef} className="district-form">
            <TextField inputRef={districtNameRef} label="Quartier" variant="outlined"/>
<<<<<<< HEAD

=======
>>>>>>> chloe
            <TextField select inputRef={townRef} label="Commune" variant="outlined">
            {towns.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
            </TextField>
<<<<<<< HEAD
=======

>>>>>>> chloe

            <Button disabled={loading} type="submit" variant='contained' color="secondary"  className="admin-form-btn">Ajouter</Button>


            {error && <Alert severity="error">{error}</Alert> }
            {districtAdded && <Alert severity="success">Le quartier a été ajouté</Alert>}
            {isShow && <Alert severity="warning">Tous les champs doivent être remplis !</Alert>}
         </form>
<<<<<<< HEAD

         <Link className="MuiButtonBase-root MuiButton-root MuiButton-contained admin-form-btn" to={'/adminplace'}>Ajouter un lieu</Link>
        
=======
           
>>>>>>> chloe
     </div>
    )
}}
}