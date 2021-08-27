import './admindistrict.css'
import {Button, TextField} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { database } from '../../firebase';

// REACT IMPORT
import {useRef, useState, useEffect} from "react";

//ADD A LOCATION
export default function AdminDistrict () {

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
            console.log(tempTowns);
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

            database.district.add({
                name: districtNameRef.current.value,
                town: townRef.current.value,
                createdAt: database.getCurrentTimestamp
            })
            .then((docRef) => {
                formRef.current.reset();
                if (isShow) {
                    setIsShow(!isShow);
                }
                setDistrictAdded(!districtAdded);
            })
            .catch((error) => {
                setError('Quelque chose s\'est mal passé :(');
            });
        }
        
        //TODO: changer la saisie des communes à la main par un select (collection séparée, requête de cette collection dans le textfield)
    
    }

    return (
      <div class="container container-admin">
         <h1>Quartiers</h1>
         <TextField label="Rechercher" variant="outlined"/>
         <p className="create-district">Ajout d'un nouveau quartier</p>
         <form onSubmit={addDistrict} ref={formRef} className="district-form">
            <TextField inputRef={districtNameRef} label="Quartier" variant="outlined"/>

            <TextField select inputRef={townRef} label="Commune" variant="outlined">
            {towns.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
            </TextField>

            <Button disabled={loading} type="submit" variant='contained' className="admin-form-button">Ajouter</Button>

            {error && <Alert severity="error">{error}</Alert> }
            {districtAdded && <Alert severity="success">Le quartier a été ajouté</Alert>}
            {isShow && <Alert severity="warning">Tous les champs doivent être remplis !</Alert>}
         </form>
        
     </div>
    )
}