import React from 'react';
import { Link } from 'react-router-dom';

import AddDocument from '../../../images/toolbar/add-document.svg'
import CopyDocument from '../../../images/toolbar/copy-document.svg'
import EditDocument from '../../../images/toolbar/edit.svg'
import SaveDocument from '../../../images/toolbar/save.svg'
import RetryDocument from '../../../images/toolbar/retry.svg'
import BackDocument from '../../../images/toolbar/back.svg'
import ForwardDocument from '../../../images/toolbar/forward.svg'
import PdfDocument from '../../../images/toolbar/pdf.svg'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'

class NavTop extends React.Component {
    render() {
        return (
            <div>
                <div id="toolbar">
                    <div className="container_12 clearfix" style={{ marginTop: "3px"}}>
                        <ul className="grid_12 nav-ul ">
                            <li className="nav-li" ><Link to="/main"><i className="fas fa-home icon-toolbar-first" ></i></Link></li>
                            <li className="nav-li" ><Link to="/main"><i className="fas fa-search icon-toolbar" ></i></Link></li>
                            <li className="nav-li" ><Link to="/main" className="toolbar"><img alt='AddDocument' src={EditDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="/main" className="toolbar"><img alt='AddDocument' src={AddDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="/main" className="toolbar"><img alt='AddDocument' src={CopyDocument} className="img-toolbar" /></Link></li>

                            <li className="nav-li" ><Link to="/main" className="toolbar"><img alt='AddDocument' src={SaveDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="/main" className="toolbar"><img alt='AddDocument' src={RetryDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="/main" className="toolbar"><img alt='AddDocument' src={BackDocument} className="img-toolbar" /></Link></li>

                            <li className="nav-li" ><Link to="/main" className="toolbar"><img alt='AddDocument' src={ForwardDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="/main" className="toolbar"><img alt='AddDocument' src={PdfDocument} className="img-toolbar" /></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    };
}


export default NavTop;