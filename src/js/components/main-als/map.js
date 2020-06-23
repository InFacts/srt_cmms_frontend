import React from 'react';
import { Link } from 'react-router-dom'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/position-arrow-als.css';

import Oneone from '../../../images/als/one-one.svg'

import Text1 from '../../../images/als/text1.svg'

import Twoone from '../../../images/als/two-one.svg'
import TwooneNew from '../../../images/als/two-one-new.svg'

import Text4 from '../../../images/als/text4.svg'

import Threeone from '../../../images/als/three-one.svg'
import ThreeoneNew from '../../../images/als/three-one-new.svg'

import Text7 from '../../../images/als/text7.svg'
import Fourone from '../../../images/als/four-one.svg'
import Text9 from '../../../images/als/text9.svg'

import Fiveone from '../../../images/als/five-one.svg'
import FiveoneNew from '../../../images/als/five-one-new.svg'

import Text11 from '../../../images/als/text11.svg'

import RedHouse from '../../../images/red-house.svg';

import BgGreen from '../../../images/als/bg_als.jpg';
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
            <div style={changeTheam() === true ? { backgroundImage: `url(${BgGreen})`, width: "100vw", height: "100vh" } : {}}>
                <div>
                    <div className="container_12 clearfix">
                        <section className="grid_12 ">
                            <h4 className="head-title" style={{ color: "black" }}>ระบบวิเคราห์ะวางแผนทรัพยากรซ่อมบำรุง</h4>
                            <div style={{ height: "350px" }} id="blackground-white" style={ changeTheam() === true ? { borderRadius: "25px", border: "2px dashed gray", height: "380px" } : {height: "380px"} }>

                                <Link to="/als-spare"><img alt='some value' src={Oneone} className="ALSone-one" /></Link>
                                
                                <img alt='some value' src={Text1} className="ALStext1" />

                                <Link to="/als-equipment-status"><img alt='some value' src={changeTheam() === true ? TwooneNew : Twoone} className={changeTheam() === true ? "ALStwo-one-new" : "ALStwo-one"} style={ changeTheam() === true ? { width: "70px" } : {} }/></Link>

                                <img alt='some value' src={Text4} className="ALStext4" />

                                <Link to="/als-summary-ss101"><img alt='some value' src={changeTheam() === true ? ThreeoneNew : Threeone} className={changeTheam() === true ? "ALSthree-one-new" : "ALSthree-one"} style={ changeTheam() === true ? { width: "50px" } : {} }/></Link>

                                <img alt='some value' src={Text7} className="ALStext7" />
                                <Link to="/als-preventive-maintenance"><img alt='some value' src={Fourone} className="ALSFour-one" /></Link>
                                <img alt='some value' src={Text9} className="ALStext9" />

                                <Link to="/als-plan-preventive-maintenance"><img alt='some value' src={changeTheam() === true ? FiveoneNew : Fiveone} className={changeTheam() === true ? "ALSFive-one-new" : "ALSFive-one"} style={ changeTheam() === true ? { width: "60px" } : {} }/></Link>

                                <img alt='some value' src={Text11} className="ALStext11" />
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