import React from 'react';
import { Link } from 'react-router-dom';

import '../../../css/style.css'

class TapContent extends React.Component {
    render() {
        return (
            <div>
                <nav className="p-tabs">
                    <ul className="p-tabs__list" role="tablist" style={{ margin: "0px"}}>
                        <li className="p-tabs__item" role="presentation">
                            <Link to="/" className="p-tabs__link" tabindex="0" role="tab" aria-controls="section1" aria-selected="true">Machine summary</Link>
                        </li>
                        <li className="p-tabs__item" role="presentation">
                            <Link to="/" className="p-tabs__link" tabindex="-1" role="tab" aria-controls="section2">Interfaces</Link>
                        </li>
                        <li className="p-tabs__item" role="presentation">
                            <Link to="/" className="p-tabs__link" tabindex="-1" role="tab" aria-controls="section3">Storage</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    };
}

export default TapContent;