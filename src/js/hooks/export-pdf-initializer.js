import { useEffect } from 'react';
import { useFormikContext, connect } from 'formik';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { handleClickExportPDF, TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import history from '../history';
import { FACTS } from '../redux/modules/api/fact';

function getRouteLocation() {
  return history.location.pathname;
}
const useExportPdfInitializer = () => {
  const dispatch = useDispatch();
  const toolbar = useSelector((state) => ({ ...state.toolbar }));
  const { values, submitForm, validateForm, setFieldValue, setErrors } = useFormikContext();

  const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
  const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);

  const factRecvAccidentFrom = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_RECV_ACCIDENT_FROM] }), shallowEqual);
  const factAccidentCause = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_ACCIDENT_CAUSE] }), shallowEqual);
  const factServiceMethod = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_SERVICE_METHOD] }), shallowEqual);
  const factSystemTypeGroup = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_SYSTEM_TYPE_GROUP] }), shallowEqual);
  const factSystemType = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_SYSTEM_TYPE] }), shallowEqual);
  const factHardwareType = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_HARDWARE_TYPE] }), shallowEqual);
  const factCarType = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_CAR_TYPE] }), shallowEqual);
  const factCaseType = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_CASE_TYPE] }), shallowEqual);
  const factInterrupt = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_INTERRUPT] }), shallowEqual);
  const factPosition = useSelector((state) => ({ ...state.api.fact[FACTS.POSITION] }), shallowEqual);


  // Handle Toolbar Mode
  useEffect(() => {
    // let document_id = values.src_warehouse_id;
    let document_item = values.internal_document_id;
    let document_item_list = values.line_items;
    // console.log(values)
    let routeLocation = getRouteLocation();
    // console.log(routeLocation)

    //<<<======== FOR Document ========>>>>>>
    if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.EXPORT_PDF] && document_item) {
      if (routeLocation === '/pmt-ss-101') {
        console.log(">>>>>>>>>>>>", values)
        let car_type_id = "";
        let system_type_group_id = "";
        let system_type_id = "";
        let hardware_type_id = "";

        let District = "";

        let service_method_id = "";
        let interrupt_id = "";
        let fixer_position_id = "";
        let auditor_position_id = "";
        let member_1_position_id = "";
        let member_2_position_id = "";
        let member_3_position_id = "";

        factCarType.items.map((factCarType) => {
          if (values.car_type_id === factCarType.car_id) {
            car_type_id = factCarType.car_type;
          }
        });

        factSystemTypeGroup.items.map((systemTypeGroup) => {
          if (values.system_type_group_id === systemTypeGroup.system_type_group_id) {
            system_type_group_id = systemTypeGroup.system_type_group;
          }
        })

        factSystemType.items.map((factSystemType) => {
          if (factSystemType.system_type_id === values.system_type_id) {
            system_type_id = factSystemType.system_type
          }
        })

        factHardwareType.items.map((factHardwareType) => {
          if (factHardwareType.hardware_type_id === values.hardware_type_id) {
            hardware_type_id = factHardwareType.abbreviation + "-" + factHardwareType.hardware_type
          }
        })

        factServiceMethod.items.map((factServiceMethod) => {
          if (factServiceMethod.sm_id === values.service_method_id) {
            service_method_id = factServiceMethod.sm_method_type
          }
        })
        factInterrupt.items.map((factInterrupt) => {
          if (values.interrupt_id === factInterrupt.interrupt_id) {
            interrupt_id = factInterrupt.interrupt_id + "-" + factInterrupt.interrupt_type
          }
        })

        factPosition.items.map((position) => {
          if (values.auditor_position_id === position.position_id) {
            auditor_position_id = position.name
          }
        })
        factPosition.items.map((position) => {
          if (values.fixer_position_id === position.position_id) {
            fixer_position_id = position.name
          }
        })
        factPosition.items.map((position) => {
          if (values.member_1_position_id === position.position_id) {
            member_1_position_id = position.name
          }
        })
        factPosition.items.map((position) => {
          if (values.member_2_position_id === position.position_id) {
            member_2_position_id = position.name
          }
        })
        factPosition.items.map((position) => {
          if (values.member_3_position_id === position.position_id) {
            member_3_position_id = position.name
          }
        })


        let node = "";
        let station = "";

        factDistricts.items.map(function ({ district_id, name, division_id }) {
          if (values.location_district_id == district_id) {
            District = name
          }
        })
        factNodes.items.map(function ({ node_id, name, district_id }) {
          if (values.location_node_id == node_id) {
            node = name
          }
        })

        factStations.items.map(function ({ station_id, name, node_id }) {
          if (values.location_station_id == station_id) {
            station = name
          }
        })

        let data = [];
        let p = 1
        let dateTimeParts = values.accident_on.split('T')
        let timeParts = dateTimeParts[1]
        let dateParts = dateTimeParts[0].split('-')
        let day = Number(dateParts[0]) + 543
        let mount = dateParts[1]
        let year = dateParts[2]

        let dateTimeParts2 = values.request_on.split('T')
        let timeParts2 = dateTimeParts2[1]
        let dateParts2 = dateTimeParts2[0].split('-')
        let day2 = Number(dateParts2[0]) + 543
        let mount2 = dateParts2[1]
        let year2 = dateParts2[2]


        let dateTimeParts3 = values.departed_on.split('T')
        let timeParts3 = dateTimeParts3[1]
        let dateParts3 = dateTimeParts3[0].split('-')
        let day3 = Number(dateParts3[0]) + 543
        let mount3 = dateParts3[1]
        let year3 = dateParts3[2]

        let dateTimeParts4 = values.arrived_on.split('T')
        let timeParts4 = dateTimeParts4[1]
        let dateParts4 = dateTimeParts4[0].split('-')
        let day4 = Number(dateParts4[0]) + 543
        let mount4 = dateParts4[1]
        let year4 = dateParts4[2]


        let dateTimeParts5 = values.finished_on.split('T')
        let timeParts5 = dateTimeParts5[1]
        let dateParts5 = dateTimeParts5[0].split('-')
        let day5 = Number(dateParts5[0]) + 543
        let mount5 = dateParts5[1]
        let year5 = dateParts5[2]

        values.loss_line_items.map(lineItem => {
          data.push({
            "item_id": p,
            "description": lineItem.description ? lineItem.description : "-",
            "internal_item_id": lineItem.internal_item_id ? lineItem.internal_item_id : "-",
            "unit": lineItem.uom_name ? lineItem.uom_name : "-",
            "price_quantity": lineItem.price ? lineItem.price : "-",
            "quantity": lineItem.quantity ? lineItem.quantity : "-",
            "price": " ",
            "type": " "
          });
          p = p + 1;
        })

        const data_json = {
          "HeadersTilte": "สส.101",
          "CreateOn": values.created_on,
          "Content": {
            "NoDocument": values.document_id,
            "NoInternal": values.internal_document_id,
            "District": District,
            "AccidentName": values.accident_name,
            "AccidentOn": values.accident_on,
            "AccidentOnTimeParts": timeParts,
            "AccidentOnDay": day,
            "AccidentOnMount": mount,
            "AccidentOnYear": year,




            "RequesstOn": values.request_on,
            "RequesstOnTimeParts": timeParts2,
            "RequesstOnDay": day2,
            "RequesstOnMount": mount2,
            "RequesstOnYear": year2,



            "DepartedOn": values.departed_on,
            "DepartedOnTimeParts": timeParts3,
            "DepartedOnDay": day3,
            "DepartedOnMount": mount3,
            "DepartedOnYear": year3,


            "ArrivedOn": values.arrived_on,
            "ArrivedOnTimeParts": timeParts4,
            "ArrivedOnDay": day4,
            "ArrivedOnMount": mount4,
            "ArrivedOnYear": year4,



            "FinishedOn": values.finished_on,
            "FinishedOnTimeParts": timeParts5,
            "FinishedOnDay": day5,
            "FinishedOnMount": mount5,
            "FinishedOnYear": year5,

            "A": "",
            "B": "",
            "C": "",
            "D": "",
            "E": "",
            "F": "",
            "G": "",
            "H": "",
            "I": "",

            "Station": node + "/" + station,

            "HardwareType": hardware_type_id,
            "LocationDetail": values.location_detail,
            "summary_cause_condition": values.summary_cause_condition,
            "cargo_id": values.cargo_id,
            "total_fail_time": values.total_fail_time,
            "service_method_id": service_method_id,
            "service_method_desc": values.service_method_desc,
            "interrupt_id": interrupt_id,
            "auditor_name": values.auditor_name,
            "auditor_position_id": auditor_position_id,
            "fixer_name": values.fixer_name,
            "fixer_position_id": fixer_position_id,
            "member_1": values.member_1,
            "member_1_position_id": member_1_position_id,
            "member_2": values.member_2,
            "member_2_position_id": member_2_position_id,
            "member_3": values.member_3,
            "member_3_position_id": member_3_position_id,
            "remark": values.remark,
            "RequestBy": values.request_by,
            "RecvAccidentFromRecvId": values.recv_accident_from_recv_id === 1 ? "จดหมาย" : "โทรศัพท์",

            "system_type_group_id": system_type_group_id
          },
          "Headers":
          {
            "item_id": "ข้อที่",
            "description": "รายการสิ่งของ",
            "internal_item_id": "สิ่งของเลขที่",
            "unit": "หน่วย",
            "price_quantity": "เบิกจำนวน",
            "quantity": "จ่ายจำนวน",
            "price": "บาท",
            "type": "สด."
          },
          "ItemInWarehouse": data,
          "ApprovalBy": {



          }
          ,
          "Images": [],
          "Totol": "",
        }



        exportPDF(routeLocation, data_json).then(function (htmlCode) {

          // const blob = pdf(htmlCode).toBlob();
          // console.log(blob)
          // MyDocument(htmlCode)
          var w = window.open();
          w.document.write(htmlCode);
          setTimeout(() => {
            w.print();
            w.close();
          }, 500);
        })
        dispatch(handleClickExportPDF())
      } else if (routeLocation === "/pmt-all-checklist-fixed-asset") {
        exportPDF(routeLocation, values, fact).then(function (htmlCode) {
          var w = window.open();
          w.document.write(htmlCode);
          setTimeout(() => {
            w.print();
            w.close();
          }, 500);
        })
        dispatch(handleClickExportPDF())
      } else if (routeLocation === "/pmt-fixed-asset") {
        exportPDF(routeLocation, values, fact).then(function (htmlCode) {
          var w = window.open();
          w.document.write(htmlCode);
          setTimeout(() => {
            w.print();
            w.close();
          }, 500);
        })
        dispatch(handleClickExportPDF())
      } else {
        exportPDF(routeLocation, values).then(function (htmlCode) {

          var w = window.open();
          w.document.write(htmlCode);
          setTimeout(() => {
            w.print();
            w.close();
          }, 500);

        })
        dispatch(handleClickExportPDF())
      }
    } else if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.EXPORT_PDF] && document_item_list && document_item_list.length > 0 && routeLocation === "/spare-report-s-1") {
      exportPDF(routeLocation, values).then(function (htmlCode) {
        var w = window.open();
        w.document.write(htmlCode);
        setTimeout(() => {
          w.print();
          w.close();
        }, 500);
      })
      dispatch(handleClickExportPDF())
    } else if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.EXPORT_PDF] && document_item_list && document_item_list.length > 0 && routeLocation === "/spare-report-b22") {
      exportPDF(routeLocation, values).then(function (htmlCode) {
        var w = window.open();
        w.document.write(htmlCode);
        setTimeout(() => {
          w.print();
          w.close();
        }, 500);
      })
      dispatch(handleClickExportPDF())
    } else if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.EXPORT_PDF] && document_item_list && document_item_list.length > 0 && routeLocation === "/pmt-report") {
      exportPDF(routeLocation, values, fact).then(function (htmlCode) {
        var w = window.open();
        w.document.write(htmlCode);
        setTimeout(() => {
          // w.print();
          // w.close();
        }, 500);
      })
      dispatch(handleClickExportPDF())
    } else {
      dispatch(handleClickExportPDF())
    }
  }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.EXPORT_PDF]])
  return;

}
const img = "data:image/png;base64,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"
const createRowS1 = (item) =>
  `<tr class="item">
    <td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
    <td style=" text-align:left ; vertical-align: middle;">${item.description}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.internal_item_id}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.unit}</td>
    <td style=" text-align:right ; vertical-align: middle;">${item.quantity}</td>
    <td style=" text-align:right ; vertical-align: middle;">${item.total}</td>
    <td style=" text-align:right ; vertical-align: middle;">${item.per_unit_price}</td>
  </tr>`;

const createTableS1 = (head, rows) =>
  `<table cellpadding="0" cellspacing="0" >
      <tr class="heading" >
          <td  style="width: 5%; text-align:center ; vertical-align: middle;">${head.item_id}</td>
          <td  style="width: 45%; text-align:center ; vertical-align: middle;">${head.description}</td>
          <td  style="width: 10%; text-align:center ; vertical-align: middle;">${head.internal_item_id}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.unit}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.quantity}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.total}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.per_unit_price}</td>
      </tr>
      ${rows}
  </table>`;

const createHtmlS1 = (table) =>
  `<html>
    <head>
      <meta charset="utf-8">
      <style>
        @page {
          size: A4;
          margin:0 ;
        }
      .invoice-box {
            width: 210mm;
            height: 29.7cm;
            margin: 0 auto;
            margin-bottom: 0.5cm;
            border: 0.1px solid #eee;
            font-size: 16px;
            font-family: 'AngsanaUPC', 'MS Sans Serif';
        }
        .invoice-box table {
            width: 95%;
            margin: auto;
            border: 1px solid #eee;
        }
        .invoice-box table td {
            vertical-align: top;
        }
        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            border-top: 1px solid #ddd;
            font-weight: bold;
        }
        .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
        }
        .invoice-box p {
            width: 95%;
        }
        .invoice-box h2 {
            margin-top: 1cm;
            margin-right: 0;
            margin-left:0;
            margin-bottom: 0;
        }
        .invoice-box h3 {
            margin: 0;
        }
        @media print {
          html, body {
            width: 210mm;
            height: 297mm;  
            margin-bottom: 0;
            margin-left: 0;
            margin-right: 0;
            margin-top: 0;
          }
        }
        .invoice-box pp {
          margin-top: 0.3cm;
          float: right;
          margin-right: 5%;
        }
      </style>
    </head>
    <body>
      ${table}
    </body>
  </html>`;

const createPageS1 = (table, date) =>
  `<div class="invoice-box">
      <pp>ส.1</pp>
      <h2 style=" text-align:center ; vertical-align: middle;">การรถไฟแห่งประเทศไทย</h2>
      <h3 style=" text-align:center ; vertical-align: middle;">บัญชีสำรวจวัสดุสำรองใช้การซึ่งอยู่ในครอบครอง เมื่อวันที่ ${date}</h3>
      <h3 style=" text-align:center ; vertical-align: middle; margin-bottom: 0.5cm;">รหัสสังกัด 1640 ฝ่ายการอาณัติสัญญาณและโทรคมนาคม</h3>
      ${table}
  </div>`;

const createPageS1LastPage = (table, date, total) =>
  `<div class="invoice-box">
      <pp>ส.1</pp>
      <h2  style=" text-align:center ; vertical-align: middle;">การรถไฟแห่งประเทศไทย</h2>
      <h3  style=" text-align:center ; vertical-align: middle;">บัญชีสำรวจวัสดุสำรองใช้การซึ่งอยู่ในครอบครอง เมื่อวันที่ ${date}</h3>
      <h3  style=" text-align:center ; vertical-align: middle; margin-bottom: 0.5cm;">รหัสสังกัด 1640 ฝ่ายการอาณัติสัญญาณและโทรคมนาคม</h3>
      ${table}
      <p style=" text-align:right ; vertical-align: middle; ">รวมเงินประเภทบัญชี 2031515 ทั้งสิ้น ${total}</p>
      <p style=" text-align:right ; vertical-align: middle; ">รวมเงินทั้งสิ้น ${total}</p>
  </div>`;

const createCategory = (item) =>
  `<h2 style=" text-align:center ; vertical-align: middle;align-items:center">(${item})</h2>`;

const createPageS1Header = (category_group, date, source, index, img) =>
  `<div class="invoice-box">
      <br></br>
      <img src=${img} style="display: block;margin-left: auto;margin-right: auto;width:20%;" >
      <br></br>
      <div>
          <h1 style=" text-align:center ; vertical-align: middle;align-items:center">บัญชีแสดงรายการวัสดุสิ่งของคงคลัง</h1>
      </div>
      <br></br>
      <div>
          <h1 style=" text-align:center ; vertical-align: middle;align-items:center">ที่${source}</h1>
      </div>
      <div>
          <h1 style=" text-align:center ; vertical-align: middle;align-items:center">แผนก...</h1>
      </div>
      <div> 
          <h1 style=" text-align:center ; vertical-align: middle;align-items:center">ณ วันที่ ${date}</h1>
      </div>
      <br></br>
      <div>
          <h1 style=" text-align:center ; vertical-align: middle;align-items:center">คลังย่อยที่...</h1>
      </div>
      <div>
          <h1 style=" text-align:center ; vertical-align: middle;align-items:center">จำนวน ${index} รหัส</h1>
      </div>
      <div>
          ${category_group}
      </div>
  </div>`;

const createPageS1Category = (index, category) =>
  `<div class="invoice-box" style=" justify-content:center ;align-items:center">
      <h1 style=" text-align:center ; vertical-align: middle;align-items:center;margin-top: 50%;">${index}. (${category})</h1>
  </div>`;


const createHtmlS16_46 = (table) =>
  `<html>
      <head>
        <meta charset="utf-8">
        <style>
          @page {
            size: A4;
            margin:0 ;
          }
        .invoice-box {
              width: 210mm;
              height: 29.7cm;
              margin: 0 auto;
              margin-bottom: 0.5cm;
              border: 0.1px solid #eee;
              font-size: 16px;
              font-family: 'AngsanaUPC', 'MS Sans Serif'; 
          }
          .invoice-box table {
              width: 95%;
              margin: auto;
              border: 0px solid #eee;
          }
          .invoice-box table td {
              vertical-align: top;
          }
          .invoice-box table tr.heading td {
              background: #eee;
              border: 1px solid #ddd;
              font-weight: bold;
          }
          .invoice-box table tr.item td {
              border: 1px solid #eee;
          }
          .invoice-box table tr.item2 td {
              border-bottom: 0px solid #eee;
          }
          .invoice-box p {
              width: 95%;
          }
          .invoice-box h2 {
              margin-top: 1cm;
              margin-right: 0;
              margin-left:0;
              margin-bottom: 0;
          }
          .invoice-box h3 {
              margin: 0;
          }
          @media print {
            html, body {
              width: 210mm;
              height: 297mm;  
              margin-bottom: 0;
              margin-left: 0;
              margin-right: 0;
              margin-top: 0;
            }
          }
          .invoice-box pr {
            float: right;
            margin-right: 2.5%;
          }
          .invoice-box pl {
            float: left;
            margin-left: 2.5%;
          }
          .invoice-box pc {
            float: center;
          }
          .invoice-box table tr.top table td.title {
              line-height: 45px;
              color: #333;
          }
          .invoice-box pp {
              margin-top: 0.5cm;
              float: right;
              margin: 0;
              width: 15%;
          }
          .dotted{
            border-bottom: 1px dotted grey;
            margin-bottom:2px;
          }
          .invoice-box table tr.information table td {
              padding-bottom: 40px;
          }
          .left,.right{
              padding:1px 0.1em;
              background:#fff;
              float:right;
          }
          .left{
              float:left;
              clear:both;
          }
          div{
              height:1.22em;
          }
        </style>
      </head>
      <body>
        ${table}
      </body>
  </html>`;

const createRowS16_46 = (item) =>
  `<tr class="item">
    <td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.internal_item_id}</td>
    <td style=" text-align:left ; vertical-align: middle;">${item.description}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.price_quantity}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.unit}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.quantity}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.price}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.type}</td>
  </tr>`;

const createTableS16_46 = (head, rows, content, total) =>
  `<table cellpadding="0" cellspacing="0" >
      <tr class="heading">
        <td  style="width: 4%; text-align:center ; vertical-align: middle; border: 0px solid #ffffff;background:#ffffff" ></td>
        <td  style="width: 15%; text-align:center ; vertical-align: middle; border: 0px solid #ffffff;background:#ffffff"></td>
        <td  style="width: 25%; text-align:center ; vertical-align: middle; border: 0px solid #ffffff;background:#ffffff"></td>
        <td  style="width: 8%; text-align:center; vertical-align: middle;" colSpan="2">ประเภทบัญชี</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;" >รหัสความรับผิดชอบ</td>
        <td style=" text-align:center; vertical-align: middle;" >เลขที่ งทป. คสง. งกน. รอฯ</td>   
        <td style=" text-align:center; vertical-align: middle;" >รหัส</td>  
      </tr>
      <tr class="item">
        <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;"></td>
        <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;"></td>
        <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;"></td>
        <td style=" text-align:center ; vertical-align: middle;" colSpan="2">${content.AccountType}</td>
        <td style=" text-align:center ; vertical-align: middle;" >${content.ResponsibilityCode}</td>
        <td style=" text-align:center ; vertical-align: middle;">${content.Number}</td>
        <td style=" text-align:center ; vertical-align: middle;">${content.Code}</td>
      </tr>
      <tr class="heading">
        <td  style="width: 4%; text-align:center ; vertical-align: middle;"  rowspan="2">${head.item_id}</td>
        <td  style="width: 15%; text-align:center ; vertical-align: middle;" rowspan="2">${head.internal_item_id}</td>
        <td  style="width: 25%; text-align:center ; vertical-align: middle;" rowspan="2">${head.description}</td>
        <td  style="width: 8%; text-align:center; vertical-align: middle;" rowspan="2">${head.price_quantity}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.unit}</td>
        <td style=" text-align:center; vertical-align: middle;" colSpan="3">การดำเนินการ</td>    
      </tr>
      <tr class="heading" >
          <td  style="width: 7%; text-align:center; vertical-align: middle;">${head.quantity}</td>
          <td  style="width: 7%; text-align:center; vertical-align: middle;">${head.price}</td>
          <td  style="width: 7%; text-align:center; vertical-align: middle;">${head.type}</td>
      </tr>
      ${rows}
      <tr class="item">
        <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;"></td>
        <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;"></td>
        <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;"></td>
        <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;"></td>
        <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;"></td>
        <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;">รวม</td>
        <td style=" text-align:center ; vertical-align: middle;">${total}</td>
        <td style=" text-align:center ; vertical-align: middle;"></td>
      </tr>
  </table>`;

const createPageS16_46 = (table, date, content) =>
  `<div class="invoice-box">
      <pp>ส.๑๑๔๕๑/๑</pp>
      </br>
      <pp>แบบ ส.๑๖/๔๖</pp>
      </br>
      <pp>ฉบับที่๑</pp>
      <u><h2 style=" text-align:center ; vertical-align: middle;">ใบเบิกและใบส่งสิ่งของ</h2></u>

      <table>
        <tr>
          <td>
              <div class="left">เลขที่</div><div contenteditable="true" ><div class="dotted" style="width: 250px;"><label>${content.NoInternal}</label></div></div>
          </td>
          <td>
              <pr><div class="left">พัสดุส่งเลขที่</div><div contenteditable="true"><div class="dotted" style="width: 250px;"><label> </label></div></div></pr>
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
              <div class="left">ลงวันที่</div><div contenteditable="true" ><div class="dotted" style="width: 250px;"><label>${date}</label></div></div>
          </td>
          <td>
              <pr><div class="left">ลงวันที่</div><div contenteditable="true"><div class="dotted" style="width: 250px;"><label> </label></div></div></pr>
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
              <div class="left">เบิกจากงานคลังพัสดุ</div><div contenteditable="true" ><div class="dotted" style="width: 250px;"><label>${content.SourceWarehouseName}</label></div></div>
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
              <div class="left">ผู้เบิก</div><div contenteditable="true" ><div class="dotted" style="width: 400px;"><label>${content.CreatedByUserNameTh}</label></div></div>
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
              <div class="left">ให้ส่งสิ่งของไปที่</div><div contenteditable="true" ><div class="dotted" style="width: 250px;"><label>${content.DestWarehouseName}</label></div></div>
          </td>
        </tr>
      </table>

    
      ${table}

      <table>
        <tr class="item2">
          <td style="width: 40%; text-align:center ; vertical-align: middle;">
           <div class="left">ลงชื่อผู้เบิก</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div>
          </td>
          <td style="width: 40%; text-align:center ; vertical-align: middle;">
          
          </td>
          <td style="width: 40%; text-align:center ; vertical-align: middle;">
         
          </td>
        </tr>
      </table>

      <table>
        <tr class="item2">
          <td style="width: 40%; text-align:center ; vertical-align: middle;">
            <div class="left">ตำแหน่ง</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div>
          </td>
          <td style="width: 40%; text-align:center ; vertical-align: middle;">
            <div class="left">บันทึกเสนอ</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div>
          </td>
          <td style="width: 40%; text-align:center ; vertical-align: middle;">
           <div class="left">ตรวจแล้วถูกต้อง</div>
          </td>
        </tr>
      </table>

      <table>
      <tr class="item2">
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
          อนุญาตให้เบิกได้
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">

        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
        
        </td>
      </tr>
    </table>

    <table>
      <tr class="item2">
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
          <div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div>
        </td>
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
          <div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div>
        </td>
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
          <div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div>
        </td>
      </tr>
    </table>

    <table>
        <tr class="item2">
          <td style="width: 33%; text-align:center ; vertical-align: middle;">
            <div class="left">ตำแหน่ง</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div>
          </td>
          <td style="width: 33%; text-align:center ; vertical-align: middle;">
          เจ้าหน้าที่พัสดุ
          </td>
          <td style="width: 33%; text-align:center ; vertical-align: middle;">
          หัวหน้างานคลังพัสดุ
          </td>
        </tr>
      </table>


      <table>
      <tr class="item2">
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
        <div class="left">ได้รับของตามรายการข้างบนนี้ ถูกต้องแล้ว</div>
        </td>
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
        <div class="left">ส่งผ่านจ่ายได้</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div>
        </td>
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
        
        </td>
      </tr>
    </table>

    <table>
      <tr class="item2">
        <td style="width: 30%; text-align:center ; vertical-align: middle;">

        <div class="left"><div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div></div><div>ผู้รับ</div>
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
        
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
        
        </td>
      </tr>
    </table>



      <table>
        <tr class="item2">
          <td style="width: 35%; text-align:center ; vertical-align: middle;">
            <div class="left">(</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label></label></div></div>
          </td>
          <td style="width: 40%; text-align:center ; vertical-align: middle;">
              <div contenteditable="true" ><div class="dotted" style="width: 200px;"><label></label></div></div>
          </td>
          <td style="width: 40%; text-align:center ; vertical-align: middle;">   
          </td>
        </tr>
      </table>

      <table>
      <tr class="item2">
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            <div class="left">ตำแหน่ง</div><div contenteditable="true" ><div class="dotted" style="width: 200px;"><label></label></div></div>
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            แทนหัวหน้ากองจัดการพัสดุ </br> ปฎิบัติการแทน ผู้อำนวยการฝ่ายการพัสดุ
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">   
        </td>
      </tr>
    </table>


    <table>
    <tr class="item2">
      <td style="width: 60%; text-align:center ; vertical-align: middle;">
      <div class="left">หมายเหตุ ใบเบิก ๑ ชุดมี ๘ ฉบับ ฉบับที่ ๑-๗ ส่งฝ่ายการพัสดุ และ ไม่ควรเบิกเกิน ๑๒ รายการ</div>
      </td>
      <td style="width: 20%; text-align:center ; vertical-align: middle;">
        
      </td>
      <td style="width: 20%; text-align:center ; vertical-align: middle;">   
      </td>
    </tr>
  </table>



  </div>`;


const createHtmlB22 = (table) => `
<html>
  <head>
    <meta charset="utf-8">
    <style>


    @page {
        size: landscape;
        margin:0 ;
      }
    @media print {
        html, body {
            width:29.7cm;
            height: 210mm ; 
          margin-bottom: 0;
          margin-left: 0;
          margin-right: 0;
          margin-top: 0;
        }
      }
    
     .text-right {
        text-align: right;
     }

     .invoice-box {
        width:29.7cm;
        height: 210mm ;
           margin: 0 auto;
           margin-bottom: 0.5cm;
           border: 0.1px solid #ffffff;
           font-size: 16px;
           font-family: 'AngsanaUPC', 'MS Sans Serif';  
      }
      .invoice-box table {
          width: 95%;
          margin: auto;
          border: 0px solid #eee;
      }
      .invoice-box table td {
           vertical-align: top;
      }
      .invoice-box table tr.heading td {
           background: #eee;
           border: 1px solid #ddd;
           font-weight: bold;
      }
      .invoice-box table tr.item td {
           border: 1px solid #eee;
      }
      .invoice-box table tr.item2 td {
           border-bottom: 0px solid #eee;
      }
      .invoice-box p {
           width: 95%;
      }
      .invoice-box h3 {
           margin-top: 1cm;
           margin-right: 0;
           margin-left:0;
           margin-bottom: 0;
      }
      .invoice-box table tr.top table td.title {
        line-height: 45px;
        color: #333;
      }

     .invoice-box pp {
        margin-top: 0.5cm;
        float: right;
        margin: 0;
        width: 10%;
     }

     .invoice-box table tr.information table td {
        padding-bottom: 40px;
     }

   

    

    </style>
  </head>
  <body>
    ${table}
  </body>
</html>
`;

const createRowB22Page1 = (item) =>
  `<tr class="item">
<td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
<td style=" text-align:left ; vertical-align: middle;">${item.description}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.unit}</td>
<td style=" text-align:right ; vertical-align: middle;">${item.left_month_unit}</td>
<td style=" text-align:right ; vertical-align: middle;">${item.left_month_price}</td>
<td style=" text-align:right ; vertical-align: middle;">${item.get_month_unit}</td>
<td style=" text-align:right ; vertical-align: middle;">${item.get_month_price}</td>
<td style=" text-align:right ; vertical-align: middle;">${item.pay_month_unit}</td>
<td style=" text-align:right ; vertical-align: middle;">${item.pay_month_price}</td>

<td style=" text-align:right ; vertical-align: middle;">${item.ending_unit_count}</td>
<td style=" text-align:right ; vertical-align: middle;">${item.ending_unit_count_total}</td>

<td style=" text-align:center ; vertical-align: middle;">${item.type}</td>
</tr>`
  ;

const createTableB22Page1 = (head, rows) => `
  <table cellpadding="0" cellspacing="0" >
    <tr class="heading">
      <td  style="width: 4%; text-align:center ; vertical-align: middle;"  rowspan="2">${head.item_id}</td>
      <td  style="width: 26%; text-align:center ; vertical-align: middle;" rowspan="2">${head.description}</td>
      <td  style="width: 5%; text-align:center ; vertical-align: middle;" rowspan="2">${head.unit}</td>
      <td style=" text-align:center; vertical-align: middle;" colSpan="2">เหลือเดือนก่อน</td>
      <td style=" text-align:center; vertical-align: middle;" colSpan="2">รับเดือนนี้</td> 
      
      <td style=" text-align:center; vertical-align: middle;" colSpan="2">จ่ายเดือนนี้</td>
      <td style=" text-align:center; vertical-align: middle;" colSpan="2">คงเหลือ</td>
      <td  style="width: 5%; text-align:center; vertical-align: middle;" >${head.type}</td>
    </tr>
    <tr class="heading" >
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.left_month_unit}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.left_month_price}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.get_month_unit}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.get_month_price}</td>

        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.pay_month_unit}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.pay_month_price}</td>

        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.pay_month_unit}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.pay_month_price}</td>

        <td style="width: 5%; text-align:center; vertical-align: middle;" >๒๐๓๑๐๕๑</td>
    </tr>
    ${rows}
  </table>
`;

const createPageB22Page1 = (table, date) => `
<div class="invoice-box">
  <pp>แบบ บ.๒๒</pp>
  <h3  style=" text-align:center ; vertical-align: middle;">งานระบบ</h3>
  <h3  style=" text-align:center ; vertical-align: middle;margin-bottom: 0.8cm;margin: 0">บัญชีแสดงรายรับ-จ่าย สิ่งของ</h3>
  <h3  style=" text-align:center ; vertical-align: middle; margin-bottom: 0.8cm;margin: 0">ประจำเดือน ${date}</h3>
  ${table}
</div>
`;

const createHtmlS101 = (table) =>
  `<html>
      <head>
        <meta charset="utf-8">
        <style>
          @page {
            size: A4;
            margin:0 ;
          }
          .invoice-box {
              width: 210mm;
              height: 29.7cm;
              margin: 0 auto;
              margin-bottom: 0.5cm;
              border: 0.1px solid #eee;
              font-size: 16px;
              font-family: 'AngsanaUPC', 'MS Sans Serif';   
          }
          .invoice-box table {
              width: 95%;
              margin: auto;
              border: 0px solid #eee;
          }
          .invoice-box table td {
              vertical-align: top;
          }
          .invoice-box table tr.heading td {
              background: #eee;
              border: 1px solid #ddd;
              font-weight: bold;
          }
          .invoice-box table tr.item td {
              border: 1px solid #eee;
          }
          .invoice-box table tr.item2 td {
              border-bottom: 0px solid #eee;
          }
          .invoice-box p {
              width: 95%;
          }
          .invoice-box h2 {
              margin-top: 1cm;
              margin-right: 0;
              margin-left:0;
              margin-bottom: 0;
          }
          .invoice-box h3 {
              margin: 0;
          }
          @media print {
            html, body {
              width: 210mm;
              height: 297mm;  
              margin-bottom: 0;
              margin-left: 0;
              margin-right: 0;
              margin-top: 0;
            }
          }
          .invoice-box pr {
            float: right;
            margin-right: 2.5%;
          }
          .invoice-box pl {
            float: left;
            margin-left: 2.5%;
          }
          .invoice-box pc {
            float: center;
          }
          .invoice-box table tr.top table td.title {
              line-height: 45px;
              color: #333;
          }
          .invoice-box pp {
            margin-top: 0.5cm;
            float: right;
            margin: 0;
            width: 15%;
          }
          .invoice-box table tr.information table td {
              padding-bottom: 40px;
          }
          .left,.right{
            padding:1px 0.1em;
            background:#fff;
            float:right;
          }
          .left{
              float:left;
              clear:both;
          }
          div{
              height:1.22em;
          }
          .dotted{
            border-bottom: 1px dotted grey;
            margin-bottom:2px;
          }
        </style>
      </head>
      <body>
        ${table}
      </body>
  </html>`;

const createPageS101Page1 = (date, content) =>
  `<div class="invoice-box">
      <pp>แบบ สส. 101</pp>
      <h2 style=" text-align:center ; vertical-align: middle;">ฝ่ายการอาณัติสัญญาณและโทรคมนาคม การรถไฟ</h2>
    
      <table>
          <tr>
          <td>
              <pr><div class="left">เลขที่</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label>${content.NoInternal}</label></div></div></pr>
          </td>
          </tr>
      </table>

      <table>
          <tr>
          <td>
              <div class="left">รายงานการตรวจซ่อมอุปกรณ์แขวง</div><div contenteditable="true"><div class="dotted" style="width: 450px;"><label>${content.District}</label></div></div>
          </td>
          <td>
              <pr><div class="left">วันที่</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label>${date}</label></div></div></pr>
          </td>
          </tr>
      </table>


    

      <table cellpadding="0" cellspacing="0" >
          <tr class="item">
              <td class="item" style="width: 61%; text-align:left ; vertical-align: middle; border: 0px solid #ffffff;background:#ffffff" ><div class="left">(1) ชนิดของงาน <label>   ติดตั้ง</label> <input type="checkbox" /> <label>บำรุงรักษา</label> <input type="checkbox" /> <label>ซ่อมแซม</label><input type="checkbox"/></div></td>
              <td  style="width: 15%; text-align:center ; vertical-align: middle; border: 0px solid #ffffff;background:#ffffff"></td>
              <td  style="width: 6%; text-align:center; vertical-align: middle;" >เวลา</td>
              <td  style="width: 6%; text-align:center; vertical-align: middle;" >วันที่</td>
              <td style="width: 6%; text-align:center; vertical-align: middle;" >เดือน</td>   
              <td style="width: 6%; text-align:center; vertical-align: middle;" >พ.ศ.</td>  
          </tr>
          <tr class="item">
          <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;"><div class="left">(2) ได้รับแจ้งเหตุจาก</div><div contenteditable="true"><div class="dotted" style="width: 450px;"><label>${content.RequestBy}</label></div></div></td>
          <td style=" text-align:center ; vertical-align: middle; border: 0.1px solid #eee;">วันเวลาที่รับแจ้ง</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.RequesstOnTimeParts}</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.RequesstOnYear}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.RequesstOnMount}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.RequesstOnDay}</td>
      </tr>
      <tr class="item">
          <td style="padding-left: 15px; text-align:left ; vertical-align: middle; border: 0px solid #eee;"><div class="left">โดยจดหมายหรือโทรเลขที่</div><div contenteditable="true"><div class="dotted" style="width: 435px;"><label>${content.RecvAccidentFromRecvId}</label></div></div></td>
          <td style=" text-align:center ; vertical-align: middle; border: 0.1px solid #eee;">วันเวลาที่เกิดเหตุ</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.AccidentOnTimeParts}</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.AccidentOnYear}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.AccidentOnMount}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.AccidentOnDay}</td>
      </tr>
      <tr class="item">
          <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;"><div class="left">(3) งาน</div><div contenteditable="true"><div class="dotted" style="width: 450px;"><label>${content.AccidentName}</label></div></div></td>
          <td style=" text-align:center ; vertical-align: middle; border: 0.1px solid #eee;">ออกเดินทาง</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.DepartedOnTimeParts}</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.DepartedOnYear}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.DepartedOnMount}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.DepartedOnDay}</td>
      </tr>
      <tr class="item">
          <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;"><div class="left">(4) เดินทางโดย</div><div contenteditable="true"><div class="dotted" style="width: 450px;"><label>-</label></div></div></td>
          <td style=" text-align:center ; vertical-align: middle; border: 0.1px solid #eee;">เดินทางถึง</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.ArrivedOnTimeParts}</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.ArrivedOnYear}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.ArrivedOnMount}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.ArrivedOnDay}</td>
      </tr>
      <tr class="item">
          <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;"><div class="left">(5) ระบบที่ตรวจซ่อม</div></td>
          <td style=" text-align:center ; vertical-align: middle; border: 0.1px solid #eee;">วันเวลาแล้วเสร็จ</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.FinishedOnTimeParts}</td>
          <td style=" text-align:center ; vertical-align: middle;" >${content.FinishedOnYear}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.FinishedOnMount}</td>
          <td style=" text-align:center ; vertical-align: middle;">${content.FinishedOnDay}</td>
      </tr>
    </table>

    
  

      <table >
        <tr class="item2" >
          <td style="width: 1%; text-align:left ; vertical-align: middle;">
          </td>
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
              <div class="left">ก. ระบบอาณัติสัญญาณ</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.system_type_group_id === "ระบบอาณัติสัญญาณ" && content.HardwareType}</label></div></div>
          </td>
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
              <div class="left">ข. ระบบสายส่ง</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.system_type_group_id === "ระบบสายส่ง" ? content.HardwareType : "-"}</label></div></div>
          </td>
            
        </tr>
      </table>

      <table >
        <tr class="item2">
          <td style="width: 1%; text-align:left ; vertical-align: middle;">
          </td>
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
              <div class="left">ค. ระบบเครื่องกั้นถนน</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.system_type_group_id === "ระบบเครื่องกั้นถนน" ? content.HardwareType : "-"}</label></div></div>
          </td>
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
              <div class="left">ง. ระบบเครื่องทางสะดวก</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.system_type_group_id === "ระบบเครื่องทางสะดวก" ? content.HardwareType : "-"} </label></div></div>
          </td>
            
        </tr>
      </table>
      <table >
      <tr class="item2">
        <td style="width: 1%; text-align:left ; vertical-align: middle;">
        </td>
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
            <div class="left">จ. ระบบโทรศัพท์</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.system_type_group_id === "ระบบโทรศัพท์" ? content.HardwareType : "-"}</label></div></div>
        </td>
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
            <div class="left">ฉ. ระบบไฟฟ้า</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.system_type_group_id === "ระบบไฟฟ้า" ? content.HardwareType : "-"}</label></div></div>
        </td>
          
      </tr>
    </table>

    <table >
      <tr class="item2">
        <td style="width: 1%; text-align:left ; vertical-align: middle;">
        </td>
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
            <div class="left">ช. ระบบโทรพิมพ์</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.system_type_group_id === "ระบบโทรพิมพ์" ? content.HardwareType : "-"}</label></div></div>
        </td>
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
            <div class="left">ซ. ระบบวิทยุ</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.system_type_group_id === "ระบบวิทยุ" ? content.HardwareType : "-"}</label></div></div>
        </td>
          
      </tr>
    </table>

    <table >
      <tr class="item2">
        <td style="width: 1%; text-align:left ; vertical-align: middle;">
        </td>
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
            <div class="left">ฌ. ระบบอิเลคทรอนิคส์</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.system_type_group_id === "ระบบอิเลคทรอนิคส์" ? content.HardwareType : "-"}</label></div></div>
        </td>
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
        </td>
      </tr>
    </table>

      <table>
          <tr>
          <td>
              <div class="left">(6) ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานี/ตำแหน่งที่ต��้ง)</div><div contenteditable="true"><div class="dotted" style="width: 750px;"><label>${content.Station}</label></div></div>
          </td>
          </tr>
      </table>

      <table>
          <tr>
          <td>
              <div class="left">(7) ชื่ออุปกรณ์ที่บำรุงรักษา</div><div contenteditable="true"><div class="dotted" style="width: 750px;"><label>${content.HardwareType}</label></div></div>
          </td>
          </tr>
      </table>
      
      <table>
          <tr>
          <td>
              <div class="left">(8) สาเหตุและอาการเสียโดยสรุป</div><div contenteditable="true"><div class="dotted" style="width: 750px;"><label>${content.summary_cause_condition}</label></div></div>
              <div class="left"></div><div class="dotted" ></div>
              <div class="left"></div><div class="dotted" ></div>
          </td>
          </tr>
      </table>       



      <table >
        <tr class="item2">
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
              <div class="left">(9) ขบวนรถที่</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.cargo_id}</label></div></div>
          </td>
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
              <div class="left">เสียเวลาเพราะเหตุนี้</div><div class="right">นาที</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label>${content.total_fail_time}</label></div></div>
          </td> 
        </tr>
      </table>


      <table>
          <tr>
          <td>
              <div class="left">(10) สรุปการแก้ไขและการซ่อมแซม</div><div contenteditable="true"><div class="dotted" style="width: 750px;"><label>${content.service_method_id}</label></div></div>
              <div class="left"></div><div class="dotted" ></div>
              <div class="left"></div><div class="dotted" ></div>
          </td>
          </tr>
      </table>


      <table>
          <tr>
          <td>
              <div class="left">(11) ยังไม่ได้จัดการแก้ไขเพราะ</div><div contenteditable="true"><div class="dotted" style="width: 750px;"><label>${content.interrupt_id}</label></div></div>
              <div class="left"></div><div class="dotted" ></div>
              <div class="left"></div><div class="dotted" ></div>
          </td>
          </tr>
      </table>
    

      <table >
      <tr class="item2">
        <td style="width: 33%; text-align:left ; vertical-align: middle;">
            <div class="left">(12) ผู้ควบคุมทดสอบ ชื่อ</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label>${content.auditor_name}</label></div></div>
        </td>
        <td style="width: 33%; text-align:left ; vertical-align: middle;">
            <div class="left">ตำแหน่ง</div><div contenteditable="true"><div class="dotted" style="width: 400px;"><label>${content.auditor_position_id}</label></div></div>
        </td> 
        <td style="width: 33%; text-align:left ; vertical-align: middle;">
            <div class="left">ลงนาม</div><div contenteditable="true"><div class="dotted" style="width: 130px;"><label></label></div></div>
        </td> 
      </tr>
    </table>

    <table >
      <tr class="item2">
        <td style="width: 33%; text-align:left ; vertical-align: middle;">
            <div class="left">(13) ผู้ควบคุมแก้ไข ชื่อ</div><div contenteditable="true"><div class="dotted" style="width: 200px;"><label>${content.fixer_name}</label></div></div>
        </td>
        <td style="width: 33%; text-align:left ; vertical-align: middle;">
            <div class="left">ตำแหน่ง</div><div contenteditable="true"><div class="dotted" style="width: 400px;"><label>${content.fixer_position_id}</label></div></div>
        </td> 
        <td style="width: 33%; text-align:left ; vertical-align: middle;">
            <div class="left">ลงนาม</div><div contenteditable="true"><div class="dotted" style="width: 130px;"><label></label></div></div>
        </td> 
      </tr>
    </table>
    
      <table>
          <tr>
          <td>
              <div class="left">(14) รายชื่อผู้ร่วมวาน (ชื่อและตำแหน่ง)</div><div contenteditable="true"><div class="dotted" style="width: 750px;"><label>${content.member_1} ${content.member_1_position_id}${content.member_2} ${content.member_2_position_id}${content.member_3} ${content.member_3_position_id}</label></div></div>
              <div class="left"></div><div class="dotted" ></div>
              <div class="left"></div><div class="dotted" ></div>
          </td>
          </tr>
      </table>

      <table>
        <tr class="item2">
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
              <div class="left">(15) ข้าพเจ้ารับรองว่าข้อความข้างบนนี้เป็นความจริง</div>
          </td>
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
              <div class="left">(ลงชื่อ)</div><pr><div contenteditable="true"><div class="dotted" style="width: 350px;"><label></label></div></div></pr>
          </td>
        </tr>
      </table>

      <table>
        <tr class="item2">
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
          </td>
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
          <pr><div class="left">(</div><div class="right">)</div><div contenteditable="true"><div class="dotted" style="width: 350px;"><label></label></div></div></pr>
          </td>
        </tr>
      </table>

      <table>
        <tr class="item2">
          <td style="width: 40%; text-align:left ; vertical-align: middle;">
          </td>
          <td style="width: 50%; text-align:left ; vertical-align: middle;">
          <div class="left">ตำแหน่ง</div><pr><div contenteditable="true"><div class="dotted" style="width: 350px;"><label></label></div></div></pr>
          </td>
        </tr>
      </table>

    </div>`;

const createPageS101Page2 = (table, date, content) =>
  `<div class="invoice-box" >
        <table style="margin-top: 1cm;">
            <tr>
            <td>
                <div class="left">(16) รายละเอียดมีดังต่อไปนี้</div><div contenteditable="true"><div class="dotted" style="width: 750px;"><label>${content.remark}</label></div></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
            </td>
            </tr>
        </table>

        <table>
            <tr>
            <td>
                <div class="left">(17) รายการอะไหล่ที่เปลี่ยนซ่อมหรือค่าเสียหาย</div>
            </td>
            </tr>
        </table>

        ${table}

        <table >
            <tr>
            <td>
                <div class="left">(18) ความเห็นของนายตรวจลายหัวหน้าแขวง</div><div contenteditable="true"><div class="dotted" style="width: 750px;margin-bottom:2px;"><label>-</label></div></div>
                <div class="left" ></div><div class="dotted"></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
                <div class="left"></div><div class="dotted" ></div>
            </td>
            </tr>
        </table>
        


        <table>
          <tr class="item2">
            <td style="width: 40%; text-align:left ; vertical-align: middle;">
            </td>
            <td style="width: 40%; text-align:left ; vertical-align: middle;">
                <div class="left">(ลงชื่อ)</div><pr><div contenteditable="true"><div class="dotted" style="width: 350px;"><label</label></div></div></pr>
            </td>
          </tr>
        </table>

        <table>
          <tr class="item2">
            <td style="width: 35%; text-align:left ; vertical-align: middle;">
            </td>
            <td style="width: 63%; text-align:left ; vertical-align: middle;">
                <div class="left">นายตรวจสายหัวหน้าแขวง</div><pr><div contenteditable="true"><div class="dotted" style="width: 350px;"><label></label></div></div></pr>
            </td>
          </tr>
        </table>

    </div>`;

const createTableSS101 = (head, rows) =>
  `<table cellpadding="0" cellspacing="0" >
      <tr class="heading" >
          <td  style="width: 5%; text-align:center ; vertical-align: middle;">${head.item_id}</td>
          <td  style="width: 45%; text-align:center ; vertical-align: middle;">${head.description}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.unit}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.quantity}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.internal_item_id}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.type}</td>
      </tr>
      ${rows} 
  </table>`;


const createRowSS101 = (item) =>
  `<tr class="item">
      <td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
      <td style=" text-align:left ; vertical-align: middle;">${item.description}</td>
      <td style=" text-align:center ; vertical-align: middle;">${item.unit}</td>
      <td style=" text-align:center ; vertical-align: middle;">${item.quantity}</td>
      <td style=" text-align:right ; vertical-align: middle;">${item.internal_item_id}</td>
      <td style=" text-align:right ; vertical-align: middle;">${item.type}</td>
  </tr>`;


const createHtmlChecklistLineItem = (info_this_page, row_table_checklist_line_item) => `
<html>
<head>
<meta charset="utf-8">
<style>
  @page {
    size: A4;
    margin:0 ;
  }
  .invoice-box {
      width: 210mm;
      height: 29.7cm;
      margin: 0 auto;
      margin-bottom: 0.5cm;
      border: 0.1px solid #eee;
      font-size: 16px;
      font-family: 'AngsanaUPC', 'MS Sans Serif';   
  }
  .invoice-box table {
      width: 95%;
      margin: auto;
      border: 0px solid #eee;
  }
  .invoice-box table td {
      vertical-align: top;
  }
  .invoice-box table tr.heading td {
      background: #eee;
      border: 1px solid #ddd;
      font-weight: bold;
  }
  .invoice-box table tr.item td {
      border: 1px solid #eee;
  }
  .invoice-box table tr.item2 td {
      border-bottom: 0px solid #eee;
  }
  .invoice-box p {
      width: 95%;
  }
  .invoice-box h2 {
      margin-top: 1cm;
      margin-right: 0;
      margin-left:0;
      margin-bottom: 0;
  }
  .invoice-box h3 {
      margin: 0;
  }
  @media print {
    html, body {
      width: 210mm;
      height: 297mm;  
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
    }
  }
  .invoice-box pr {
    float: right;
    margin-right: 2.5%;
  }
  .invoice-box pl {
    float: left;
    margin-left: 2.5%;
  }
  .invoice-box pc {
    float: center;
  }
  .invoice-box table tr.top table td.title {
      line-height: 45px;
      color: #333;
  }
  .invoice-box pp {
    margin: 0.5cm 0.5cm;
    float: right;
  }
  .invoice-box table tr.information table td {
      padding-bottom: 40px;
  }
  .left,.right{
    padding:1px 0.1em;
    background:#fff;
    float:right;
  }
  .left{
      float:left;
      clear:both;
  }
  div{
      height:1.22em;
  }
  .dotted{
    border-bottom: 1px dotted grey;
    margin-bottom:2px;
  }
  .paddingFivePX {
    padding: 5px;
  }
</style>
</head>
  <body>
    <div class="invoice-box">
      <pp>เลขที่เอกสารที่: ${info_this_page.internal_document_id}</pp>
      <p style=" text-align:center ; vertical-align: middle;">รายการซ่อมบำรุงของสถานี: ${info_this_page.station_name}</p>
      <table>
        <thead>
          <tr class="heading">
            <td class="paddingFivePX" style="min-width: 10mm; text-align:center ; vertical-align: middle;">#</td>
            <td class="paddingFivePX" style="min-width: 30mm; text-align:center ; vertical-align: middle;">ACTION</td>
            <td class="paddingFivePX" style="min-width: 30mm; text-align:center ; vertical-align: middle;">ค่าใช้จ่าย</td>
            <td class="paddingFivePX" style="min-width: 80mm; vertical-align: middle;">แผน</td>
            <td class="paddingFivePX" style="min-width: 40mm; vertical-align: middle;">หมายเหตุ</td> 
          </tr>
        </thead>
        <tbody>
          ${row_table_checklist_line_item}
        </tbody>
      </table>
    </div>
  </body>
</html>
`;

const createRowChecklistLineItem = (row_table_checklist_line_item, index) => (
  `<tr class="item">
      <td class="paddingFivePX" style=" text-align:center ; vertical-align: middle;">${index + 1}</td>
      <td class="paddingFivePX" style=" text-align:left ; vertical-align: middle;"></td>
      <td class="paddingFivePX" style=" text-align:center ; vertical-align: middle;"></td>
      <td class="paddingFivePX" style=" vertical-align: middle; max-width: 80mm;">${row_table_checklist_line_item.checklist_name} \\ ${row_table_checklist_line_item.checklist_line_item_name}</td>
      <td class="paddingFivePX" style=" vertical-align: middle;"></td>
    </tr>`);

const createHtmlWorkOrderPM = (info_this_page, row_table_checklist_week_1, row_table_checklist_week_2, row_table_checklist_week_3, row_table_checklist_week_4) => `
<html>
<head>
<meta charset="utf-8">
<style>
  @page {
    size: A4;
    margin:0 ;
  }
  .invoice-box {
      width: 210mm;
      height: 29.7cm;
      margin: 0 auto;
      margin-bottom: 0.5cm;
      border: 0.1px solid #eee;
      font-size: 16px;
      font-family: 'AngsanaUPC', 'MS Sans Serif';   
  }
  .invoice-box table {
      width: 95%;
      margin: auto;
      border: 0px solid #eee;
  }
  .invoice-box table td {
      vertical-align: top;
  }
  .invoice-box table tr.heading td {
      background: #eee;
      border: 1px solid #ddd;
      font-weight: bold;
  }
  .invoice-box table tr.item td {
      border: 1px solid #eee;
  }
  .invoice-box table tr.item2 td {
      border-bottom: 0px solid #eee;
  }
  .invoice-box p {
      width: 95%;
  }
  .invoice-box h2 {
      margin-top: 1cm;
      margin-right: 0;
      margin-left:0;
      margin-bottom: 0;
  }
  .invoice-box h3 {
      margin: 0;
  }
  @media print {
    html, body {
      width: 210mm;
      height: 297mm;  
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
    }
  }
  .invoice-box pr {
    float: right;
    margin-right: 2.5%;
  }
  .invoice-box pl {
    float: left;
    margin-left: 2.5%;
  }
  .invoice-box pc {
    float: center;
  }
  .invoice-box table tr.top table td.title {
      line-height: 45px;
      color: #333;
  }
  .invoice-box pp {
    margin: 0.5cm 0.5cm;
    float: right;
  }
  .invoice-box table tr.information table td {
      padding-bottom: 40px;
  }
  .left,.right{
    padding:1px 0.1em;
    background:#fff;
    float:right;
  }
  .left{
      float:left;
      clear:both;
  }
  div{
      height:1.22em;
  }
  .dotted{
    border-bottom: 1px dotted grey;
    margin-bottom:2px;
  }
  .paddingFivePX {
    padding: 5px;
  }
</style>
</head>
  <body>
    <div class="invoice-box">
      <pp>เลขที่เอกสารที่: ${info_this_page.internal_document_id}</pp>
      <p style=" text-align:center ; vertical-align: middle;">แผนการซ่อมบำรุงประจำแขวง: ${info_this_page.district_name}</p>
      <p style=" text-align:center ; margin: 5px 0px; vertical-align: middle;">แผนการซ่อมบำรุงประจำตอน: ${info_this_page.node_name}</p>
      <p style=" text-align:center ; margin: 5px 0px; vertical-align: middle;">ชื่อแผนการซ่อมบำรุงประจำตอน: ${info_this_page.name}</p>
      <p style=" text-align:center ; margin: 5px 0px; vertical-align: middle;">แผนการซ่อมบำรุงประจำตอนวันที่: ${info_this_page.created_on.split(".")[0].replace("T", " เวลา ") + " น."}</p>

      <p style=" text-align:center ; margin: 5px 0px; vertical-align: middle;">ประจำสัปดาห์ที่ 1</p>
      <table>
        <thead>
          <tr class="heading">
            <td class="paddingFivePX" style="min-width: 10mm; text-align:center ; vertical-align: middle;" rowSpan="2">#</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;" rowSpan="2">สถานี</td>
            <td class="paddingFivePX" style="min-width: 135mm; text-align:center ; vertical-align: middle;" colSpan="3">เครื่องกั้น</td>
          </tr>
          <tr class="heading">
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">สินทรัพย์</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">แผน</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">เลข กม.</td>
          </tr>
        </thead>
        <tbody>
          ${row_table_checklist_week_1 ? row_table_checklist_week_1 : ""}
        </tbody>
      </table>

      <p style=" text-align:center ; margin: 50px 0px 5px; vertical-align: middle;">ประจำสัปดาห์ที่ 2</p>
      <table>
        <thead>
          <tr class="heading">
            <td class="paddingFivePX" style="min-width: 10mm; text-align:center ; vertical-align: middle;" rowSpan="2">#</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;" rowSpan="2">สถานี</td>
            <td class="paddingFivePX" style="min-width: 135mm; text-align:center ; vertical-align: middle;" colSpan="3">เครื่องกั้น</td>
          </tr>
          <tr class="heading">
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">สินทรัพย์</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">แผน</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">เลข กม.</td>
          </tr>
        </thead>
        <tbody>
          ${row_table_checklist_week_2 ? row_table_checklist_week_2 : ""}
        </tbody>
      </table>

      <p style=" text-align:center ; margin: 50px 0px 5px; vertical-align: middle;">ประจำสัปดาห์ที่ 3</p>
      <table>
        <thead>
          <tr class="heading">
            <td class="paddingFivePX" style="min-width: 10mm; text-align:center ; vertical-align: middle;" rowSpan="2">#</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;" rowSpan="2">สถานี</td>
            <td class="paddingFivePX" style="min-width: 135mm; text-align:center ; vertical-align: middle;" colSpan="3">เครื่องกั้น</td>
          </tr>
          <tr class="heading">
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">สินทรัพย์</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">แผน</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">เลข กม.</td>
          </tr>
        </thead>
        <tbody>
          ${row_table_checklist_week_3 ? row_table_checklist_week_3 : ""}
        </tbody>
      </table>

      <p style=" text-align:center ; margin: 50px 0px 5PX; vertical-align: middle;">ประจำสัปดาห์ที่ 4</p>
      <table>
        <thead>
          <tr class="heading">
            <td class="paddingFivePX" style="min-width: 10mm; text-align:center ; vertical-align: middle;" rowSpan="2">#</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;" rowSpan="2">สถานี</td>
            <td class="paddingFivePX" style="min-width: 135mm; text-align:center ; vertical-align: middle;" colSpan="3">เครื่องกั้น</td>
          </tr>
          <tr class="heading">
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">สินทรัพย์</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">แผน</td>
            <td class="paddingFivePX" style="min-width: 45mm; text-align:center ; vertical-align: middle;">เลข กม.</td>
          </tr>
        </thead>
        <tbody>
          ${row_table_checklist_week_4 ? row_table_checklist_week_4 : ""}
        </tbody>
      </table>
    </div>
  </body>
</html>
`;

const createRowWorkOrderPM = (w_list, index) => (
  `<tr class="item">
      <td class="paddingFivePX" style=" text-align:center; vertical-align: middle;">${index + 1}</td>
      <td class="paddingFivePX" style=" vertical-align: middle; max-width: 80mm;">${w_list.internal_item_id ? "-" : w_list.station_th}</td>
      <td class="paddingFivePX" style=" vertical-align: middle;">${w_list.station_th ? "-" : w_list.internal_item_id}</td>
      <td class="paddingFivePX" style=" vertical-align: middle; max-width: 80mm;">${w_list.station_th ? "-" : w_list.checklist_name}</td>
      <td class="paddingFivePX" style=" vertical-align: middle;">${w_list.station_th ? "-" : w_list.x_cross_x_cross_th}</td>
    </tr>`);

const createHtmlReportPMT = (info_page, htmlTable) => `
<html>
  <head>
    <meta charset="utf-8">
    <style>
    @page {
        size: landscape;
        margin:0 ;
      }
    @media print {
        html, body {
            width:29.7cm;
            height: 210mm ; 
          margin-bottom: 0;
          margin-left: 0;
          margin-right: 0;
          margin-top: 0;
        }
      }
    
     .text-right {
        text-align: right;
     }

     .invoice-box {
        width:29.7cm;
        height: 210mm ;
           margin: 0 auto;
           margin-bottom: 0.5cm;
           border: 0.1px solid #ffffff;
           font-size: 16px;
           font-family: 'AngsanaUPC', 'MS Sans Serif';  
      }
      .invoice-box table {
          width: 95%;
          margin: auto;
          border: 0px solid #eee;
      }
      .invoice-box table td {
           vertical-align: top;
      }
      .invoice-box table tr.heading td {
           background: #eee;
           border: 1px solid #ddd;
           font-weight: bold;
      }
      .invoice-box table tr.item td {
           border: 1px solid #eee;
      }
      .invoice-box table tr.item2 td {
           border-bottom: 0px solid #eee;
      }
      .invoice-box p {
           width: 95%;
      }
      .invoice-box h3 {
           margin-top: 1cm;
           margin-right: 0;
           margin-left:0;
           margin-bottom: 0;
      }
      .invoice-box table tr.top table td.title {
        line-height: 45px;
        color: #333;
      }

     .invoice-box pp {
        margin-top: 0.5cm;
        float: right;
        margin: 0;
        width: 10%;
     }

     .invoice-box table tr.information table td {
        padding-bottom: 40px;
     }
    </style>

  </head>
  <body>
    <div class="invoice-box">
      <h4  style=" text-align:center ; vertical-align: middle;">สรุปปฏิบัติการทำวาระประจำเดือน ${info_page.mouth_th} พ.ศ.${info_page.year_id}   ${info_page.district_th}</h4>
      ${htmlTable}
    </div>
  </body>
</html>
`;

const rowHeadTableNodePMT = (node_th) => `
  <td style="text-align:center; vertical-align: middle;" colSpan="2">${node_th}</td>
`

const rowHeadTablePlanPMT = () => `
  <td style="text-align:center; vertical-align: middle;">แผน</td>
  <td style="text-align:center; vertical-align: middle;">ผลงาน</td>
`

const createRowReportPMT = (item, index, plan_checked, total_plan, total_checked) =>
  `<tr class="item">
    <td style="text-align:center; vertical-align: middle;">${index}</td>
    <td style="vertical-align: middle;">${item.checklist_name}</td>
    <td style="text-align:center; vertical-align: middle;">สถานี</td>
    ${plan_checked}
    <td style="text-align:center; vertical-align: middle;">${total_plan}</td>
    <td style="text-align:center; vertical-align: middle;">${total_checked}</td>
    <td style="text-align:center; vertical-align: middle;"></td>
  </tr>`;

  const createRowPlanCheckedReportPMT = (plan_checked) =>
  `
    <td style="text-align:center; vertical-align: middle;">${plan_checked.checklist_count}</td>
    <td style="text-align:center; vertical-align: middle;">${plan_checked.completed_count}</td>
  `;

const createTableReportPMT = (head, list_head, list_plan, row_body) => `
  <table cellpadding="0" cellspacing="0" >
    <thead>
      <tr class="heading">
        <td style="width: 2%; text-align:center ; vertical-align: middle;"  rowspan="3">ลำดับ</td>
        <td style="text-align:center ; vertical-align: middle;" rowspan="3">รายละเอียด</td>
        <td style="text-align:center ; vertical-align: middle;" rowspan="3">หน่วย</td>

        <td style="text-align:center; vertical-align: middle;" colSpan=${head.length * 2}>การดำเนินการ</td>
        <td style="text-align:center; vertical-align: middle;" colSpan="2">สรุปรวม</td> 
        
        <td style="text-align:center; vertical-align: middle;" rowspan="3">หมายเหตุ</td>
      </tr>
      <tr class="heading">
          ${list_head}
          <td style="text-align:center; vertical-align: middle;" colSpan="2">แขวง</td>
      </tr>
      <tr class="heading">
          ${list_plan}
          <td style="text-align:center; vertical-align: middle;">แผน</td>
          <td style="text-align:center; vertical-align: middle;">ผลงาน</td>
      </tr>
    </thead>
    <tbody>
      ${row_body}
    </tbody>
  </table>
`;

export const exportPDF = (routeLocation, valuesContext, fact) => new Promise((resolve, reject) => {

  if (routeLocation === '/spare-report-s-1') {
    // console.log("valuesContext", valuesContext)
    let newDate = new Date()
    let date = newDate.getDate();
    let mouth = newDate.getMonth() + 1;
    let year = newDate.getFullYear() + 543;
    if (mouth === Number(valuesContext.mouth_id) && year === Number(valuesContext.year_id)) {
    } else {
      date = 30
    }
    mouth = valuesContext.mouth.find((element) => {
      return element.id === mouth;
    })
    // console.log("valuesContext.line_items", valuesContext.line_items)
    let create_on = date + " " + mouth.mouth + " " + year;
    let filterResult = valuesContext.line_item_shows.sort(function (a, b) {
      return parseInt(a.internal_item_id) - parseInt(b.internal_item_id);
    })
    let group_type = []
    let j = ''
    filterResult.map((item) => {
      var text = item.internal_item_id.replace(/\d+|^\s+|\s+$/g, '')
      text = text.replace(/\s/g, '');
      if (j === '') {
        group_type.push(text);
        j = text;
      }
      else {
        if (text === j) {
        } else {
          group_type.push(text);
          j = text;
        }
      }
    })
    var r = {}
    for (var i = 0; i < group_type.length; i++) {
      let filterResult_type = filterResult.filter((component) => {
        var text = component.internal_item_id.replace(/\d+|^\s+|\s+$/g, '')
        text = text.replace(/\s/g, '');
        return text === group_type[i];
      });
      const line_items = [];
      var line_number = 1
      var total = 0;
      var keyss = group_type[i];
      // console.log("filterResult_type", filterResult_type)
      filterResult_type.map((item) => {
        var myObj = {
          "item_id": line_number,
          "description": item.item_description,
          "internal_item_id": item.internal_item_id,
          "unit": item.uom_name,
          "quantity": item.quantity,
          "total": item.total,
          "per_unit_price": item.per_unit_price
        };
        line_number = line_number + 1;
        total = total + parseFloat(item.total.replace(/,/g, ''))
        line_items.push(myObj)
      })
      r[keyss] = {
        "Totol": total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        "Item": line_items
      }
    }
    const data_json = {
      "HeadersTilte": "ส.1",
      "CreateOn": create_on,
      "SourceWarehouse": valuesContext.src_warehouse_id,
      "Headers":
      {
        "item_id": "ลำดับที่",
        "description": "รายการสิ่งของ",
        "internal_item_id": "เลขที่สิ่งของคงคลัง",
        "unit": "หน่วย",
        "quantity": "จำนวนเหลือ ณ วันนี้",
        "total": "รวมเป็นเงิน",
        "per_unit_price": "ราคา ต่อหน่วย"
      },
      "ItemInWarehouse": r
    }
    let pageAll = ``;
    var group = [];
    Object.keys(data_json.ItemInWarehouse).map((id) => {
      group.push(id)
    })
    const row_groups = group.map(createCategory).join('');

    const head_doc = createPageS1Header(row_groups, data_json.CreateOn, data_json.SourceWarehouse, group.length, img);
    // console.log(head_doc)
    pageAll = pageAll + head_doc
    var index = 1
    Object.keys(data_json.ItemInWarehouse).map((id) => {
      const category_doc = createPageS1Category(index, id);
      pageAll = pageAll + category_doc
      var R = [];
      for (var i = 0; i < data_json.ItemInWarehouse[id].Item.length; i += 25) {
        R.push(data_json.ItemInWarehouse[id].Item.slice(i, i + 25));
      }
      let page = R;
      for (let i = 0; i < page.length; i++) {
        const rows = page[i].map(createRowS1).join('');
        const table = createTableS1(data_json.Headers, rows);
        if (i === (page.length - 1)) {
          const tablePage = createPageS1LastPage(table, data_json.CreateOn, data_json.ItemInWarehouse[id].Totol)
          pageAll = pageAll + tablePage
        } else {
          const tablePage = createPageS1(table, data_json.CreateOn)
          pageAll = pageAll + tablePage
        }
      }
      index = index + 1;
    })
    const html = createHtmlS1(pageAll);
    return resolve(html);
  } else if (routeLocation === '/spare-inventory-transfer') {

    console.log(valuesContext)
    let data = [];
    let p = 1
    let total = 0

    valuesContext.line_items.map(lineItem => {
      data.push({
        "item_id": p,
        "description": lineItem.description,
        "internal_item_id": lineItem.internal_item_id,
        "unit": lineItem.unit,
        "price_quantity": lineItem.quantity,
        "quantity": " ",
        "price": " ",
        "type": " "
      });
      p = p + 1;
      total = total + lineItem.quantity

    })



    const data_json = {
      "HeadersTilte": "ส.16/46",
      "CreateOn": valuesContext.created_on,
      "Content": {
        "NoDocument": valuesContext.document_id,
        "NoInternal": valuesContext.internal_document_id,
        "SourceWarehouseName": valuesContext.src_warehouse_id,
        "CreatedByUserNameTh": valuesContext.created_by_user_employee_id,
        "DestWarehouseName": valuesContext.dest_warehouse_id,
        "AccountType": "-",
        "ResponsibilityCode": "-",
        "Number": "-",
        "Code": "-"
      },

      "Headers":
      {
        "item_id": "ข้อที่",
        "description": "รายการสิ่งของ",
        "internal_item_id": "สิ่งของเลขที่",
        "unit": "หน่วย",
        "price_quantity": "เบิกจำนวน",
        "quantity": "จ่ายจำนวน",
        "price": "บาท",
        "type": "สด."
      },
      "ItemInWarehouse": data,
      "ApprovalBy": {



      }
      ,
      "Totol": total
    }





    let pageAll = ``;
    var R = [];
    for (var i = 0; i < data_json.ItemInWarehouse.length; i += 12) {
      R.push(data_json.ItemInWarehouse.slice(i, i + 12));
    }
    let page = R;

    for (let i = 0; i < page.length; i++) {
      if (page[i].length === 12) {
      }
      else {
        for (let j = page[i].length; j < 12; j++) {
          page[i].push({
            "item_id": j + 1,
            "description": " ",
            "internal_item_id": " ",
            "unit": " ",
            "price_quantity": " ",
            "quantity": " ",
            "price": " ",
            "type": " "
          });
        }
      }
    }


    for (let i = 0; i < page.length; i++) {
      const rows = page[i].map(createRowS16_46).join('');
      const table = createTableS16_46(data_json.Headers, rows, data_json.Content, data_json.Totol);
      const tablePage = createPageS16_46(table, data_json.CreateOn, data_json.Content)
      pageAll = pageAll + tablePage

    }


    const html = createHtmlS16_46(pageAll);
    return resolve(html);
  } else if (routeLocation === '/spare-report-b22') {
    // console.log("valuesContext", valuesContext)
    let data = [];
    let p = 1
    let newDate = new Date()
    let date = newDate.getDate();
    let mouth = newDate.getMonth() + 1;
    let year = newDate.getFullYear() + 543;
    if (mouth === Number(valuesContext.mouth_id) && year === Number(valuesContext.year_id)) {
      // console.log("ccccc")
    } else {
      date = 30
    }
    mouth = valuesContext.mouth.find((element) => {
      return element.id === mouth;
    })
    let create_on = date + " " + mouth.mouth + " " + year;

    valuesContext.new_line_items_pdf.map(lineItem => {
      data.push({
        "item_id": p,
        "description": lineItem.item_description,

        "unit": lineItem.uom_name,

        "left_month_unit": lineItem.begin_unit_count,
        "left_month_price": lineItem.begin_state_in_total_price,

        "get_month_unit": lineItem.state_in_unit_count,
        "get_month_price": lineItem.end_state_in_total_price,

        "pay_month_unit": lineItem.state_out_unit_count,
        "pay_month_price": lineItem.end_state_out_total_price,

        "ending_unit_count": lineItem.ending_unit_count,
        "ending_unit_count_total": lineItem.ending_unit_count_total,

        "type": lineItem.accounting_type
      });
      p = p + 1;
    })

    const data_json = {
      "HeadersTilte": "บ.22",
      "CreateOn": create_on,
      "Headers":
      {
        "Page_1": {
          "item_id": "ลำดับที่",
          "description": "รายการ",
          "unit": "หน่วย",
          "left_month_unit": "จำนวน",
          "left_month_price": "ราคา",
          "get_month_unit": "จำนวน",
          "get_month_price": "ราคา",
          "pay_month_unit": "จำนวน",
          "pay_month_price": "ราคา",
          "type": "ประเภทบัญชี"

        },
        "Page_2": {
          "item_id": "ลำดับที่",
          "description": "รายการสิ่งของ",
          "unit": "หน่วย",
          "left_month_unit": "จำนวน",
          "left_month_price": "ราคา"
        }
      },

      "ItemInWarehouse": {
        "Page_1": {
          "Item": data
        },
        "Page_2": {
          "Item": [
            {
              "item_id": "ลำดับที่ๅ",
              "description": "รายการสิ่งของๅ",
              "unit": "หน่วยๅ",
              "left_month_unit": "จำนวนๅ",
              "left_month_price": "ราคาๅ"
            }
          ],
          "Inventory": "",
          "Totol": "10,251,315.00"
        }

      }




    }
    let pageAll = ``;

    Object.keys(data_json.ItemInWarehouse).map((id) => {

      if (id === "Page_1") {
        var R = [];
        for (var i = 0; i < data_json.ItemInWarehouse[id].Item.length; i += 12) {
          R.push(data_json.ItemInWarehouse[id].Item.slice(i, i + 12));
        }
        let page = R;

        for (let i = 0; i < page.length; i++) {
          if (page[i].length === 12) {
          }
          else {
            for (let j = page[i].length; j < 12; j++) {
              page[i].push({
                "item_id": " ",
                "description": " ",
                "unit": " ",
                "left_month_unit": " ",
                "left_month_price": " ",
                "get_month_unit": " ",
                "get_month_price": " ",
                "pay_month_unit": " ",
                "pay_month_price": " ",
                "type": " ",
                "ending_unit_count": " ",
                "ending_unit_count_total": " ",
              });
            }
          }
        }


        for (let i = 0; i < page.length; i++) {
          const rows = page[i].map(createRowB22Page1).join('');
          const table = createTableB22Page1(data_json.Headers.Page_1, rows);
          const tablePage = createPageB22Page1(table, data_json.CreateOn)
          pageAll = pageAll + tablePage
        }
      }
    })
    const html = createHtmlB22(pageAll);
    return resolve(html);
  } else if (routeLocation === '/pmt-ss-101') {

    const data_json = valuesContext;
    let pageAll = ``;

    const tablePage = createPageS101Page1(data_json.CreateOn, data_json.Content)
    pageAll = pageAll + tablePage

    var R = [];
    for (var i = 0; i < data_json.ItemInWarehouse.length; i += 12) {
      R.push(data_json.ItemInWarehouse.slice(i, i + 12));
    }
    let pageSS101 = R;

    for (let i = 0; i < pageSS101.length; i++) {
      if (pageSS101[i].length === 12) {
      }
      else {
        for (let j = pageSS101[i].length; j < 12; j++) {
          pageSS101[i].push({
            "item_id": j + 1,
            "description": " ",
            "internal_item_id": " ",
            "unit": " ",
            "price_quantity": " ",
            "quantity": " ",
            "price": " ",
            "type": " "
          });
        }
      }
    }

    for (let i = 0; i < pageSS101.length; i++) {
      const rows = pageSS101[i].map(createRowSS101).join('');
      const table = createTableSS101(data_json.Headers, rows);
      const tablePage2 = createPageS101Page2(table, data_json.CreateOn, data_json.Content)
      pageAll = pageAll + tablePage2
    }

    const html = createHtmlS101(pageAll);
    return resolve(html);



  } else if (routeLocation === '/pmt-all-checklist-fixed-asset') {
    // console.log("valuesContext", valuesContext)
    let info_this_page = {
      "internal_document_id": valuesContext.internal_document_id,
      "station_name": ''
    }
    let list_body_table = valuesContext.checklist_line_item;

    let stations = fact.stations.items;
    let station = stations.find(station => `${station.station_id}` === `${valuesContext.station_id}`);
    if (station) {
      info_this_page.station_name = station.name
    }

    let row;
    list_body_table.map((list_body_table, index) => {
      if (row) {
        row = row + createRowChecklistLineItem(list_body_table, index)
      } else {
        row = createRowChecklistLineItem(list_body_table, index)
      }
    })
    const html = createHtmlChecklistLineItem(info_this_page, row);
    return resolve(html);

  } else if (routeLocation === '/pmt-fixed-asset') {
    console.log("valuesContext", valuesContext)
    let info_this_page = {
      "internal_document_id": valuesContext.internal_document_id,
      "created_on": valuesContext.created_on,
      "name": valuesContext.name,
      "district_name": '',
      "node_name": ''
    }

    let districts = fact.districts.items;
    let district = districts.find(district => `${district.district_id}` === `${valuesContext.district_id}`);

    let nodes = fact.nodes.items;
    let node = nodes.find(node => `${node.node_id}` === `${valuesContext.node_id}`);

    if (district && node) {
      info_this_page.district_name = district.name
      info_this_page.node_name = node.name
    }

    let row_week1;
    valuesContext.w1_list.map((w1_list, index) => {
      if (row_week1) {
        row_week1 = row_week1 + createRowWorkOrderPM(w1_list, index)
      } else {
        row_week1 = createRowWorkOrderPM(w1_list, index)
      }
    })

    let row_week2;
    valuesContext.w2_list.map((w2_list, index) => {
      if (row_week2) {
        row_week2 = row_week2 + createRowWorkOrderPM(w2_list, index)
      } else {
        row_week2 = createRowWorkOrderPM(w2_list, index)
      }
    })

    let row_week3;
    valuesContext.w3_list.map((w3_list, index) => {
      if (row_week3) {
        row_week3 = row_week3 + createRowWorkOrderPM(w3_list, index)
      } else {
        row_week3 = createRowWorkOrderPM(w3_list, index)
      }
    })

    let row_week4;
    valuesContext.w4_list.map((w4_list, index) => {
      if (row_week4) {
        row_week4 = row_week4 + createRowWorkOrderPM(w4_list, index)
      } else {
        row_week4 = createRowWorkOrderPM(w4_list, index)
      }
    })

    const html = createHtmlWorkOrderPM(info_this_page, row_week1, row_week2, row_week3, row_week4);
    return resolve(html);
  } else if (routeLocation === '/pmt-report') {
    // console.log("valuesContext", valuesContext)
    let districts = fact.districts.items;
    let district = districts.find(district => `${district.district_id}` === `${valuesContext.district_id}`);

    let mouths = valuesContext.mouth;
    let mouthLet = mouths.find(mouth => `${mouth.id}` === `${valuesContext.mouth_id}`);

    let info_page
    if (mouthLet && district) {
      info_page = {
        "district_th": district.name,
        "mouth_th": mouthLet.mouth,
        "year_id": valuesContext.year_id
      }
    }
    let list_head_tablereport_pmt = valuesContext.head_table
    let list_body_table_report_pmt = valuesContext.checklist_name_unique

    let list_head;
    let list_plan;
    list_head_tablereport_pmt.map((list_head_tablereport_pmt, index) => {
      if (list_head && list_plan) {
        list_head = list_head + rowHeadTableNodePMT(list_head_tablereport_pmt.node_th, index)
        list_plan = list_plan + rowHeadTablePlanPMT()
      } else {
        list_head = rowHeadTableNodePMT(list_head_tablereport_pmt.node_th, index)
        list_plan = rowHeadTablePlanPMT()
      }
    })

    let row_body;
    list_body_table_report_pmt.map((list, index) => {
      // console.log("list", list)
      let indexPlus = index + 1;
      let plan_checked;
      if (row_body) {
        let total_plan = 0;
        let total_checked = 0;
        for (var i = 0; i < list_head_tablereport_pmt.length; i++) {
          total_plan = total_plan + list[i].checklist_count;
          total_checked = total_checked + list[i].completed_count;
          if (plan_checked) {
            plan_checked = plan_checked + createRowPlanCheckedReportPMT(list[i])
          } else {
            plan_checked = createRowPlanCheckedReportPMT(list[i])
          }
        }
        row_body = row_body + createRowReportPMT(list, indexPlus, plan_checked, total_plan, total_checked)
      } else {
        let total_plan = 0;
        let total_checked = 0;
        for (var i = 0; i < list_head_tablereport_pmt.length; i++) {
          total_plan = total_plan + list[i].checklist_count;
          total_checked = total_checked + list[i].completed_count;
          if (plan_checked) {
            plan_checked = plan_checked + createRowPlanCheckedReportPMT(list[i])
          } else {
            plan_checked = createRowPlanCheckedReportPMT(list[i])
          }
        }
        row_body = createRowReportPMT(list, indexPlus, plan_checked, total_plan, total_checked)
      }
    })

    let htmlTable = createTableReportPMT(list_head_tablereport_pmt, list_head, list_plan, row_body)
    const html = createHtmlReportPMT(info_page, htmlTable);
    return resolve(html);
  }

})

export default useExportPdfInitializer;