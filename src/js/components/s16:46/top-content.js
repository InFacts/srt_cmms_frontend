import React from 'react';

import '../../../css/style.css'

class TopContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="mb-1">
                <h4 className="head-title">เบิก/โอนย้าย อะไหล่/พัสดุ - แบบ ส.16/46</h4>
                <div className="row font-size-top-tap-content">
                    <div className="col-4">
                        <div className="row">
                            <div className="col-5 min-width-top-content">เลขที่เอกสาร: ตช.04/2563</div>
                        </div>
                        <div className="row">
                            <div className="col-5 min-width-top-content">ผู้เบิก: นายอาทิต แห่งการรถไฟ</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col-5 min-width-top-content">ลงวันที่: 14 เม.ย. 2563  06:02 น.</div>
                        </div>
                        <div className="row">
                            <div className="col-5 min-width-top-content">คลังปลายทาง: ลาดกระบัง</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default TopContent;