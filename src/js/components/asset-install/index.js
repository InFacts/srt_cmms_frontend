import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import NavBottom from '../nav/nav-bottom.js';

class AssetMaster extends React.Component {
    render() {
        return (
            <div>
                <NavTopbar />
                <TopContent />
                <BottomContent />
                <NavBottom />
            </div>
        )
    };
}

export default AssetMaster;
