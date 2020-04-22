import React from 'react';

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'
import '../../../css/style.css'

class NavBottom extends React.Component {
    render() {
        return (
            <div>
                <header id="navigation" className="fixed-bottom">
                    <div className="p-navigation__row">
                        <nav className="p-navigation__nav">
                            <ul className="p-navigation__items" role="menu">
                                <li className="p-navigation__item " role="menuitem" id="link-1">
                                    <button className="p-button--base" style={{ color: "#2F6FCA"}}>ดาวโหลด ส.16/46</button>
                                </li>
                            </ul>

                            <ul className="p-navigation__items" role="menu">
                                <li className="p-navigation__item mr-3" role="menuitem" id="link-1">
                                    <button className="p-button--positive" style={{ backgroundColor: "#2F6FCA", border: "none" }}>ยืนยัน</button>
                                </li>
                                <li className="p-navigation__item " role="menuitem" id="link-1">
                                    <button className="p-button--base" style={{ color: "#2F6FCA"}}>ยกเลิก</button>
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