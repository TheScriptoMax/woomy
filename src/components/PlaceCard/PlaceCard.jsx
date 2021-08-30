import './placecard.css';
import { useState } from 'react';

import { database } from '../../firebase';

import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


function PlaceCard ({location}) {

    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [locationDeleted, setLocationDeleted] = useState(false);

    const showConfirmAction = () => {
        setShowConfirm(!showConfirm);
    }

    const deletePlace = () => {
        database.locations.doc(location.id).delete()
            .then(() => {
                setButtonIsDisabled(true);
                setLocationDeleted(true);
                setShowConfirm(false);
                console.log(location.name + " supprimé");
            })
            .catch((error) => {
                console.error("Une erreur est survenue : " + error)
            })
    }

    return (
        <div className="place-card">
            <div className="place-card-container">
                <div className="place-card-text">
                    <p className="location-name">{location.name}</p>
                    <p className="location-district">{location.district}</p>
                    <p className="location-adress">{location.adress}</p>
                </div>
                <div className="place-card-btn">
                    <Button disabled={showConfirm} color="secondary" variant="contained" onClick={showConfirmAction}>Supprimer</Button>
                </div>
            </div>
            {showConfirm && 
                <div>
                    <Alert severity="warning">Voulez-vous vraiment supprimer ce lieu ? Cette action est irréversible !</Alert>
                    <div className="confirm-btns">
                        <span>
                            <Button disabled={buttonIsDisabled} color="secondary" variant="contained" onClick={deletePlace}>Supprimer</Button>
                        </span>
                        <span>
                            <Button disabled={buttonIsDisabled} variant="contained" onClick={showConfirmAction}>Annuler</Button>
                        </span>
                    </div>
                </div>
                }
            {locationDeleted && <div>
                <Alert severity="success">Le lieu a été supprimé, il ne s'affichera plus au rechargement de la page</Alert>
            </div>}
        </div>
    ) 

}

export default PlaceCard;