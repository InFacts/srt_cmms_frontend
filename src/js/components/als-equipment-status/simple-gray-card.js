import React, { useState, useEffect } from 'react';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const SimpleGrayCardComponent = ({name, value}) => {

    return (
    <div className="gray-background simple-card">
        <h5 className="simple-card-name">{name}</h5>
        <div className="white-background simple-card-inner">
            {numberWithCommas(value)}
        </div>
    </div>);
}

export default SimpleGrayCardComponent;