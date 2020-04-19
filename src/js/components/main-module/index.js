import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import TopContent from './top-content';

import '../../../css/style.css'

class MainModule extends React.Component {
    render() {
        return (
            <div>
                <NavTopbar />
                <section className="blackground-white mb-2n">
                    <div className="row">
                        <TopContent />
                    </div>
                </section>

            </div>
        )
    };
}

export default MainModule;
