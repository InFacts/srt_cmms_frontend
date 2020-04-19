import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import TopContent from './top-content';
import TapContent from './tap-content';
import BottomContent from './bottom-content';
import NavBottom from '../nav/nav-bottom.js';

import '../../../css/style.css'

class Maintenance extends React.Component {
    render() {
        return (
            <div>
                <NavTopbar />
                <section className="blackground-white mb-2n">
                    <div className="row">
                        <TopContent />
                    </div>
                    <div className="row">
                        <TapContent />
                    </div>
                </section>
                <section className="blackground-gray">
                    <div className="row">
                        <BottomContent />
                    </div>
                    <NavBottom />
                </section>
            </div>
        )
    };
}

export default Maintenance;
