import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import TopContent from './top-content';

class MainModule extends React.Component {
    render() {
        return (
            <div>
                <NavTopbar />
                <TopContent />
            </div>
        )
    };
}

export default MainModule;
