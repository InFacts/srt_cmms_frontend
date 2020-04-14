import React from 'react';

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'
import '../../../css/style.css'

class NavBottom extends React.Component {
    render() {
        return (
            <div>
                {/* <header id="navigation" className="mt-2"> */}
                <header id="navigation" className="fixed-bottom">
                    <div className="p-navigation__row">
                        <nav className="p-navigation__nav">
                            <ul className="p-navigation__items" role="menu">
                                <li className="p-navigation__item " role="menuitem" id="link-1">
                                    <button className="p-button--positive border-none" style={{ backgroundColor: "#2F6FCA", border: "none"}}>Positive button</button>
                                </li>
                            </ul>

                            <ul className="p-navigation__items" role="menu">
                                <li className="p-navigation__item mr-3" role="menuitem" id="link-1">
                                    <button className="p-button--positive" style={{ backgroundColor: "#2F6FCA", border: "none" }}>Positive button</button>
                                </li>
                                <li className="p-navigation__item " role="menuitem" id="link-1">
                                    <button className="p-button--positive" style={{  border: "none" }}>Positive button</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
        )
    };
}

export default NavBottom;