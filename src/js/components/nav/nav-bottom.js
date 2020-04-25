import React from 'react';

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'
import '../../../css/style.css'

class NavBottom extends React.Component {
    render() {
        return (
            <div id="footer">
                <div className="container_12 clearfix">
                    <div className="grid_12 nav-footer">
                        <button className="p-button--base edit">ดาวโหลด ส.16/46</button>
                        <button className="p-button--base edit float-right">ยกเลิก</button>
                        <button className="button-blue edit float-right">ยืนยัน</button>
                    </div>
                </div>
            </div>
        )
    };
}

export default NavBottom;