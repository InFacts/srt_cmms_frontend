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
  validatedataDocumentField,sumTotalLineItemHelper, sumTotalHelper
} from '../../helper';

import PopupModalNoPart from '../common/popup-modal-nopart'

import '../../../css/table.css';

const BottomContent = (props) => {
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({...state.token.decoded_token}), shallowEqual);
  const [lineNumber, setLineNumber] = useState('');

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  const sumTotalLineItem = (quantity, per_unit_price, description) => sumTotalLineItemHelper(quantity, per_unit_price, description);
  const sumTotal = (list_show) => sumTotalHelper(list_show);

  const validateLineNumberInternalItemIDField = (fieldName, internal_item_id, index) => {
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves

    if (values.line_items[index].internal_item_id === internal_item_id) {
      return;
    }
    if (internal_item_id === "") {
      setFieldValue(fieldName + `.description`, '', false);
      setFieldValue(fieldName + `.unit_count`, '', false);
      setFieldValue(fieldName + `.list_uoms`, [], false);
      setFieldValue(fieldName + `.uom_id`, '', false);
      setFieldValue(fieldName + `.per_unit_price`, '', false);
      return;
    }
    let items = props.fact.items.items;
    let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
    console.log(item)
    if (item) {
      setFieldValue(fieldName + `.description`, `${item.description}`, false);
      setFieldValue(fieldName + `.unit_count`, 0, false);
      setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
      setFieldValue(fieldName + `.uom_id`, item.list_uoms[0].uom_id, false);
      setFieldValue(fieldName + `.line_number`, index+1, false);
      setFieldValue(fieldName + `.item_status_id`, 1, false);
      setFieldValue(fieldName + `.per_unit_price`, 0, false);
      return;
    } else {
      return 'Invalid Number ID';
    }
  }

  const validateLineNumberQuatityItemIDField = (fieldName, unit_count, index) => {
    // internal_item_id = `${internal_item_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
    // if (values.line_items[index].unit_count === unit_count) {
    //   return;
    // }
    if (unit_count === "") {
      return;
    }

    if (unit_count !== 0) {
      setFieldValue(fieldName, unit_count, false);
      return;
    } else {
      return 'Invalid unit_count Line Item';
    }
  }

  const validateLineNumberPerUnitPriceItemIDField = (fieldName, per_unit_price, index) => {
    // internal_item_id = `${internal_item_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
    // if (values.line_items[index].per_unit_price === per_unit_price) {
    //   return;
    // }
    if (per_unit_price === "") {
      return;
    }

    if (per_unit_price !== "") {
      setFieldValue(fieldName, per_unit_price, false);
      return;
    } else {
      return 'Invalid Per Unit Price Line Item';
    }
  }
  
  const checkBooleanForEdit = (values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.FAST_TRACK )
  && (getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id) === decoded_token.id)
  return (
    <div id="blackground-gray">
      <div className="container_12 clearfix">
        <div className="container_12 ">

          <div id="listItem_content" className="tabcontent">
            <div className="container_12 mt-1" style={{ paddingRight: "10px" }}>
              <Table line_items={values.line_items} document_type_group_id={142}
                sumTotalLineItem={sumTotalLineItem}
                validateLineNumberInternalItemIDField={validateLineNumberInternalItemIDField}
                validateLineNumberQuatityItemIDField={validateLineNumberQuatityItemIDField}
                validateLineNumberPerUnitPriceItemIDField={validateLineNumberPerUnitPriceItemIDField}
                setLineNumber={setLineNumber}
                checkBooleanForEdit={checkBooleanForEdit}
              />
            </div>

            <div className="container_12 mt-3">
              <div className="grid_1 float-right"><p className="cancel-default float-right">บาท.</p></div>
              <div className="grid_3 float-right push_0">
                <input type="text" className="cancel-default" value={sumTotal(values.line_items)} disabled="disabled"></input>
              </div>
              <div className="grid_2 float-right push_0"><p className="cancel-default float-right">รวมเป็นเงิน</p></div>
            </div>
            <div className="container_12">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="6"
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
            <TableStatus bodyTableStatus = {values.step_approve} />
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