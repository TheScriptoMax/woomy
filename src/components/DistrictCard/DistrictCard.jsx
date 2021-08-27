import './districtcard.css';
import React from 'react';

function DistrictCard ({district}) {
    return (
        <div className="district-card">
            <p className="district-name">{district.name}</p>
            <p className="district-town">{district.town}</p>
        </div>
    )

}

export default DistrictCard;