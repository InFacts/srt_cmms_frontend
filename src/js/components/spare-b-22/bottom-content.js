import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { shallowEqual, useSelector } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TableStatus from '../common/table-status';
import TableHaveStock from '../common/table-have-stock';

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { ExportCSV } from '../common/exportCSV';

import '../../../css/table.css';

import { fetchGoodsOnhandData, getNumberFromEscapedString, changeTheam, rawLotFromQty } from '../../helper';

const BottomContent = (props) => {

  const { values, setFieldValue } = useFormikContext();
  const factItems = useSelector((state) => ({ ...state.api.fact.items }), shallowEqual);

  const setValuesForCSV = (line_items) => {
    let new_line_items = [];
    let new_line_items_pdf = [];
    // console.log("line_items", line_items)
    line_items.map((line_item) => {
      // console.log("line_item", line_item)
      let items = factItems.items;
      let item = items.find(item => `${item.item_id}` === `${line_item.item_id}`)
      // console.log("item", item)
      if (item) {
        if (line_item.internal_item_id) {
          // console.log(">>>>>>>>>>>>>1")
          new_line_items.push({
            "warehouse_name": line_item.warehouse_name,
            "internal_item_id": line_item.internal_item_id,
            "item_description": line_item.item_description,
            "item_status_description_th": line_item.item_status_description_th,
            "หน่วย": line_item.uom_name,
            "จำนวนเหลือเดือนก่อน": line_item.begin_unit_count ? line_item.begin_unit_count : "0.00",
            "ราคาเดือนก่อน": line_item.begin_total_price ? line_item.begin_total_price : "0.00",

            "จำนวนรับเดือนนี้": line_item.state_in_unit_count ? line_item.state_in_unit_count : "0.00",
            "ราคารับเดือนนี้": line_item.state_in_total_price ? line_item.state_in_total_price : "0.00",

            "จำนวนจ่ายเดือนนี้": line_item.state_out_unit_count ? line_item.state_out_unit_count : "0.00",
            "ราคาจ่ายเดือนนี้": line_item.state_out_total_price ? line_item.state_out_total_price : "0.00",

            "จำนวนคงเหลือ": line_item.end_unit_count ? line_item.end_unit_count : "0.00",
            "ราคาคงเหลือ": line_item.end_total_price ? line_item.end_total_price : "0.00",

            "ประเภทบัญชี": item.accounting_type
          })

          new_line_items_pdf.push({
            "warehouse_name": line_item.warehouse_name,
            "internal_item_id": line_item.internal_item_id,
            "item_description": line_item.item_description,
            "item_status_description_th": line_item.item_status_description_th,

            "uom_name": line_item.uom_name,
            "begin_unit_count": line_item.begin_unit_count ? line_item.begin_unit_count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00",
            "begin_state_in_total_price": line_item.begin_total_price ? line_item.begin_total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00",

            "state_in_unit_count": line_item.state_in_unit_count ? line_item.state_in_unit_count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00",
            "end_state_in_total_price": line_item.state_in_total_price ? line_item.state_in_total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00",

            "state_out_unit_count": line_item.state_out_unit_count ? line_item.state_out_unit_count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00",
            "end_state_out_total_price": line_item.state_out_total_price ? line_item.state_out_total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00",

            "ending_unit_count": line_item.end_unit_count ? line_item.end_unit_count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00",
            "ending_unit_count_total": line_item.end_total_price ? line_item.end_total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00",

            "accounting_type": item.accounting_type
          })

        } else {
          // console.log(">>>>>>>>>>>>2")
          new_line_items.push({
            "item_id": line_item.item_id,
            "date_manufactured": line_item.date_manufactured ? line_item.date_manufactured.split("T")[0] : '-',
            "warehouse_name": line_item.warehouse_name,
            "internal_item_id": item.internal_item_id,
            "item_description": item.description,
            "หน่วย": item.list_uoms[0].name,
            "Lot": line_item.item_inventory_journal_id,
            "price": line_item.per_unit_price,
            "quality": line_item.quantity,
          });

          new_line_items_pdf.push({
            "item_id": line_item.item_id,
            "date_manufactured": line_item.date_manufactured ? line_item.date_manufactured.split("T")[0] : '-',
            "warehouse_name": line_item.warehouse_name,
            "internal_item_id": item.internal_item_id,
            "item_description": item.description,

            "uom_name": item.list_uoms[0].name,
            "Lot": line_item.item_inventory_journal_id,
            "price": line_item.per_unit_price,
            "quality": line_item.quantity,
          })

        }
      }
    });
    // console.log("new_line_items_pdf", new_line_items_pdf)
    setFieldValue("new_line_items", new_line_items, false);
    setFieldValue("new_line_items_pdf", new_line_items_pdf, false);
    setFieldValue("test", false, false);
  }

  useEffect(() => {
    setValuesForCSV(values.line_items_pdf)
  }, [values.line_items, factItems.items, values.test, values.line_items_pdf])

  const getInformation = (index) => new Promise((resolve, reject) => {
    axios.get("statistic/goods-price", {
      baseURL: `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/`,
      params: {
        warehouse_id: getNumberFromEscapedString(values.src_warehouse_id),
        item_id: values.line_items[index].item_id,
        end_date: `${values.end_date}`,
        item_status_id: `${values.line_items[index].item_status_id}`,
      },
      headers: {
        "x-access-token": localStorage.getItem('token_auth')
      }
    })
      .then((res) => {
        console.log("res.data.data.fifo", res)
        if (res.data.data.fifo.length > 0) {
          const listFifo = rawLotFromQty(res.data.data.fifo, values.line_items[index].end_unit_count);

          return resolve([index, listFifo])
        }
      });
  });

  const [itemData, setItemData] = useState({})

  useEffect(() => {
    // When selected values changes only when selected changes
    // Easy version:
    // we query everything again
    // Hard version:
    // we query only things we don't have

    // We make promises then resolve for each index that was selected
    // TODO make it query only ones we dont have
    Promise.all(values.selectedIndex.map((index) => {
      return getInformation(index)
    })).then((resolvedInformationArr) => {
      const selectedItemObject = {}
      resolvedInformationArr.forEach(([index, arr]) => {
        selectedItemObject["" + index] = arr
      })
      setItemData(selectedItemObject)
      // console.log("selectedItemObject", selectedItemObject)
      const weavedArr = []
      values.line_items.forEach((ele, index) => {
        weavedArr.push(ele)
        if (values.selectedIndex.includes(index)) {
          weavedArr.push(...selectedItemObject[index])
        }
      })
      console.log("weavedArr", weavedArr)
      setFieldValue("line_items_pdf", weavedArr, false);

    })
  }, [values.line_items, values.selectedIndex])

  return (
    <div id={changeTheam() === true ? "" : "blackground-gray"}>
      <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

        <div className="grid_12 ">
          <div id="listItem_content" className="tabcontent">

            <table className="table-many-column mt-1" style={{ height: "auto", padding: "0 10px" }}>
              <thead>
                <tr>
                  <th className="font text-center" rowspan="2" style={{ minWidth: "30px", verticalAlign: 'middle' }}>ลำดับ</th>
                  <th className="font text-center" rowspan="2" style={{ minWidth: "380px", verticalAlign: 'middle' }}>รายการ</th>
                  <th className="font text-center" rowspan="2" style={{ minWidth: "80px", verticalAlign: 'middle' }}>หน่วย</th>

                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>เหลือเดือนก่อน</th>
                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>รับเดือนนี้</th>

                  {/* <th className="font text-center" rowspan="2" style={{ minWidth: "80px", verticalAlign: 'middle' }}>รับจาก</th> */}

                  {/* <th className="font text-center" style={{ minWidth: "80px" }}>ใบส่งของ</th> */}
                  {/* <th className="font text-center" style={{ minWidth: "80px" }}>ฎีกาเบิก</th> */}

                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>จ่ายเดือนนี้</th>
                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>คงเหลือ</th>

                  {/* <th className="font text-center" style={{ minWidth: "80px" }}>จ่ายให้ใคร</th> */}
                  <th className="font text-center" style={{ minWidth: "80px" }}>ประเภทบัญชี</th>
                </tr>
                <tr>
                  <th className="font text-center" style={{ minWidth: "40px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>ราคา</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>ราคา</th>

                  {/* <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่/ลงวันที่</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่/ลงวันที่</th> */}

                  <th className="font text-center" style={{ minWidth: "40px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>ราคา</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>ราคา</th>

                  {/* <th className="font text-center" style={{ minWidth: "80px" }}>ใบส่งเลขที่</th> */}
                  <th className="font text-center" style={{ minWidth: "80px" }}>๒๐๓๑๐๕๑</th>

                </tr>
              </thead>
              <tbody>
                {values.line_items.map(function (line_items, index) {
                  let items = factItems.items;
                  let item = items.find(item => `${item.item_id}` === `${line_items.item_id}`)
                  // console.log("item", item)
                  if (item) {
                    // if (line_items.internal_item_id) {
                    return (
                      <>
                        <tr key={index} onClick={() => {
                          values.selectedIndex.includes(index) ?
                            setFieldValue("selectedIndex", [...values.selectedIndex], false) :
                            setFieldValue("selectedIndex", [...values.selectedIndex, index], false)
                        }}>
                          <th className="edit-padding text-center">{index + 1}</th>
                          <td className="edit-padding" style={{ maxWidth: "400px" }}>{line_items.internal_item_id} - {line_items.item_description}</td>
                          <td className="edit-padding text-center">{line_items.uom_name}</td>

                          <td className="edit-padding text-right">
                            {line_items.begin_unit_count ? line_items.begin_unit_count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00"}
                          </td> {/* เหลือเดือนก่อน */}
                          <td className="edit-padding text-right">
                            {line_items.begin_total_price ? line_items.begin_total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00"}
                          </td>

                          <td className="edit-padding text-right">
                            {line_items.state_in_unit_count ? line_items.state_in_unit_count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00"}
                          </td> {/* รับเดือนนี้ */}
                          <td className="edit-padding text-right">
                            {line_items.state_in_total_price ? line_items.state_in_total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00"}
                          </td>

                          <td className="edit-padding text-right">
                            {line_items.state_out_unit_count ? line_items.state_out_unit_count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00"}
                          </td> {/* จ่ายเดือนนี้ */}
                          <td className="edit-padding text-right">
                            {line_items.state_out_total_price ? line_items.state_out_total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00"}
                          </td>

                          <td className="edit-padding text-right">
                            {line_items.end_unit_count ? line_items.end_unit_count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00"}
                          </td> {/* คงเหลือ */}
                          <td className="edit-padding text-right">
                            {line_items.end_total_price ? line_items.end_total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00"}
                          </td>

                          {/* <td className="edit-padding text-right">-</td> */}
                          <td className="edit-padding text-center">{item.accounting_type}</td>
                        </tr>

                        {(() => {
                          const lotData = itemData["" + index]
                          if (!lotData) return; // No lot for this item
                          // Map you lots here!
                          // console.log("lotData", lotData)
                          return lotData.map((lotFifo, subIndex) => {
                            let items = factItems.items;
                            let item = items.find(item => `${item.item_id}` === `${lotFifo.item_id}`)
                            return (
                              <tr key={subIndex}>
                                <th className="edit-padding text-right blue">{index + 1}.{subIndex + 1}</th>
                                <td className="edit-padding blue" style={{ maxWidth: "400px" }}>{item.internal_item_id} - {item.description}</td>
                                <td className="edit-padding text-center blue">{item.list_uoms[0].name}</td>

                                <td colSpan="9" className="edit-padding blue">Lot: {lotFifo.item_inventory_journal_id} ราคา: {lotFifo.per_unit_price} จำนวน: {lotFifo.quantity} วันที่ผลิต: {lotFifo.date_manufactured && lotFifo.date_manufactured.split("T")[0]}</td>
                              </tr>
                            )
                          })
                        })()
                        }

                      </>
                    )
                  }
                })}
              </tbody>
            </table>

            <div className="float-right">
              <ExportCSV csvData={values.new_line_items} fileName="บ.22" />
            </div>

          </div>
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