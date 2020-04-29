import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import ToolBar from '../nav/nav-toolbar.js';
import TopContent from './top-content';

class MainModule extends React.Component {
    render() {
        return (
            <div>
                <NavTopbar />
                <ToolBar />
                <TopContent />
            </div>
        )
    };
}

export default MainModule;
