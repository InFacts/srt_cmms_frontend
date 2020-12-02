import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { shallowEqual, useSelector } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import { ExportCSV } from '../common/exportCSV';

import { useFormikContext } from 'formik';

import '../../../css/table.css';

import { changeTheam, getNumberFromEscapedString, rawLotFromQty } from '../../helper';

const BottomContent = (props) => {

  const { values, setFieldValue } = useFormikContext();
  const factItems = useSelector((state) => ({ ...state.api.fact.items }), shallowEqual);

  const returnUnitCount = (quantity, item) => {
    if (quantity < item.quantity_lowest) {
      return <td className="edit-padding text-right" style={{ color: "DarkRed" }}>{quantity}</td>
    } else if (quantity > item.quantity_highest) {
      return <td className="edit-padding text-right" style={{ color: "DarkBlue" }}>{quantity}</td>
    } else {
      return <td className="edit-padding text-right" style={{ color: "DarkGreen" }}>{quantity}</td>
    }
  }

  const handleSubDoc = (line_items, index) => {
    console.log("line_items", line_items);

    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/statistic/goods-price?warehouse_id=${getNumberFromEscapedString(values.src_warehouse_id)}&item_id=${line_items.item_id}&start_date=${values.start_date}&end_date=${values.end_date}&item_status_id=${line_items.item_status_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((res) => {
        // console.log("res.data.data.fifo", res.data.data.fifo)
        // console.log("values.line_items.splice(index + 1, 0, ...res.data.data.fifo", values.line_items.splice(index + 1, 0, ...res.data.data.fifo))
        if (res.data.data.fifo.length > 0) {
          values.line_item_shows.splice(index + 1, 0, ...rawLotFromQty(res.data.data.fifo, line_items.end_unit_count))
          console.log("values.line_item_shows", values.line_item_shows)
          setFieldValue("line_item_shows", values.line_item_shows, false);
          setFieldValue("test", true, false);
          setFieldValue(`sub${index}`, true, false);
        }
      });
  };

  return (
    <div id={changeTheam() === true ? "" : "blackground-gray"}>
      <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

        <div className="container_12 ">
          <div id="listItem_content" className="tabcontent">

            <table className="table-many-column mt-1" style={{ height: "280px", padding: "0 10px" }}>
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>ลำดับที่</th>
                  <th className="font" style={{ minWidth: "280px", maxWidth: "280px" }}>รายการสิ่งของ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่สิ่งของคงคลัง</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>สถานะ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>หน่วย</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>วันที่ผลิต</th>

                  <th className="font text-center" style={{ minWidth: "100px" }}>จำนวนเหลือ ณ วันนี้</th>
                  <th className="font text-center" style={{ minWidth: "96px" }}>รวมเป็นเงิน</th>
                  <th className="font text-center" style={{ minWidth: "96px" }}>ราคาต่อหน่วย</th>
                </tr>
              </thead>
              <tbody>
                {values.line_item_shows.map(function (line_items, index) {
                  if (values.warehouse_type_id !== 1 && values.warehouse_type_id !== 2 && values.warehouse_type_id !== 4) {
                    let items = factItems.items;
                    let item = items.find(item => `${item.item_id}` === `${line_items.item_id}`)
                    // console.log("item", item)
                    if (item) {
                      if (line_items.internal_item_id) {
                        return (
                          <tr key={index} onClick={() => !values[`sub${index}`] && handleSubDoc(line_items, index)}>
                            <th className="edit-padding text-center">{index + 1}</th>
                            <td className="edit-padding" style={{ minWidth: "280px", maxWidth: "280px" }}>{line_items.item_description}</td>
                            <td className="edit-padding">{line_items.internal_item_id}</td>
                            <td className="edit-padding">{line_items.item_status_description_th}</td>
                            <td className="edit-padding text-center">{line_items.uom_name}</td>

                            <td className="edit-padding text-center">-</td>  {/* วันที่ผลิต */}

                            <td className="edit-padding text-right">{line_items.quantity}</td>

                            <td className="edit-padding text-right">{line_items.total}</td>

                            <td className="edit-padding text-right">{line_items.per_unit_price}</td>
                          </tr>
                        )
                      } else {
                        return (
                          <tr key={index}>
                            <th className="edit-padding blue text-center">{index + 1}</th>
                            <td className="edit-padding blue" style={{ minWidth: "280px", maxWidth: "280px" }}>Lot: {line_items.item_inventory_journal_id} {item.description}</td>
                            <td className="edit-padding blue">{item.internal_item_id}</td>
                            <td className="edit-padding blue">-</td>
                            <td className="edit-padding blue text-center">{item.list_uoms[0].name}</td>

                            <td className="edit-padding blue text-center">{line_items.date_manufactured ? line_items.date_manufactured.split("T")[0] : "-"}</td>  {/* วันที่ผลิต */}

                            <td className="edit-padding blue text-right">{line_items.quantity.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>

                            <td className="edit-padding blue text-right">{(line_items.quantity * line_items.per_unit_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>

                            <td className="edit-padding blue text-right">{line_items.per_unit_price.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                          </tr>
                        )
                      }
                    }
                  } else { //ถ้าไม่เป็นคลังของตอน
                    let items = factItems.items;
                    let item = items.find(item => `${item.item_id}` === `${line_items.item_id}`)
                    if (item) {
                      if (line_items.internal_item_id) {
                        return (
                          <tr key={index}>
                            <th className="edit-padding text-center">{index + 1}</th>
                            <td className="edit-padding">{line_items.item_description}</td>
                            <td className="edit-padding">{line_items.internal_item_id}</td>
                            <td className="edit-padding text-center">{line_items.item_status_description_th}</td>
                            <td className="edit-padding text-center">{line_items.uom_name}</td>

                            {returnUnitCount(line_items.quantity, item)}

                            <td className="edit-padding text-right">{line_items.total}</td>

                            <td className="edit-padding text-right">{line_items.per_unit_price}</td>
                          </tr>
                        )
                      } else {
                        return (
                          <tr key={index}>
                            <th className="edit-padding blue text-center">{index + 1}</th>
                            <td className="edit-padding blue" style={{ minWidth: "280px", maxWidth: "280px" }}>Lot: {line_items.item_inventory_journal_id} {item.description}</td>
                            <td className="edit-padding blue">{item.internal_item_id}</td>
                            <td className="edit-padding blue">-</td>
                            <td className="edit-padding blue text-center">{item.list_uoms[0].name}</td>

                            <td className="edit-padding blue text-center">{line_items.date_manufactured ? line_items.date_manufactured.split("T")[0] : "-"}</td>  {/* วันที่ผลิต */}

                            <td className="edit-padding blue text-right">{line_items.quantity.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>

                            <td className="edit-padding blue text-right">{(line_items.quantity * line_items.per_unit_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>

                            <td className="edit-padding blue text-right">{line_items.per_unit_price.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                          </tr>
                        )
                      }
                    }
                  }
                })}
              </tbody>
            </table>

            <div className="grid_12">
              <p style={{ fontSize: "18px" }}>* หมายเหตุ: <span style={{ color: "DarkRed" }}>สีแดง: ของต่ำกว่าเกณฑ์</span>, <span style={{ color: "DarkBlue" }}>สีน้ำเงิน: ของมากกว่าเกณฑ์</span>, <span style={{ color: "DarkGreen" }}>สีเขียว: ของอยู่ในเกณฑ์</span>, สีดำ: ของในคลังของตอน</p>

              <div className="float-right">
                <ExportCSV csvData={values.line_item_shows} fileName="ส.1" />
              </div>
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