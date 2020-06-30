import React, { useState, useEffect } from 'react';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const SimpleCard2ValuesComponent = ({ name1, value1, name2, value2 }) => {

    return (
        <div className="white-background simple-card">
            <div className="row_bootstrap no-gutters">
                <div className="col-6">
                    <h5 className="simple-card-name" 
                        style={{height:25, 
                            // border:"1px solid red",
                        }}
                    >
                        {name1}
                    </h5>
                    <div className="white-background simple-card-inner"
                        style={{height:50, 
                            color: "#FC4237",
                            // border:"1px solid red"
                        }}
                    >
                        {numberWithCommas(value1)}
                    </div>
                </div>
                <div className="col-6">
                    <h5 className="simple-card-name"
                        style={{height:25, 
                            // border:"1px solid red",
                        }}
                    >{name2}</h5>
                    <div className="white-background simple-card-inner"
                        style={{height:50, 
                            color: "#34657F",
                            // border:"1px solid red"
                        }}
                    >
                        {numberWithCommas(value2)}
                    </div>
                </div>
            </div>


        </div>);
}

export default SimpleCard2ValuesComponent;