import React from 'react';
import { Link } from 'react-router-dom'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/position-arrow-pmt.css';

import Dropdown from '../../../images/spare/drop-dawn.svg'

import Oneone from '../../../images/pmt/one-one.svg'
import Onetwo from '../../../images/pmt/one-two.svg'
import Onethree from '../../../images/pmt/one-three.svg'
import Arrow1 from '../../../images/pmt/arrow1.svg'
import Text1 from '../../../images/pmt/text1.svg'
import Text2 from '../../../images/pmt/text2.svg'
import Text3 from '../../../images/pmt/text3.svg'
import Twoone from '../../../images/pmt/two-one.svg'
import Twotwo from '../../../images/pmt/two-two.svg'
import Twothree from '../../../images/pmt/two-three.svg'
import Text4 from '../../../images/pmt/text4.svg'
import Text5 from '../../../images/pmt/text5.svg'
import Text6 from '../../../images/pmt/text6.svg'
import Threeone from '../../../images/pmt/three-one.svg'
import Arrow2 from '../../../images/pmt/arrow2.svg'
import Text7 from '../../../images/pmt/text7.svg'
import Fourone from '../../../images/pmt/four-one.svg'
import Fourtwo from '../../../images/pmt/four-two.svg'
import Text8 from '../../../images/pmt/text8.svg'
import Text9 from '../../../images/pmt/text9.svg'
import Fiveone from '../../../images/pmt/five-one.svg'
import Text10 from '../../../images/pmt/text10.svg'

import RedHouse from '../../../images/red-house.svg';

class Map extends React.Component {
    
    render() {

        return (
            <div>
                <div id="blackground-white">
                    <div className="container_12 clearfix">
                        <section className="grid_12 ">
                            <div className="ml-3" style={{ height: "500px" }}>
                                <h4 className="head-title" style={{ color: "black" }}>ระบบบริหารงานซ่อมบำรุง - PMT</h4>
                                <Link to="/wr"><img alt='some value' src={Oneone} className="Pone-one" /></Link>
                                <Link to="/assmas"><img alt='some value' src={Onetwo} className="Pone-two" /></Link>
                                <Link to="/plan"><img alt='some value' src={Onethree} className="Pone-three" /></Link>
                                <img alt='some value' src={Arrow1} className="Parrow1" />
                                <img alt='some value' src={Text1} className="Ptext1" />
                                <img alt='some value' src={Text2} className="Ptext2" />
                                <img alt='some value' src={Text3} className="Ptext3" />
                                <img alt='some value' src={Twoone} className="Ptwo-one" />
                                <Link to="/assint"><img alt='some value' src={Twotwo} className="Ptwo-two" /></Link>
                                <img alt='some value' src={Twothree} className="Ptwo-three" />
                                <img alt='some value' src={Text4} className="Ptext4" />
                                <img alt='some value' src={Text5} className="Ptext5" />
                                <img alt='some value' src={Text6} className="Ptext6" />
                                <Link to="/ss101"><img alt='some value' src={Threeone} className="Pthree-one" /></Link>
                                <img alt='some value' src={Arrow2} className="Parrow2" />
                                <img alt='some value' src={Text7} className="Ptext7" />
                                <img alt='some value' src={Fourone} className="Pfour-one" />
                                <img alt='some value' src={Fourtwo} className="Pfour-two" />
                                <img alt='some value' src={Text8} className="Ptext8" />
                                <img alt='some value' src={Text9} className="Ptext9" />
                                <img alt='some value' src={Fiveone} className="Pfive-one" />
                                <img alt='some value' src={Text10} className="Ptext10" />

                                <span className="p-contextual-menu--left Pdrop-dawn1">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-1" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-1" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/wo" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>ออกใบสั่งซ่อมบำรุง</Link>
                                        </span>
                                    </span>
                                </span>

                                <span className="p-contextual-menu--left Pdrop-dawn2">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-2" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-2" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>Commission</Link>
                                            <Link to="/" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>Aquire</Link>
                                            <Link to="/" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>Deploy</Link>
                                        </span>
                                    </span>
                                </span>
                                
                            </div>
                        </section>
                    </div>
                </div>
                <div id="red-house2">
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
                </div>
            </div>
        )
    };
}
export default Map;