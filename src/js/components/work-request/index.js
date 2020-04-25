import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import NavBottom from '../nav/nav-bottom.js';

class WO extends React.Component {
    render() {
        const type = 'WO';
        return (
            <div>
                <NavTopbar />
                <TopContent />
                <BottomContent />
                <NavBottom type={type} />
            </div>
        )
    };
}

export default WO;
