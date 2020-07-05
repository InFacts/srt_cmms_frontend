import React from 'react';
import { Link } from 'react-router-dom'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/position-arrow-spare-part.css';

import Dropdown from '../../../images/spare/drop-dawn.svg'

import Oneone from '../../../images/spare/one-one.svg'
import OneoneNew from '../../../images/spare/one-one-new.svg'

import Onetwo from '../../../images/spare/one-two.svg'
import OnetwoNew from '../../../images/spare/one-two-new.svg'

import Onethree from '../../../images/spare/one-three.svg'
import OnethreeNew from '../../../images/spare/one-three-new.svg'

import Arrow1 from '../../../images/spare/arrow1.svg'
import Arrow2 from '../../../images/spare/arrow2.svg'
import Arrow3 from '../../../images/spare/arrow3.svg'
import Text1 from '../../../images/spare/text1.svg'
import Text2 from '../../../images/spare/text2.svg'
import Text3 from '../../../images/spare/text3.svg'

import Center from '../../../images/spare/center.svg'
import CenterNew from '../../../images/spare/center-new.svg'

import Text4 from '../../../images/spare/text4.svg'

import Twoone from '../../../images/spare/two-one.svg'
import TwooneNew from '../../../images/spare/two-one-new.svg'

import Twotwo from '../../../images/spare/two-two.svg'
import TwotwoNew from '../../../images/spare/two-two-new.svg'

import Twothree from '../../../images/spare/two-three.svg'
import TwothreeNew from '../../../images/spare/two-three-new.svg'

import Arrow4 from '../../../images/spare/arrow4.svg'
import Arrow5 from '../../../images/spare/arrow5.svg'
import Arrow6 from '../../../images/spare/arrow6.svg'
import Text5 from '../../../images/spare/text5.svg'
import Text6 from '../../../images/spare/text6.svg'
import Text7 from '../../../images/spare/text7.svg'

import Threeone from '../../../images/spare/three-one.svg'
import ThreeoneNew from '../../../images/spare/three-one-new.svg'

import Threetwo from '../../../images/spare/three-two.svg'

import Threethree from '../../../images/spare/three-three.svg'
import ThreethreeNew from '../../../images/spare/three-three-new.svg'

import Text8 from '../../../images/spare/text8.svg'
import Text9 from '../../../images/spare/text9.svg'
import Text10 from '../../../images/spare/text10.svg'

import Fourone from '../../../images/spare/four-one.svg'
import FouroneNew from '../../../images/spare/four-one-new.svg'

import Fourtwo from '../../../images/spare/four-two.svg'
import FourtwoNew from '../../../images/spare/four-two-new.svg'

import Fourthree from '../../../images/spare/four-three.svg'
import FourthreeNew from '../../../images/spare/four-three-new.svg'

import Text11 from '../../../images/spare/text11.svg'
import Text12 from '../../../images/spare/text12.svg'
import Text13 from '../../../images/spare/text13.svg'

import RedHouse from '../../../images/red-house.svg';

import BgRed from '../../../images/spare/bg_red.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'

// Start Function For Drop Dawn
const toggleMenu = (element, show, top) => {
    var target = document.getElementById(element.getAttribute('aria-controls'));
    if (target) {
        element.setAttribute('aria-expanded', show);
        target.setAttribute('aria-hidden', !show);

        if (typeof top !== 'undefined') {
            target.style.top = top + 'px';
        }
    }
}

const setupContextualMenu = (menuToggle) => {
    var curent = this;
    menuToggle.addEventListener('click', function (event) {
        event.preventDefault();
        var menuAlreadyOpen = menuToggle.getAttribute('aria-expanded') === 'true';

        var top = menuToggle.offsetHeight;

        if (window.getComputedStyle(menuToggle).display === 'inline') {
            top += 5;
        }

        toggleMenu(menuToggle, !menuAlreadyOpen, top);
    });
}

const setupAllContextualMenus = (contextualMenuToggleSelector) => {
    console.log("SET UP DROP DAWN")
    var toggles = document.querySelectorAll(contextualMenuToggleSelector);
    for (var i = 0, l = toggles.length; i < l; i++) {
        // console.log(toggles[i])

        setupContextualMenu(toggles[i]);
    }

    // document.addEventListener('click', function (event) {
    //     for (var i = 0, l = toggles.length; i < l; i++) {
    //         var toggle = toggles[i];
    //         var contextualMenu = document.getElementById(toggle.getAttribute('aria-controls'));
    //         var clickOutside = !(toggle.contains(event.target) || contextualMenu.contains(event.target));
    //         if (clickOutside) {
    //             toggleMenu(toggle, false);
    //         }
    //     }
    // });
    document.addEventListener('keydown', function (e) {
        e = e || window.event;

        if (e.keyCode === 27) {
            for (var i = 0, l = toggles.length; i < l; i++) {
                toggleMenu(toggles[i], false);
            }
        }
    });
}
// End Function For Drop Dawn

class Map extends React.Component {
    componentDidMount() {
        // Setup DropDawn
        setupAllContextualMenus('.p-contextual-menu__toggle');
    }

    render() {
        return (
            <div style={changeTheam() === true ? { backgroundImage: `url(${BgRed})`, width: "100vw", height: "100vh" } : {}}>
                <div>
                    <div className="container_12 clearfix">
                        <section className="grid_12 ">
                            <h4 className="head-title" style={{ color: "black" }}>ระบบบริหารข้อมูลอะไหล่ - Spare</h4>
                            <div id="blackground-white" style={changeTheam() === true ? { borderRadius: "25px", border: "2px dashed gray", height: "380px" } : { height: "380px" }}>

                                <Link to="/spare-goods-receipt2">
                                    <div className="p-tooltip--btm-center edit" aria-describedby="btm-cntr" >
                                        <img alt='some value' src={changeTheam() === true ? OneoneNew : Oneone}
                                            className={changeTheam() === true ? "one-one-new" : "one-one"} style={changeTheam() === true ? { width: "60px" } : {}} />
                                        <span className="p-tooltip__message edit_p_tooltip__message tooltip1" role="tooltip" id="btm-cntr">Spare 1</span>
                                    </div>
                                </Link>

                                <Link to="/spare-goods-return">
                                    <img alt='some value' src={changeTheam() === true ? OnetwoNew : Onetwo}
                                        className={changeTheam() === true ? "one-two-new" : "one-two"} style={changeTheam() === true ? { width: "85px" } : {}} />
                                </Link>

                                <Link to="/spare-goods-receipt-no-po">
                                    <img alt='some value' src={changeTheam() === true ? OnethreeNew : Onethree}
                                        className={changeTheam() === true ? "one-three-new" : "one-three"} style={changeTheam() === true ? { width: "85px" } : {}} />
                                </Link>

                                <img alt='some value' src={Arrow1} className="arrow1" />
                                <img alt='some value' src={Arrow2} className="arrow2" />
                                <img alt='some value' src={Arrow3} className="arrow3" />
                                <img alt='some value' src={Text1} className="text1" />
                                <img alt='some value' src={Text2} className="text2" />
                                <img alt='some value' src={Text3} className="text3" />

                                <Link to="/spare-warehouse"><img alt='some value' src={changeTheam() === true ? CenterNew : Center}
                                    className={changeTheam() === true ? "center-new" : "center"} style={changeTheam() === true ? { width: "75px" } : {}} /></Link>

                                <img alt='some value' src={Text4} className="text4" />

                                <Link to="/spare-goods-usage">
                                    <div className="p-tooltip--btm-center edit" aria-describedby="btm-cntr" >
                                        <img alt='some value' src={changeTheam() === true ? TwooneNew : Twoone}
                                            className={changeTheam() === true ? "two-one-new" : "two-one"} style={changeTheam() === true ? { width: "75px" } : {}} />
                                        <span className="p-tooltip__message edit_p_tooltip__message tooltip3" role="tooltip" id="btm-cntr">Spare 3</span>
                                    </div>
                                </Link>

                                <Link to="/spare-goods-fix">
                                    <div className="p-tooltip--btm-center edit" aria-describedby="btm-cntr" >
                                        <img alt='some value' src={changeTheam() === true ? TwotwoNew : Twotwo}
                                            className={changeTheam() === true ? "two-two-new" : "two-two"} style={changeTheam() === true ? { width: "70px" } : {}} />
                                        <span className="p-tooltip__message edit_p_tooltip__message tooltip5" role="tooltip" id="btm-cntr">PMT 3</span>
                                    </div>
                                </Link>

                                <Link to="/spare-goods-issue"><img alt='some value' src={changeTheam() === true ? TwothreeNew : Twothree}
                                    className={changeTheam() === true ? "two-three-new" : "two-three"} style={changeTheam() === true ? { width: "80px" } : {}} /></Link>

                                <img alt='some value' src={Arrow4} className="arrow4" />
                                <img alt='some value' src={Arrow5} className="arrow5" />
                                <img alt='some value' src={Arrow6} className="arrow6" />
                                <img alt='some value' src={Text5} className="text5" />
                                <img alt='some value' src={Text6} className="text7" />
                                <img alt='some value' src={Text7} className="text6" />

                                <Link to="/spare-inventory-transfer">
                                    <div className="p-tooltip--btm-center edit" aria-describedby="btm-cntr" >
                                        <img alt='some value' src={changeTheam() === true ? ThreeoneNew : Threeone}
                                            className={changeTheam() === true ? "three-one-new" : "three-one"} style={changeTheam() === true ? { width: "85px" } : {}} />
                                        <span className="p-tooltip__message edit_p_tooltip__message tooltip4" role="tooltip" id="btm-cntr">Spare 4</span>
                                    </div>
                                </Link>

                                <Link to="/spare-physical-count">
                                    <img alt='some value' src={changeTheam() === true ? ThreethreeNew : Threetwo}
                                        className={changeTheam() === true ? "three-two-new" : "three-two"} style={changeTheam() === true ? { width: "80px" } : {}} />
                                </Link>

                                <Link to="/spare-salvage-return">
                                    <img alt='some value' src={changeTheam() === true ? ThreethreeNew : Threethree}
                                        className={changeTheam() === true ? "three-three-new" : "three-three"} style={changeTheam() === true ? { width: "75px" } : {}} />
                                </Link>

                                <img alt='some value' src={Text8} className="text8" />
                                <img alt='some value' src={Text9} className="text9" />
                                <img alt='some value' src={Text10} className="text10" />

                                <Link to="/track"><img alt='some value' src={changeTheam() === true ? FouroneNew : Fourone}
                                    className={changeTheam() === true ? "four-one-new" : "four-one"} style={changeTheam() === true ? { width: "70px" } : {}} /></Link>

                                <Link to="/spare-item-master-data"><img alt='some value' src={changeTheam() === true ? FourtwoNew : Fourtwo}
                                    className={changeTheam() === true ? "four-two-new" : "four-two"} style={changeTheam() === true ? { width: "60px" } : {}} /></Link>

                                <Link to="/spare-report-s-1">
                                    <img alt='some value' src={changeTheam() === true ? FourthreeNew : Fourthree}
                                        className={changeTheam() === true ? "four-three-new" : "four-three"} style={changeTheam() === true ? { width: "70px" } : {}} />
                                </Link>

                                <img alt='some value' src={Text11} className="text11" />
                                <img alt='some value' src={Text12} className="text12" />
                                <img alt='some value' src={Text13} className="text13" />

                                <span className="p-contextual-menu--left drop-dawn1">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-1" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-1" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/spare-goods-return" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>คืนอะไหล่</Link>
                                            <Link to="/spare-goods-receipt-fix" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>รับคืนอะไหล่ส่งซ่อม</Link>
                                        </span>
                                    </span>
                                </span>
                                <span className="p-contextual-menu--left drop-dawn2">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-2" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-2" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/spare-physical-count" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>ตรวจนับสินค้า</Link>
                                            <Link to="/spare-inventory-adjustment" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>ปรับปรุงจำนวนอะไหล่</Link>
                                        </span>
                                    </span>
                                </span>
                                <span className="p-contextual-menu--left drop-dawn3">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-3" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-3" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/spare-salvage-return" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>คืนซากอะไหล่ Spare5</Link>
                                            <Link to="/spare-salvage-sold" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>จำหหน่ายซากอะไหล่</Link>
                                        </span>
                                    </span>
                                </span>
                                <span className="p-contextual-menu--left drop-dawn4">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-4" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-4" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/spare-report-b22" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>รายงาน บ.22 (Spare 6)</Link>
                                            <Link to="/spare-report-s-1" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>รายงาน ส.1 (Spare 7)</Link>
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </section>
                    </div>
                </div>
                {/* <div id="red-house2">
                    <div className="container_12 clearfix">
                        <div className="grid_12 from-red-house">
                            <img alt='red house' src={RedHouse} />
                        </div>
                    </div>
                </div>

                <div id="red-house">
                    <div className="container_12 clearfix">
                        <div className="grid_12">
                        </div>
                    </div>
                </div> */}
            </div>
        )
    };
}
export default Map;