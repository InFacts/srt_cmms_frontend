import React from 'react';

const Label = (props) => {
    return (
        <div className="grid_1 alpha"> 
            <p className="top-text float-right" style={props.textStyle || {whiteSpace: "nowrap"}}>
                {props.children}
            </p>
        </div>
    );
}
export default Label;