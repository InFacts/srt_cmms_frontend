import React from 'react';

import '../../../css/style.css'

class TopContent extends React.Component {
    render() {
        return (
            <div>
                <h4 className="head-title">สรุปการซ่อมบำรุงใน - แบบ สส.101</h4>
                <form className="p-form">
                  <div className="row justify-content-md-center">

                    <div className="col-6">

                      <div className="row">
                        <div className="col-2 col-small-2 col-medium-3">
                          <label for="input" className="p-form__label">ชื่องาน:</label>
                        </div>
                        <div className="col-4 col-small-1 col-medium-2">
                          <label for="input" className="p-form__label">##################</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2 col-small-2 col-medium-3">
                          <label for="input" className="p-form__label">เลขที่เอกสาร:</label>
                        </div>
                        <div className="col-4 col-small-1 col-medium-2">
                          <label for="input" className="p-form__label">ตช.04/2563</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2 col-small-2 col-medium-3">
                          <label for="input" className="p-form__label">วันเวลาที่เกิดเหตุ:</label>
                        </div>
                        <div className="col-4 col-small-1 col-medium-2">
                          <label for="input" className="p-form__label">14 เม.ย. 2563 06:02 น.</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2 col-small-2 col-medium-3">
                          <label for="input" className="p-form__label">วันเวลาที่รับแจ้ง:</label>
                        </div>
                        <div className="col-4 col-small-1 col-medium-2">
                          <label for="input" className="p-form__label">14 เม.ย. 2563 12:02 น.</label>
                        </div>
                      </div>

                    </div>

                    <div className="col-6">
                      <div className="row">
                        <div className="col-4 col-small-2 col-medium-3">
                          <label for="input" className="p-form__label">รายงานการตรวจซ่อมอุปกรณ์แขวง:</label>
                        </div>
                        <div className="col-2 col-small-1 col-medium-2">
                          <label for="input" className="p-form__label">สสญ. ธน. ตอน บตส.ตช.</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-small-2 col-medium-3" >
                          <label for="input" className="p-form__label">ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง):</label>
                        </div>
                        <div className="col-2 col-small-1 col-medium-2">
                          <label for="input" className="p-form__label">##################</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-small-2 col-medium-3">
                          <label for="input" className="p-form__label">สาเหตุสาเหตุและอาการเสียโดยสรุป:</label>
                        </div>
                        <div className="col-2 col-small-1 col-medium-2">
                          <label for="input" className="p-form__label">##################</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-small-2 col-medium-3">
                          <label for="input" className="p-form__label">ได้รับเหตุจาก:</label>
                        </div>
                        <div className="col-2 col-small-1 col-medium-2">
                          <label for="input" className="p-form__label">##################</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-small-2 col-medium-3">
                          <label for="input" className="p-form__label">ได้รับข้อมูลผ่านช่องทาง:</label>
                        </div>
                        <div className="col-2 col-small-1 col-medium-2">
                          <label for="input" className="p-form__label">##################</label>
                        </div>
                      </div>
                    </div>

                  </div>
                </form>
            </div>
        )
    };
}

export default TopContent;
