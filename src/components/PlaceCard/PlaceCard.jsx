import './placecard.css';
import React from 'react';

function PlaceCard ({location}) {
    return (
        <div className="place-card">
            <p className="location-name">{location.name}</p>
            <p className="location-district">{location.district}</p>
            <p className="location-adress">{location.adress}</p>
        </div>
    )

}

export default PlaceCard;