// IMPORT CSS
import './districtcard.css';

// IMPORT REACT
import { useState } from 'react';

// IMPORT FIREBASE
import { database } from '../../firebase';

// IMPORT MATERIAL
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function DistrictCard ({district}) {

    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [districtDeleted, setDistrictDeleted] = useState(false);

    const showConfirmAction = () => {
        setShowConfirm(!showConfirm);
    }

    const updateLocationsDistrict = () => {
        database.locations.where("district", "==", district.name).get()
        .then((snapshot)=>{
            const promises = [];
            snapshot.forEach(doc => {
                promises.push(doc.ref.update({
                    district: 'Quartier à définir'
          }));
        });
        return Promise.all(promises)
        })
        .catch((error)=>{
            console.log("Erreur: " + error);
        })
    }

    const deleteDistrict = () => {
        database.districts.doc(district.id).delete()
            .then(() => {
                setButtonIsDisabled(true);
                setDistrictDeleted(true);
                setShowConfirm(false);
                console.log(district.name + " supprimé");
                updateLocationsDistrict();
            })
            .catch((error) => {
                console.error("Une erreur est survenue : " + error)
            })
    }

    return (
        <div className="district-card">
            <div className="district-card-container">
                <div className="district-card-text">
                    <p className="district-name">{district.name}</p>
                    <p className="district-town">{district.town}</p>
                </div>
                <div className="district-card-btn">
                <Button disabled={showConfirm} color="secondary" variant="contained" onClick={showConfirmAction}>Supprimer</Button>
                </div>
            </div>
            {showConfirm && 
                <div>
                    <Alert severity="warning">Voulez-vous vraiment supprimer ce quartier ? Cette action est irréversible !</Alert>
                    <div className="confirm-btns">
                        <span>
                            <Button disabled={buttonIsDisabled} color="secondary" variant="contained" onClick={deleteDistrict}>Supprimer</Button>
                        </span>
                        <span>
                            <Button disabled={buttonIsDisabled} variant="contained" onClick={showConfirmAction}>Annuler</Button>
                        </span>
                    </div>
                </div>
                }

                {districtDeleted && <div>
                <Alert severity="success">Le quartier a été supprimé, il ne s'affichera plus au rechargement de la page</Alert></div>}
            

        </div>
    )

}

export default DistrictCard;