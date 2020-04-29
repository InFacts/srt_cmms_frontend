import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import ToolBar from '../nav/nav-toolbar.js';
import Map from './map';

import '../../../css/style.css'

class MainModule extends React.Component {
    render() {
        return (
            <div>
                <NavTopbar />
                <ToolBar />
                <Map />
            </div>
        )
    };
}

export default MainModule;
