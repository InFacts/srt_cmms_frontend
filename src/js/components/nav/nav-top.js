import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'

class NavTop extends React.Component {
    render() {
        return (
            <div>
                <header id="navigation" className="p-navigation border">
                    <div className="p-navigation__row">
                        <div className="p-navigation__banner">
                            <div className="p-navigation__logo">
                                <Link className="p-navigation__item" to="/main">
                                    <img className="p-navigation__image" src={logo} alt="logo" height="70px" width="170px" style={{ maxHeight:"5rem" }} />
                                </Link>
                            </div>
                            <a href="#navigation" className="p-navigation__toggle--open" title="menu">Menu</a>
                            <a href="#navigation-closed" className="p-navigation__toggle--close" title="close menu">Close menu</a>
                        </div>
                        <nav className="p-navigation__nav">

                            {/* not use */}
                            <ul className="p-navigation__items" role="menu">
                                {/* <li className="p-navigation__item p-subnav" role="menuitem" id="link-1">
                                    <Link to="/link-1-menu" aria-controls="link-1-menu" className="p-subnav__toggle p-navigation__link">LXC</Link>
                                    <ul className="p-subnav__items" id="link-1-menu" aria-hidden="true">
                                        <li>
                                            <Link to="/" className="p-subnav__item">Introduction</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="p-subnav__item">News</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="p-subnav__item">Getting started</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="p-navigation__item p-subnav" role="menuitem" id="link-2">
                                    <Link to="/link-2-menu" aria-controls="link-2-menu" className="p-subnav__toggle p-navigation__link">LXD</Link>
                                    <ul className="p-subnav__items" id="link-2-menu" aria-hidden="true">
                                        <li>
                                            <Link to="/" className="p-subnav__item">Introduction</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="p-subnav__item">News</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="p-subnav__item">Getting started - Command line</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="p-subnav__item">Getting started - OpenStack</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="p-subnav__item">Getting started - OpenNebula</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="p-navigation__item p-subnav is-active" role="menuitem" id="link-3">
                                    <Link to="/link-3-menu" aria-controls="link-3-menu" className="p-subnav__toggle p-navigation__link">LXCFS</Link>
                                    <ul className="p-subnav__items" id="link-3-menu" aria-hidden="false">
                                        <li>
                                            <Link to="/" className="p-subnav__item">Introduction</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="p-subnav__item">News</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="p-subnav__item">Getting started</Link>
                                        </li>
                                    </ul>
                                </li> */}
                            </ul>
                            
                            <ul className="p-navigation__items" role="menu">
                                <li className="p-navigation__item p-subnav" role="menuitem" id="link-1">
                                    <div className="p-subnav__toggle p-navigation__link" aria-controls="account-menu"><i className="fas fa-bell" style={{ fontSize: "20px" ,color: "#BDBDBD" }}></i></div>
                                    <ul className="p-subnav__items--right" id="account-menu" aria-hidden="false">
                                        <li>
                                            {/* <Link to="/" className="p-subnav__item">Sign out</Link> */}
                                        </li>
                                    </ul>
                                </li>
                                <li className="p-navigation__item p-subnav" role="menuitem" id="link-1">
                                    <div className="p-subnav__toggle p-navigation__link" aria-controls="account-menu"><i className="fas fa-user-circle" style={{ fontSize: "20px" ,color: "#BDBDBD"}}></i></div>
                                    <ul className="p-subnav__items--right" id="account-menu" aria-hidden="true">
                                        <li>
                                            <Link to="/" className="p-subnav__item">ข้อมุลส่วนตัว</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="p-subnav__item">ออกจากระบบ</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
        )
    };
}


export default NavTop;