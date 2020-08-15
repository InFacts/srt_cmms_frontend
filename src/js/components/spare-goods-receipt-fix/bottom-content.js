import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TableStatus from '../common/table-status';
import Table from '../common/table';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';
import {
  getEmployeeIDFromUserID, fetchStepApprovalDocumentData,
  DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID,
  isValidInternalDocumentIDFormat, isValidInternalDocumentIDDraftFormat,
  fetchAttachmentDocumentData, validateEmployeeIDField, validateWarehouseIDField,
  validateInternalDocumentIDFieldHelper, DOCUMENT_STATUS, getUserIDFromEmployeeID,
  validatedataDocumentField, sumTotalLineItemHelper, sumTotalHelper, checkBooleanForEditHelper,
  validateLineNumberInternalItemIDFieldHelper, validateLineNumberQuatityItemIDFieldHelper,
  validateLineNumberPerUnitPriceItemIDFieldHelper
} from '../../helper';
import PopupModalNoPart from '../common/popup-modal-nopart'

import '../../../css/table.css';

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const [lineNumber, setLineNumber] = useState('');

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  const sumTotalLineItem = (quantity, per_unit_price, description) => sumTotalLineItemHelper(quantity, per_unit_price, description);
  const sumTotal = (list_show) => sumTotalHelper(list_show);

  const validateLineNumberInternalItemIDField = (...args) => validateLineNumberInternalItemIDFieldHelper(DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX, fact, values, setFieldValue, ...args);

  const validateLineNumberQuatityItemIDField = (...args) => validateLineNumberQuatityItemIDFieldHelper(setFieldValue, ...args)

  const validateLineNumberPerUnitPriceItemIDField = (...args) => validateLineNumberPerUnitPriceItemIDFieldHelper(setFieldValue, ...args)

  let checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact);

  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])

  return (
    <div id={changeTheam() === true ? "" : "blackground-gray"}>
      <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

        <div className="container_12 ">

          <div id="listItem_content" className="tabcontent">
            <div className="container_12 mt-1" style={{ paddingRight: "10px" }}>
              <Table line_items={values.line_items}
                sumTotalLineItem={sumTotalLineItem}
                validateLineNumberInternalItemIDField={validateLineNumberInternalItemIDField}
                validateLineNumberQuatityItemIDField={validateLineNumberQuatityItemIDField}
                validateLineNumberPerUnitPriceItemIDField={validateLineNumberPerUnitPriceItemIDField}
                setLineNumber={setLineNumber}
                checkBooleanForEdit={checkBooleanForEdit}
                tabIndex={6}
              />
            </div>

            <div className="container_12">
              <div className="grid_1 float-right"><p className="cancel-default float-right">บาท.</p></div>
              <div className="grid_3 float-right push_0">
                <input type="text" className="cancel-default" value={sumTotal(values.line_items)} disabled="disabled"></input>
              </div>
              <div className="grid_2 float-right push_0"><p className="cancel-default float-right">รวมเป็นเงิน</p></div>
            </div>
            <div className="container_12">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="100"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
            </div>
          </div>

          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>

          <div id="table_status_content" className="tabcontent">
            {/* {console.log("values.step_approve", values.step_approve)} */}
            <TableStatus bodyTableStatus={values.step_approve} />
          </div>

          {/* PopUp ค้นหาอะไหล่ MODE ADD */}
          <PopupModalNoPart keyname='line_items' lineNumber={lineNumber} nameModal="modalNoPart" />

        </div>
      </div>
    </div >
  )
};

const mapStateToProps = (state) => ({
  fact: state.api.fact,
  actionMode: state.toolbar.mode,

  list_show: state.list_show
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);