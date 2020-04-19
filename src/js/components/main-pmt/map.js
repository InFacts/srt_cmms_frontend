import React from 'react';
import { Link } from 'react-router-dom'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/position-arrow-pmt.css';

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
class Map extends React.Component {

    render() {
        return (
            <div className="ml-3" style={{ height: "500px" }}>
                <h4 className="head-title">ระบบบริหารงานซ่อมบำรุง - PMT</h4>
                <img alt='some value' src={Oneone} className="Pone-one" />
                <img alt='some value' src={Onetwo} className="Pone-two" />
                <img alt='some value' src={Onethree} className="Pone-three" />
                <img alt='some value' src={Arrow1} className="Parrow1" />
                <img alt='some value' src={Text1} className="Ptext1" />
                <img alt='some value' src={Text2} className="Ptext2" />
                <img alt='some value' src={Text3} className="Ptext3" />
                <img alt='some value' src={Twoone} className="Ptwo-one" />
                <img alt='some value' src={Twotwo} className="Ptwo-two" />
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