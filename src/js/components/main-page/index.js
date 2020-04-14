import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import TopContent from './top-content';
import TapContent from './tap-content';
import BottomContent from './bottom-content';
import NavBottom from '../nav/nav-bottom.js';

import '../../../css/style.css'

class Home extends React.Component {
    render() {
        return (
            <div>
                <NavTopbar />
                <section className="blackground-white mb-2n">
                    <div className="row">
                        <TopContent />
                    </div>
                    <div className="row mb-3n">
                        <TapContent />
                    </div>
                </section>
                <section>
                    <div className="row">
                        <BottomContent />
                    </div>
                    <NavBottom />
                </section>
            </div>
        )
    };
}

export default Home;