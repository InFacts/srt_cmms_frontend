import React from 'react';
import { Link } from 'react-router-dom'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/position-arrow-pmt.css';

import Dropdown from '../../../images/spare/drop-dawn.svg'

import Oneone from '../../../images/pmt/one-one.svg'
import OneoneNew from '../../../images/pmt/one-one-new.svg'

import Onetwo from '../../../images/pmt/one-two.svg'
import OnetwoNew from '../../../images/pmt/one-two-new.svg'

import Onethree from '../../../images/pmt/one-three.svg'
import OnethreeNew from '../../../images/pmt/one-three-new.svg'

import Arrow1 from '../../../images/pmt/arrow1.svg'
import Text1 from '../../../images/pmt/text1.svg'
import Text2 from '../../../images/pmt/text2.svg'
import Text3 from '../../../images/pmt/text3.svg'

import Twoone from '../../../images/pmt/two-one.svg'
import TwooneNew from '../../../images/pmt/two-one-new.svg'

import Twotwo from '../../../images/pmt/two-two.svg'
import TwotwoNew from '../../../images/pmt/two-two-new.svg'

import Twothree from '../../../images/pmt/two-three.svg'
import TwothreeNew from '../../../images/pmt/two-three-new.svg'

import Text4 from '../../../images/pmt/text4.svg'
import Text5 from '../../../images/pmt/text5.svg'
import Text6 from '../../../images/pmt/text6.svg'

import Threeone from '../../../images/pmt/three-one.svg'
import ThreeoneNew from '../../../images/pmt/three-one-new.svg'

import Threethree from '../../../images/pmt/three-three.svg'
import ThreethreeNew from '../../../images/pmt/three-three-new.svg'

import Arrow2 from '../../../images/pmt/arrow2.svg'
import Text7 from '../../../images/pmt/text7.svg'
import Text11 from '../../../images/pmt/text11.svg'

import Fourone from '../../../images/pmt/four-one.svg'
import FouroneNew from '../../../images/pmt/four-one-new.svg'

import Fourtwo from '../../../images/pmt/four-two.svg'
import FourtwoNew from '../../../images/pmt/four-two-new.svg'

import Text8 from '../../../images/pmt/text8.svg'
import Text9 from '../../../images/pmt/text9.svg'

import Fiveone from '../../../images/pmt/five-one.svg'
import FiveoneNew from '../../../images/pmt/five-one-new.svg'

import Text10 from '../../../images/pmt/text10.svg'

import RedHouse from '../../../images/red-house.svg';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
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
            <div style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "100vh" } : {}}>
                    <div className="container_12 clearfix">
                        <section className="grid_12 ">
                            <h4 className="head-title" style={{ color: "black" }}>ระบบบริหารงานซ่อมบำรุง - PMT</h4>
                            <div style={{ height: "350px" }} id="blackground-white" style={ changeTheam() === true ? { borderRadius: "25px", border: "2px dashed gray", height: "380px" } : {height: "380px"} }>
                                
                                <Link to="/pmt-work-request">
                                <div className="p-tooltip--btm-center edit" aria-describedby="btm-cntr" >
                                <img alt='some value' src={changeTheam() === true ? OneoneNew : Oneone} 
                                className={changeTheam() === true ? "Pone-one-new" : "Pone-one"} style={ changeTheam() === true ? { width: "80px" } : {} }/>
                                <span className="p-tooltip__message edit_p_tooltip__message Ptooltip3" role="tooltip" id="btm-cntr">PMT 1</span>
                                    </div>
                                    </Link>

                                <Link to="/pmt-equipment-master"><img alt='some value' src={changeTheam() === true ? OnetwoNew : Onetwo} 
                                className={changeTheam() === true ? "Pone-two-new" : "Pone-two"} style={ changeTheam() === true ? { width: "50px" } : {} } /></Link>

                                <Link to="/pmt-create-checklist"><img alt='some value' src={changeTheam() === true ? OnethreeNew : Onethree} 
                                className={changeTheam() === true ? "Pone-three-new" : "Pone-three"} style={ changeTheam() === true ? { width: "55px" } : {} } /></Link>

                                <img alt='some value' src={Arrow1} className="Parrow1" />
                                <img alt='some value' src={Text1} className="Ptext1" />
                                <img alt='some value' src={Text2} className="Ptext2" />
                                <img alt='some value' src={Text3} className="Ptext3" />
                                
                                <Link to="/pmt-work-order"><img alt='some value' src={changeTheam() === true ? TwooneNew : Twoone} 
                                className={changeTheam() === true ? "Ptwo-one-new" : "Ptwo-one"} style={ changeTheam() === true ? { width: "55px" } : {} } /></Link>

                                <Link to="/pmt-equipment-installation"><img alt='some value' src={changeTheam() === true ? TwotwoNew : Twotwo} 
                                className={changeTheam() === true ? "Ptwo-two-new" : "Ptwo-two"} style={ changeTheam() === true ? { width: "70px" } : {} }/></Link>

                                <Link to="/pmt-create-schedule-checklist"><img alt='some value' src={changeTheam() === true ? TwothreeNew : Twothree} 
                                className={changeTheam() === true ? "Ptwo-three-new" : "Ptwo-three"} style={ changeTheam() === true ? { width: "55px" } : {} } /></Link>

                                <img alt='some value' src={Text4} className="Ptext4" />
                                <img alt='some value' src={Text5} className="Ptext5" />
                                <img alt='some value' src={Text6} className="Ptext6" />

                                <Link to="/pmt-ss-101">
                                 <div className="p-tooltip--btm-center edit" aria-describedby="btm-cntr" >
                                <img alt='some value' src={changeTheam() === true ? ThreeoneNew : Threeone} 
                                className={changeTheam() === true ? "Pthree-one-new" : "Pthree-one"} style={ changeTheam() === true ? { width: "50px" } : {} } />
                                <span className="p-tooltip__message edit_p_tooltip__message Ptooltip1" role="tooltip" id="btm-cntr">PMT 4</span>
                                    </div>
                                </Link>

                                <Link to="/pmt-fixed-asset">
                                <div className="p-tooltip--btm-center edit" aria-describedby="btm-cntr" >
                                <img alt='some value' src={changeTheam() === true ? ThreethreeNew : Threethree} 
                                className={changeTheam() === true ? "Pthree-three-new" : "Pthree-three"} style={ changeTheam() === true ? { width: "55px" } : {} } />
                                <span className="p-tooltip__message edit_p_tooltip__message Ptooltip2" role="tooltip" id="btm-cntr">PMT 2</span>
                                    </div></Link>

                                <img alt='some value' src={Arrow2} className="Parrow2" />
                                <img alt='some value' src={Text7} className="Ptext7" />
                                <img alt='some value' src={Text11} className="Ptext11" />

                                <Link to="/track"><img alt='some value' src={changeTheam() === true ? FouroneNew : Fourone} 
                                className={changeTheam() === true ? "Pfour-one-new" : "Pfour-one"} style={ changeTheam() === true ? { width: "65px" } : {} } /></Link>

                                <Link to="/pmt-maitenant-item"><img alt='some value' src={changeTheam() === true ? FourtwoNew : Fourtwo} 
                                className={changeTheam() === true ? "Pfour-two-new" : "Pfour-two"} style={ changeTheam() === true ? { width: "80px" } : {} } /></Link>

                                <img alt='some value' src={Text8} className="Ptext8" />
                                <img alt='some value' src={Text9} className="Ptext9" />

                                <Link to="/report"><img alt='some value' src={changeTheam() === true ? FiveoneNew : Fiveone} 
                                className={changeTheam() === true ? "Pfive-one-new" : "Pfive-one"} style={ changeTheam() === true ? { width: "70px" } : {} } /></Link>

                                <img alt='some value' src={Text10} className="Ptext10" />

                                <span className="p-contextual-menu--left Pdrop-dawn1">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-1" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-1" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/pmt-create-checklist" className="p-contextual-menu__link" style={{ fontSize: "20px" }}
                                            >สร้างวาระ</Link>
                                            <Link to="/pmt-all-checklist" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>แผนการทำวาระ</Link>
                                        </span>
                                    </span>
                                </span>

                                {/* <span className="p-contextual-menu--left Pdrop-dawn2">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-2" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-2" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>Commission</Link>
                                            <Link to="/" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>Aquire</Link>
                                            <Link to="/" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>Deploy</Link>
                                        </span>
                                    </span>
                                </span> */}

                            </div>
                        </section>
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