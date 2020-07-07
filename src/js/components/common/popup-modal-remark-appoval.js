import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useFormikContext } from 'formik';

import TextareaInput from '../common/formik-textarea-input-appoval';
const PopupModalNoPart = (props) => {
    //* PopUp เลขที่อะไหล่ */
    const [data, setData] = useState([]);
    const [currentQueryString, setCurrentQueryString] = useState("");
    const [queryString, setQueryString] = useState("")
    const { setFieldValue } = useFormikContext();

    return (
        <div className="modal" id="modalRemarkAppoval" style={{ display: "none" }}>
            <div className="gray-board">
                <p className="head-title-modal edit">ยืนยันการลงนามรับทราบ</p>
                <div className="container_12 edit-padding">

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">หมายเหตุ (*ถ้ามี)</p></div>
                        <div className="grid_11">
                            <TextareaInput name="remark" />
                        </div>
                    </div>

                    <div className="grid_11 mt-2">
                        <button className="button-blue float-right grid_1" type="button" aria-label="Close active modal" aria-controls="modalRemarkAppoval" id="closeModalNoPart">กลับ</button>

                        <button className="button-blue float-right grid_1" style={{ padding: "0px" }} type="button" aria-label="Close active modal" aria-controls="modalRemarkAppoval" id="closeModalNoPart">ยืนยัน</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    items: state.api.fact.items.items,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PopupModalNoPart);