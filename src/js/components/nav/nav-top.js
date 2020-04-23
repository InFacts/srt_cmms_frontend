import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'

class NavTop extends React.Component {
    render() {
        return (
            <div>
                <div id="header">
                    <div className="container_12 clearfix">
                        <ul className="grid_12 nav-ul">
                            <li className="nav-li"><Link to="/main">
                                <img src={logo} alt="logo" width="160px" />
                            </Link></li>
                            <li className="nav-li" style={{ float: "right" }}><Link className="mt-12" to="/main"><i className="fas fa-user-circle" style={{ fontSize: "20px", color: "white" }}></i></Link></li>
                            <li className="nav-li" style={{ float: "right" }}><Link className="mt-12" to="/main"><i className="fas fa-bell" style={{ fontSize: "20px", color: "white" }}></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    };
}


export default NavTop;