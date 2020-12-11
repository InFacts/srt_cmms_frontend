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

  const getInformation = (index) => new Promise((resolve, reject) => {
    axios.get("statistic/goods-price", {
      baseURL: `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/`,
      params: {
        warehouse_id: getNumberFromEscapedString(values.src_warehouse_id),
        item_id: values.line_item_shows[index].item_id,
        end_date: `${values.end_date}`,
        item_status_id: `${values.line_item_shows[index].item_status_id}`,
      },
      headers: {
        "x-access-token": localStorage.getItem('token_auth')
      }
    })
      .then((res) => {
        console.log("res.data.data.fifo", res)
        if (res.data.data.fifo.length > 0) {
          const listFifo = rawLotFromQty(res.data.data.fifo, values.line_item_shows[index].end_unit_count);

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
      console.log("selectedItemObject", selectedItemObject)
      const weavedArr = []
      values.line_item_shows.forEach((ele, index) => {
        weavedArr.push(ele)
        if (values.selectedIndex.includes(index)) {
          weavedArr.push(...selectedItemObject[index])
        }
      })
      // console.log("weavedArr", weavedArr)
      setFieldValue("line_item_shows_pdf", weavedArr, false);

    })
  }, [values.selectedIndex])

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
                  let items = factItems.items;
                  let item = items.find(item => `${item.item_id}` === `${line_items.item_id}`)
                  if (item) {
                    return (
                      <>
                        <tr key={index} onClick={() => {
                          values.selectedIndex.includes(index) ?
                            setFieldValue("selectedIndex", [...values.selectedIndex], false) :
                            setFieldValue("selectedIndex", [...values.selectedIndex, index], false)
                        }}>
                          <th className="edit-padding text-center">{index + 1}</th>
                          <td className="edit-padding" style={{ minWidth: "280px", maxWidth: "280px" }}>{line_items.item_description}</td>
                          <td className="edit-padding">{line_items.internal_item_id}</td>
                          <td className="edit-padding">{line_items.item_status_description_th}</td>
                          <td className="edit-padding text-center">{line_items.uom_name}</td>

                          <td className="edit-padding text-center">-</td>  {/* วันที่ผลิต */}

                          {
                            values.warehouse_type_id !== 1 && values.warehouse_type_id !== 2 && values.warehouse_type_id !== 4 ?
                              <td className="edit-padding text-right">{line_items.quantity}</td>
                              :
                              returnUnitCount(line_items.quantity, item)
                          }

                          <td className="edit-padding text-right">{line_items.total}</td>

                          <td className="edit-padding text-right">{line_items.per_unit_price}</td>
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
                              <tr key={index}>
                                <th className="edit-padding text-right blue">{index + 1}.{subIndex + 1}</th>
                                <td className="edit-padding blue" style={{ minWidth: "280px", maxWidth: "280px" }}>{item.description}</td>
                                <td className="edit-padding blue">{item.internal_item_id}</td>
                                <td className="edit-padding blue">{values.line_item_shows[index].item_status_description_th}</td>
                                <td className="edit-padding blue text-center">{values.line_item_shows[index].uom_name}</td>

                                <td className="edit-padding blue text-center">{lotFifo.date_manufactured && lotFifo.date_manufactured.split("T")[0]}</td>
                                <td className="edit-padding blue text-right">{lotFifo.quantity}</td>
                                <td className="edit-padding blue text-right">{lotFifo.quantity * lotFifo.per_unit_price}</td>
                                <td className="edit-padding blue text-right">{lotFifo.per_unit_price}</td>
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

            <div className="grid_12">
              <p style={{ fontSize: "18px" }}>* หมายเหตุ: <span style={{ color: "DarkRed" }}>
                สีแดง: ของต่ำกว่าเกณฑ์</span>, <span style={{ color: "DarkBlue" }}>สีน้ำเงิน: ของมากกว่าเกณฑ์</span>,
                <span style={{ color: "DarkGreen" }}>สีเขียว: ของอยู่ในเกณฑ์</span>, สีดำ: ของในคลังของตอน</p>

              <div className="float-right">
                <ExportCSV csvData={values.line_item_shows_pdf} fileName="ส.1" />
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