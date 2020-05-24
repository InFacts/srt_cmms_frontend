import React from 'react';
import { Link } from 'react-router-dom';

import HomeDocument from '../../../images/toolbar/home.svg'
import SearchDocument from '../../../images/toolbar/search.svg'
import AddDocument from '../../../images/toolbar/add-document.svg'
import CopyDocument from '../../../images/toolbar/copy-document.svg'
// import EditDocument from '../../../images/toolbar/edit.svg'
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
                            <li className="nav-li" ><Link to="/main" className="toolbar"><img alt='HomeDocument' src={HomeDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="#" className="toolbar" style={{ pointerEvents: "none" }}><img alt='SearchDocument' src={SearchDocument} className="img-toolbar" /></Link></li>
                            {/* <li className="nav-li" ><Link to="#" className="toolbar"><img alt='EditDocument' src={EditDocument} className="img-toolbar" /></Link></li> */}
                            <li className="nav-li" ><Link to="#" className="toolbar" style={{ pointerEvents: "none" }}><img alt='AddDocument' src={AddDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="#" className="toolbar" style={{ pointerEvents: "none" }}><img alt='CopyDocument' src={CopyDocument} className="img-toolbar" /></Link></li>

                            <li className="nav-li" ><Link to="#" className="toolbar" style={{ pointerEvents: "none" }}><img alt='SaveDocument' src={SaveDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="#" className="toolbar" style={{ pointerEvents: "none" }}><img alt='RetryDocument' src={RetryDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="#" className="toolbar" style={{ pointerEvents: "none" }}><img alt='BackDocument' src={BackDocument} className="img-toolbar" /></Link></li>

                            <li className="nav-li" ><Link to="#" className="toolbar" style={{ pointerEvents: "none" }}><img alt='ForwardDocument' src={ForwardDocument} className="img-toolbar" /></Link></li>
                            <li className="nav-li" ><Link to="#" className="toolbar" style={{ pointerEvents: "none" }}><img alt='PdfDocument' src={PdfDocument} className="img-toolbar" /></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    };
}


export default NavTop;