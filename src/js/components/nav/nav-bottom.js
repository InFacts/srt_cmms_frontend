import React from 'react';

import '../../../vender/fontawesome-free/css/all.css';
// import '../../../css/style-nav.css'
// import '../../../css/style.css'

class NavBottom extends React.Component {

    checkProp() {
        if (this.props.type === 'default') {
            return (
                <>
                    <button type="button" className="p-button--base edit float-right" >ยกเลิก</button>
                    <button type="button" className="p-button--base edit float-right">เพิ่ม</button>
                    <button type="button" className="p-button--base edit float-right">แก้ไข</button>
                    <button type="button" className="button-blue edit float-right mr-2">ค้นหา</button>
                </>
            )
        }
        else {
            return (
                <>
                    <button type="button" className="p-button--base edit">ดาวโหลด ส.16/46</button>
                    <button type="button" className="p-button--base edit float-right">ยกเลิก</button>
                    <button type="button" className="button-blue edit float-right">ยืนยัน</button>
                </>
            )
        }
    }

    render() {
        // console.log(this.props.type)

        return (
            <div id="footer">
                <div className="container_12 clearfix">
                    <div className="grid_12 nav-footer">
                        {this.checkProp()}
                    </div>
                </div>
            </div>
        )
    };
}

export default NavBottom;