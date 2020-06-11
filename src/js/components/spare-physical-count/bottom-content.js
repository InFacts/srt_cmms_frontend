import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TableStatus from '../common/table-status';
import Table from '../common/table';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';

import PopupModalNoPart from '../common/popup-modal-nopart'

import '../../../css/table.css';

const BottomContent = (props) => {

  const [lineNumber, setLineNumber] = useState('');

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  const sumTotalLineItem = (unit_count, per_unit_price, description) => {
    let sumValueInLineItem = 0;
    sumValueInLineItem = unit_count * per_unit_price
    if (description !== '') {
      var conventToString = sumValueInLineItem.toString();
      var findDot = conventToString.indexOf(".")
      if (findDot == -1) {
        conventToString = conventToString + ".00"
        return conventToString;
      }
      else {
        conventToString = conventToString.slice(0, findDot + 3)
        var addOneDot = conventToString.length - findDot;
        if (addOneDot === 2) {
          return conventToString + "0";
        }
        else {
          return conventToString;
        }
      }
    } else {
      return '';
    }
  }

  const sumTotal = (list_show) => {
    var sumTotal = 0;
    list_show.map(function (list, index) {
      var sum = 0;
      sum = list.unit_count * list.per_unit_price;
      sumTotal = sumTotal + sum;
      // return sumTotal
    })
    var s = sumTotal.toString();
    var n = s.indexOf(".")
    if (n == -1) {
      s = s + ".00"
      return s;
    }
    else {
      s = s.slice(0, n + 3)
      return s;
    }
  }

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

  // For Down File in Attactment by Nuk
  const HandleDownload = () => {
    axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/1/download/1`,
      { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((response) => {
        console.log("response", response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log("url", url)
        const link = document.createElement('a');
        console.log("link", link)
        link.href = url;
        link.setAttribute('download', 'Screen Shot 2563-05-28 at 20.11.15.png');
        document.body.appendChild(link);
        link.click();
      }).catch(function (err) {
        console.log(err);
      })
  };

  // const HandleUpLoad = () => {
  //   console.log("<<<<<<")
  //   const data = {
  //     file: values.file
  //   }
  //   axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/1`, data,
  //     { headers: { "x-access-token": localStorage.getItem('token_auth') } })
  //     .then((res) => {
  //       console.log("response", res)
  //     }).catch(function (err) {
  //       console.log(err);
  //     })
  // };

  const HandleDeleteFile = () => {
    setFieldValue('file', [], false);
  };

  return (
    <div id="blackground-gray">
      <div className="container_12 clearfix">
        <div className="container_12 ">

          <div id="listItem_content" className="tabcontent">
            <div className="container_12 mt-1" style={{ paddingRight: "10px" }}>
              <Table line_items={values.line_items} document_type_group_id={141}
                sumTotalLineItem={sumTotalLineItem}
                validateLineNumberInternalItemIDField={validateLineNumberInternalItemIDField}
                validateLineNumberQuatityItemIDField={validateLineNumberQuatityItemIDField}
                validateLineNumberPerUnitPriceItemIDField={validateLineNumberPerUnitPriceItemIDField}
                setLineNumber={setLineNumber}
              />
            </div>

            <div className="container_12 mt-3">
              <div className="grid_1 float-right"><p className="cancel-default float-right">บาท.</p></div>
              <div className="grid_3 float-right push_0">
                <input type="text" className="cancel-default" value={sumTotal(values.line_items)} disabled="disabled"></input>
              </div>
              <div className="grid_2 float-right push_0"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
            </div>
            <div className="container_12">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="6"
                  disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                  searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart"
                />
              </div>
            </div>
          </div>

          <div id="attachment_content" className="tabcontent">
            <Files name="file[0].filename" desrciptionFiles={props.actionMode === TOOLBAR_MODE.SEARCH ? values.desrciption_files
              : values.file}
              desrciptionFilesLength={props.actionMode === TOOLBAR_MODE.SEARCH ? values.desrciption_files_length
                : values.file.length}
              disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
              disabledForModeAdd={props.actionMode === TOOLBAR_MODE.ADD}
              HandleDownload={HandleDownload}
              HandleDeleteFile={HandleDeleteFile}
            />
          </div>

          <div id="table_status_content" className="tabcontent">
            {/* {console.log("values.step_approve", values.step_approve)} */}
            <TableStatus bodyTableStatus = {values.step_approve} />
          </div>

          {/* PopUp ค้นหาอะไหล่ MODE ADD */}
          <PopupModalNoPart keyname='line_items' lineNumber={lineNumber} />

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