import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import TextareaInput from '../common/formik-textarea-input';
// import Table from '../common/table'; เปลัี่ยน Table ให้เป็นแบบสำหรับ form นี้
import TextInput from '../common/formik-text-input'
import NumberInput from '../common/formik-number-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';

import '../../../css/table.css';

const BottomContent = () => {
  const { values, errors, touched, setFieldValue} = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);

  const validateUomItemmasterDataIDField = (fieldName, uom_id) => {
    if (!uom_id) {
      return 'Required'
    }
    setFieldValue(fieldName, uom_id, false);
    let uoms = fact['unit-of-measures'].items;
    let uom = uoms.find(uom => `${uom.uom_id}` === `${uom_id}`); // Returns undefined if not found
    setFieldValue("uom_name", uom.name, false);
  };
  const validateUomIDField = (...args) => validateUomItemmasterDataIDField("uom_id", ...args);


  const validateItemMasterdataField = (fieldName, name) => {
    if (!name) {
      return 'Required'
    }
    setFieldValue(fieldName, name, false);
  };
  const validateMinimumOrderQuantityField = (...args) => validateItemMasterdataField("minimum_order_quantity", ...args);
  const validateLeadTimeField = (...args) => validateItemMasterdataField("lead_time", ...args);
  const validateToleranceTimeField = (...args) => validateItemMasterdataField("tolerance_time", ...args);
  const validateActiveField = (...args) => validateItemMasterdataField("active", ...args);

  const validateQuantityRequiredField = (...args) => validateItemMasterdataField("quantity_required", ...args);
  const validateQuantityLowestField = (...args) => validateItemMasterdataField("quantity_lowest", ...args);
  const validateQuantityHighestField = (...args) => validateItemMasterdataField("quantity_highest", ...args);

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id="blackground-gray">
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 ">
          {/* General Tab */}
          <div id="general_content" className="tabcontent">
            <div className="container_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อย่อหน่วยนับ </p>
              </div>
              <div className="grid_3 pull_1">
                <SelectNoChildrenInput name="uom_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateUomIDField} cssStyle={{ left: "-160px", top: "10px" }}>
                  <option value=''></option>
                  {fact['unit-of-measures'].items.map((list_uoms) => (
                    list_uoms.uom_id === values.uom_id
                      ?
                      <option value={list_uoms.uom_id} key={list_uoms.uom_id} selected> {list_uoms.abbreviation} </option>
                      :
                      <option value={list_uoms.uom_id} key={list_uoms.uom_id}> {list_uoms.abbreviation} </option>
                  ))}
                </SelectNoChildrenInput>
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">ขั้นต่ำการสั่งซื้อ</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={0.01} name="minimum_order_quantity" tabIndex="7" cssStyle={{ left: "60px", top: "-5px" }}
                    validate={validateMinimumOrderQuantityField}
                    disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
                <div className="grid_1 ml-0 pull_0">
                  <p className="cancel-default"></p>
                </div>
              </div>
            </div>

            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อหน่วยนับ  </p>
              </div>
              <div className="grid_3 pull_1">
                <TextInput name='uom_name' disabled tabIndex="1" />
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">Lead Time</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={1} name="lead_time" tabIndex="7" validate={validateLeadTimeField} cssStyle={{ left: "60px", top: "-5px" }}
                    disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
                <div className="grid_1">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            <div className="container_12">
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">Tolerance Days</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={1} name="tolerance_time" tabIndex="7"
                    validate={validateToleranceTimeField} cssStyle={{ left: "60px", top: "-5px" }}
                    disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
                <div className="grid_1">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            <div className="container_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">สถานะอะไหล่ </p>
              </div>
              <div className="grid_3 pull_1">
                <SelectNoChildrenInput name="active" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  validate={validateActiveField} cssStyle={{ left: "-160px", top: "10px" }}>
                  <option value=''></option>
                  {values.active === 0
                    ?
                    <>
                      <option value='0' selected>ปิดการใช้งาน</option>
                      <option value='1'>เปิดการใช้งาน</option>
                    </>
                    :
                    <>
                      <option value='0'>ปิดการใช้งาน</option>
                      <option value='1' selected>เปิดการใช้งาน</option>
                    </>
                  }
                </SelectNoChildrenInput>
              </div>
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">ประเภทบัญชี</p>
                </div>
                <div className="grid_2">
                  <TextInput name="accounting_type"
                    disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="2" />
                </div>
                <div className="grid_1">
                  <p className="cancel-default"></p>
                </div>
              </div>
            </div>

            <div className="container_12 mt-3">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="6"
                  disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
            </div>
          </div>

          {/* Warehouse Tab  */}
          <div id="warehouse_content" className="tabcontent">
            <div className="container_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default" style={{ textDecoration: "underline" }}>จำนวนในคลัง</p>
              </div>
              <div className="grid_2 pull_0"></div>
              <div className="grid_1 ml-0 pull_0"></div>
            </div>

            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">จำนวนที่ต้องการ</p>
              </div>
              <div className="grid_2 pull_0">
                <NumberInput step={0.01} name="quantity_required" tabIndex="7"
                  validate={validateQuantityRequiredField} cssStyle={{ left: "60px", top: "-5px" }}
                  disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
              <div className="grid_1 ml-0 pull_0"></div>
            </div>

            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">จำนวนต่ำสุด</p>
              </div>
              <div className="grid_2 pull_0">
                <NumberInput step={0.01} name="quantity_lowest" tabIndex="7"
                  validate={validateQuantityLowestField} cssStyle={{ left: "60px", top: "-5px" }}
                  disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
              <div className="grid_1 ml-0 pull_0">
              </div>
            </div>

            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">จำนวนสูงสุด</p>
              </div>
              <div className="grid_2 pull_0">
                <NumberInput step={0.01} name="quantity_highest" tabIndex="7"
                  validate={validateQuantityHighestField} cssStyle={{ left: "60px", top: "-5px" }}
                  disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="valuation_method" disabled>
                  {values.description
                    ?
                    <option value=''></option>
                    :
                    <option value=''>FIFO</option>
                  }
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 cancel-default float-right">
                <p className="cancel-default float-right">Valuation Method</p>
              </div>
            </div>

            <div className="container_12 mt-1" style={{ paddingRight: "px" }}>
              <table className="table-many-column">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่คลัง</th>
                    <th className="font" style={{ minWidth: "290px" }}>ชื่อคลัง</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>คงคลัง</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>รอส่งมอบ</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>ระหว่างการจัดซื้อ</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>รวมทั้งสิ้น</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                    {/* <th className="font blue text-center" style={{ minWidth: "80px" }}>ของเสีย</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ส่งซ่อม</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ของเก่าพร้อมใช้งาน</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ซาก</th> */}
                  </tr>
                </thead>
                <tbody>
                  {values.goods_onhand.map((goods_onhand, index) => (
                    goods_onhand.warehouse_id !== 0 && goods_onhand.warehouse_id !== 999 &&
                    <tr>
                      <th className="edit-padding text-center">{index}</th>
                      <td className="edit-padding">{goods_onhand.warehouse_id}</td>
                      <td className="edit-padding">{goods_onhand.warehouse_name}</td>
                      <td className="edit-padding text-center disable">{goods_onhand.current_unit_count}</td>
                      <td className="edit-padding text-center disable">{goods_onhand.committed_unit_count}</td>
                      <td className="edit-padding text-center disable">0</td>  {/* ระหว่างจัดซื้อ */}
                      <td className="edit-padding text-center disable">{goods_onhand.current_unit_count - goods_onhand.committed_unit_count + 0}</td>  {/* รวมทั้งสิ้น */}
                      <td className="edit-padding text-center disable">{goods_onhand.item_status_description_th}</td>  {/* สถานะเอกอะไหล่ */}
                      {/* <td className="edit-padding text-center blue font-red">{goods_onhand.broken}</td>
                        <td className="edit-padding text-center blue">{goods_onhand.send_fix}</td>
                        <td className="edit-padding text-center blue">{goods_onhand.old_part}</td>
                        <td className="edit-padding text-center blue">{goods_onhand.carcass}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="container_12 mt-2" style={{ paddingRight: "px" }}>
              <button type="button" className="button-gray float-right" disabled="disabled">ตั้งเป็นคลังตั้งต้น</button>
            </div>

          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>
        </div>
      </div>
      {/* </div > */}
    </>
  )
};

export default BottomContent;