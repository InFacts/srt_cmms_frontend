import React from 'react';
import { Link } from 'react-router-dom'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/position-arrow-spare-part.css';

import Dropdown from '../../../images/spare/drop-dawn.svg'

import Oneone from '../../../images/spare/one-one.svg'
import Onetwo from '../../../images/spare/one-two.svg'
import Onethree from '../../../images/spare/one-three.svg'
import Arrow1 from '../../../images/spare/arrow1.svg'
import Arrow2 from '../../../images/spare/arrow2.svg'
import Arrow3 from '../../../images/spare/arrow3.svg'
import Text1 from '../../../images/spare/text1.svg'
import Text2 from '../../../images/spare/text2.svg'
import Text3 from '../../../images/spare/text3.svg'
import Center from '../../../images/spare/center.svg'
import Text4 from '../../../images/spare/text4.svg'
import Twoone from '../../../images/spare/two-one.svg'
import Twotwo from '../../../images/spare/two-two.svg'
import Twothree from '../../../images/spare/two-three.svg'
import Arrow4 from '../../../images/spare/arrow4.svg'
import Arrow5 from '../../../images/spare/arrow5.svg'
import Arrow6 from '../../../images/spare/arrow6.svg'
import Text5 from '../../../images/spare/text5.svg'
import Text6 from '../../../images/spare/text6.svg'
import Text7 from '../../../images/spare/text7.svg'
import Threeone from '../../../images/spare/three-one.svg'
import Threetwo from '../../../images/spare/three-two.svg'
import Threethree from '../../../images/spare/three-three.svg'
import Text8 from '../../../images/spare/text8.svg'
import Text9 from '../../../images/spare/text9.svg'
import Text10 from '../../../images/spare/text10.svg'
import Fourone from '../../../images/spare/four-one.svg'
import Fourtwo from '../../../images/spare/four-two.svg'
import Fourthree from '../../../images/spare/four-three.svg'
import Text11 from '../../../images/spare/text11.svg'
import Text12 from '../../../images/spare/text12.svg'
import Text13 from '../../../images/spare/text13.svg'

import RedHouse from '../../../images/red-house.svg';

class Map extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <div className="container_12 clearfix">
                        <section className="grid_12 ">
                        <h4 className="head-title" style={{ color: "black"}}>ระบบบริหารข้อมูลอะไหล่ - Spare</h4>
                            <div className="ml-3" id="blackground-white" style={{ height: "380px" }}>
                                <Link to="/good-receipt"><img alt='some value' src={Oneone} className="one-one" /></Link>
                                <img alt='some value' src={Onetwo} className="one-two" />
                                <Link to="/good-good-issue-no-po"><img alt='some value' src={Onethree} className="one-three" /></Link>
                                <img alt='some value' src={Arrow1} className="arrow1" />
                                <img alt='some value' src={Arrow2} className="arrow2" />
                                <img alt='some value' src={Arrow3} className="arrow3" />
                                <img alt='some value' src={Text1} className="text1" />
                                <img alt='some value' src={Text2} className="text2" />
                                <img alt='some value' src={Text3} className="text3" />
                                <Link to="/inventory"><img alt='some value' src={Center} className="center" /></Link>
                                <img alt='some value' src={Text4} className="text4" />
                                <Link to="/good-issue-2"><img alt='some value' src={Twoone} className="two-one" /></Link>
                                <Link to="/good-maintenace"><img alt='some value' src={Twothree} className="two-two" /></Link>
                                <Link to="/good-take-out"><img alt='some value' src={Twotwo} className="two-three" /></Link>
                                <img alt='some value' src={Arrow4} className="arrow4" />
                                <img alt='some value' src={Arrow5} className="arrow5" />
                                <img alt='some value' src={Arrow6} className="arrow6" />
                                <img alt='some value' src={Text5} className="text5" />
                                <img alt='some value' src={Text6} className="text7" />
                                <img alt='some value' src={Text7} className="text6" />
                                
                                <Link to="/s1646"><img alt='some value' src={Threeone} className="three-one" /></Link>
                                <img alt='some value' src={Threetwo} className="three-two" />
                                <img alt='some value' src={Threethree} className="three-three" />
                                <img alt='some value' src={Text8} className="text8" />
                                <img alt='some value' src={Text9} className="text9" />
                                <img alt='some value' src={Text10} className="text10" />
                                <Link to="/track"><img alt='some value' src={Fourone} className="four-one" /></Link>
                                <Link to="/item-master-data"><img alt='some value' src={Fourtwo} className="four-two" /></Link>
                                <img alt='some value' src={Fourthree} className="four-three" />
                                <img alt='some value' src={Text11} className="text11" />
                                <img alt='some value' src={Text12} className="text12" />
                                <img alt='some value' src={Text13} className="text13" />

                                <span className="p-contextual-menu--left drop-dawn1">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-1" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-1" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/good-return-1" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>คืนอะไหล่</Link>
                                            <Link to="/good-return-2" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>รับคืนอะไหล่ส่งซ่อม</Link>
                                        </span>
                                    </span>
                                </span>
                                <span className="p-contextual-menu--left drop-dawn2">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-2" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-2" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/unit-count" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>ตรวจนับสินค้า</Link>
                                            {/* <Link to="/" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>ปรับปรุงจำนวนอะไหล่</Link> */}
                                        </span>
                                    </span>
                                </span>
                                <span className="p-contextual-menu--left drop-dawn3">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-3" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-3" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/salvage-management-1" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>คืนซากอะไหล่</Link>
                                            <Link to="/salvage-management-2" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>จำหหน่ายซากอะไหล่</Link>
                                        </span>
                                    </span>
                                </span>
                                <span className="p-contextual-menu--left drop-dawn4">
                                    <button className="p-contextual-menu__toggle" style={{ border: "none", padding: "0" }} aria-controls="menu-4" aria-expanded="false" aria-haspopup="true"><img alt='some value' src={Dropdown} /></button>
                                    <span className="p-contextual-menu__dropdown" id="menu-4" aria-hidden="true" aria-label="submenu">
                                        <span className="p-contextual-menu__group">
                                            <Link to="/report-b22" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>รายงาน บ.22 (Spare6)</Link>
                                            <Link to="/report-s1" className="p-contextual-menu__link" style={{ fontSize: "20px" }}>รายงาน ส.1 (Spare7)</Link>
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