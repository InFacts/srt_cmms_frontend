import React from 'react';
import { Link } from 'react-router-dom'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/position-arrow-admin.css';
import Logo from '../../../images/logo.png';

import Oneone from '../../../images/admin/one-one.svg'
import Text1 from '../../../images/admin/text1.svg'
import Twoone from '../../../images/admin/two-one.svg'
import Text4 from '../../../images/admin/text4.svg'
import Threeone from '../../../images/admin/three-one.svg'
import Text7 from '../../../images/admin/text7.svg'
import Fourone from '../../../images/admin/four-one.svg'
import Text9 from '../../../images/admin/text9.svg'

import RedHouse from '../../../images/red-house.svg';

import BgPink from '../../../images/admin/bg_pink.jpg';
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
            <div style={changeTheam() === true ? { backgroundImage: `url(${BgPink})`, width: "100vw", height: "100vh" } : {}}>
                <div className="container_12 clearfix">
                    <section className="grid_12 ">
                        <h4 className="head-title" style={{ color: "black" }} >บริหารจัดการผู้ใช้งาน</h4>
                        <div style={{ height: "350px" }} id="blackground-white" style={ changeTheam() === true ? { borderRadius: "25px", border: "2px dashed gray", height: "380px" } : {height: "380px"}}>
                            <Link to="/user-management"><img alt='some value' src={Oneone} className="Aone-one" /></Link>
                            <img alt='some value' src={Text1} className="Atext1" />
                            <Link to="/permissiton-admin"><img alt='some value' src={Twoone} className="Atwo-one" /></Link>
                            <img alt='some value' src={Text4} className="Atext4" />
                            <Link to="/activity-log"><img alt='some value' src={Threeone} className="Athree-one" /></Link>
                            <img alt='some value' src={Text7} className="Atext7" />
                            <Link to="/register"><img alt='some value' src={Fourone} className="AFour-one" /></Link>
                            <img alt='some value' src={Text9} className="Atext9" />
                        </div>
                    </section>
                </div>
                <div style={{ margin: "auto", width: "960px", height: "25%" }}>
                            <img className="float-right mt-2" width="200px" alt='red house' src={Logo} />
                            </div>
            </div>
            // <div id="red-house2">
            //     <div className="container_12 clearfix">
            //         <div className="grid_12 from-red-house">
            //             <img alt='red house' src={RedHouse} />
            //         </div>
            //     </div>
            // </div>

            // <div id="red-house">
            //     <div className="container_12 clearfix">
            //         <div className="grid_12">
            //         </div>
            //     </div>
            // </div>
        )
    };
}
export default Map;