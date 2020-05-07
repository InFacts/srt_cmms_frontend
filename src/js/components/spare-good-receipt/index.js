import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import ToolBar from '../nav/nav-toolbar.js';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import NavBottom from '../nav/nav-bottom.js';

class SpareGoodReceipt extends React.Component {
    
    render() {
        const type = 'default';
        return (
            <div>
                <NavTopbar />
                <ToolBar />
                <TopContent />
                <BottomContent />
                <NavBottom type={type}/>
            </div>
        )
    };
}

export default SpareGoodReceipt;
