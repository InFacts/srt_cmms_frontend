import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import Map from './map';

class MainModule extends React.Component {
    render() {
        return (
            <div>
                <NavTopbar />
                <Map />
            </div>
        )
    };
}

export default MainModule;
