import React from 'react';
import { Link } from 'react-router-dom'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/position-arrow-spare-part.css';

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

class Map extends React.Component {

    render() {
        return (
            <div className="ml-3" style={{ height: "500px" }}>
                <h4 className="head-title">ระบบบริหารข้อมูลอะไหล่ - Spare</h4>
                <img alt='some value' src={Oneone} className="one-one" />
                <img alt='some value' src={Onetwo} className="one-two" />
                <img alt='some value' src={Onethree} className="one-three" />
                <img alt='some value' src={Arrow1} className="arrow1" />
                <img alt='some value' src={Arrow2} className="arrow2" />
                <img alt='some value' src={Arrow3} className="arrow3" />
                <img alt='some value' src={Text1} className="text1" />
                <img alt='some value' src={Text2} className="text2" />
                <img alt='some value' src={Text3} className="text3" />
                <img alt='some value' src={Center} className="center" />
                <img alt='some value' src={Text4} className="text4" />
                <img alt='some value' src={Twoone} className="two-one" />
                <img alt='some value' src={Twotwo} className="two-two" />
                <img alt='some value' src={Twothree} className="two-three" />
                <img alt='some value' src={Arrow4} className="arrow4" />
                <img alt='some value' src={Arrow5} className="arrow5" />
                <img alt='some value' src={Arrow6} className="arrow6" />
                <img alt='some value' src={Text5} className="text5" />
                <img alt='some value' src={Text6} className="text6" />
                <img alt='some value' src={Text7} className="text7" />
                <Link to="/s1646"><img alt='some value' src={Threeone} className="three-one" /></Link>
                <img alt='some value' src={Threetwo} className="three-two" />
                <img alt='some value' src={Threethree} className="three-three" />
                <img alt='some value' src={Text8} className="text8" />
                <img alt='some value' src={Text9} className="text9" />
                <img alt='some value' src={Text10} className="text10" />
                <img alt='some value' src={Fourone} className="four-one" />
                <img alt='some value' src={Fourtwo} className="four-two" />
                <img alt='some value' src={Fourthree} className="four-three" />
                <img alt='some value' src={Text11} className="text11" />
                <img alt='some value' src={Text12} className="text12" />
                <img alt='some value' src={Text13} className="text13" />
            </div>
            // <div class="ml-3" style={{ height: "500px" }}>
            //     <h3 class="font-weight-bolder mt-3">ระบบบริหารข้อมูลอะไหล่ (Spare)</h3>
            //     <img alt='some value' src={Oneone} class="rounded-xl position-absolute one-one" alt="Image1" height="100px" width="130px" />
            //     <p class="position-absolute one-one-text">นำเข้าอะไหล่โดย</p>
            //     <p class="position-absolute one-one-text2">มีใบสั่งซื้อ (Spare1)</p>

            //     <img alt='some value' src={Onetwo} class="rounded-xl position-absolute one-two" alt="Image2" height="100px" width="130px" />
            //     <p class="position-absolute one-two-text">คืนอะไหล่/</p>
            //     <p class="position-absolute one-two-text2">รับคืนอะไหล่ส่งซ่อม</p>
            //     <img alt='some value' src={Onethree} class="rounded-xl position-absolute one-three" alt="Image3" height="120px" width="150px" />
            //     <p class="position-absolute one-three-text">นำอะไหล่เข้าโดยไม่มีใบสั่งซื้อ</p>
            //     <p class="position-absolute one-three-text2">(สำหรับโอนย้ายอะไหล่)</p>

            //     <img alt='some value' src={Center} class="rounded-xl position-absolute center" alt="center" height="120px" width="150px" />
            //     <p class="position-absolute center-text">คลังอะไหล่/พัสดุ</p>

            //     <img alt='some value' src={Twoone} class="rounded-xl position-absolute two-one" alt="Image4" height="120px" width="150px" />
            //     <p class="position-absolute two-one-text">เบิกอะไหล่/พัสดุไปใช้งาน</p>
            //     <p class="position-absolute two-one-text2">(Spare3)</p>
            //     <img alt='some value' src={Twotwo} class="rounded-xl position-absolute two-two" alt="Image5" height="120px" width="150px" />
            //     <p class="position-absolute two-two-text">จำหน่ายซากอุปกรณ์</p>
            //     <img alt='some value' src={Twothree} class="rounded-xl position-absolute two-three" alt="Image6" height="120px" width="150px" />
            //     <p class="position-absolute two-three-text">ส่งซ่อมอะไหล่</p>
            //     <p class="position-absolute two-three-text2">(PMT3)</p>

            //     <img alt='some value' src={Threeone} class="rounded-xl position-absolute three-one" alt="Image7" height="120px" width="150px" />
            //     <p class="position-absolute three-one-text">ติดตามเอกสาร</p>
            //     <img alt='some value' src={Threetwo} class="rounded-xl position-absolute three-two" alt="Image8" height="120px" width="150px" />
            //     <p class="position-absolute three-two-text">คืนซากเพื่อรอการ</p>
            //     <p class="position-absolute three-two-text2">ดำเนินการตัดทรัพย์สิน</p>
            //     <p class="position-absolute three-two-text3">(Spare5)</p>
            //     <Link to="/s1646"><img alt='some value' src={Threethree} class="rounded-xl position-absolute three-three" alt="Image9" height="120px" width="150px" /></Link>
            //     <p class="position-absolute three-three-text">เบิก/โอนย้ายอะไหล่พัสดุ ส.16/46</p>
            //     <p class="position-absolute three-three-text2">(Spare4)</p>

            //     <img alt='some value' src={Fourone} class="rounded-xl position-absolute four-one" alt="Image10" height="120px" width="150px" />
            //     <p class="position-absolute four-one-text">รายการอุปกรณ์หลัก</p>
            //     <p class="position-absolute four-one-text2">(Item Master Data)</p>
            //     <img alt='some value' src={Fourtwo} class="rounded-xl position-absolute four-two" alt="Image11" height="120px" width="150px" />

            //     <div class="dropdown">
            //         <img alt='some value' src={Fourtwo} class="rounded-xl position-absolute four-two" alt="Image11" height="120px" width="150px" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
            //         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            //             <a class="dropdown-item" href="#"><span class="front-red">รายงาน</span>บ.22 (Spare6)</a>
            //             <a class="dropdown-item" href="#"><span class="front-red">รายงาน</span>ส.1 (Spare7)</a>
            //         </div>
            //     </div>
            //     <p class="position-absolute four-two-text">รายงาน (Report)</p>
            // </div>
        )
    };
}
export default Map;