import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
    toModeSearch, handleClickAdd, handleClickHomeToSpareMain, handleClickExportPDF,
    handleClickForward, handleClickBackward, handleClickRefresh, TOOLBAR_MODE, TOOLBAR_ACTIONS
} from '../redux/modules/toolbar.js';
import history from '../history';



function getRouteLocation() {
    return history.location.pathname;
}

const useExportPdfInitializer = () => {

    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({ ...state.toolbar }));
    const { values, submitForm, validateForm, setFieldValue, setErrors } = useFormikContext();

    // Handle Toolbar Mode
    useEffect(() => {
        // let document_id = values.src_warehouse_id;
        let document_item = values.internal_document_id;
        console.log(values)
        let routeLocation = getRouteLocation();
        console.log(routeLocation)
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.EXPORT_PDF] && document_item) {
            exportPDF(routeLocation, values).then(function (htmlCode) {
                var w = window.open();
                w.document.write(htmlCode);
                setTimeout(() => {
                    w.print();
                    w.close();
                }, 500);
            })
            dispatch(handleClickExportPDF())
        } else {
            dispatch(handleClickExportPDF())
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.EXPORT_PDF], values])
    return;

}

const img = "data:image/png;base64,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"

const createRowS1 = (item) =>
    `<tr class="item">
<td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
<td style=" text-align:left ; vertical-align: middle;">${item.description}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.internal_item_id}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.unit}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.quantity}</td>
<td style=" text-align:right ; vertical-align: middle;">${item.uom_group_id}</td>
<td style=" text-align:right ; vertical-align: middle;">${item.per_unit_price}</td>
</tr>`
    ;

const createTableS1 = (head, rows) => `
<table cellpadding="0" cellspacing="0" >
<tr class="heading" >
    <td  style="width: 5%; text-align:center ; vertical-align: middle;">${head.item_id}</td>
    <td  style="width: 45%; text-align:center ; vertical-align: middle;">${head.description}</td>
    <td  style="width: 10%; text-align:center ; vertical-align: middle;">${head.internal_item_id}</td>
    <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.unit}</td>
    <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.quantity}</td>
    <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.uom_group_id}</td>
    <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.per_unit_price}</td>
</tr>
${rows}
</table>
`;

const createHtmlS1 = (table) => `
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
</html>
`;

const createPageS1 = (table, date) => `
<div class="invoice-box">
  <pp>ส.1</pp>
  <h2  style=" text-align:center ; vertical-align: middle;">การรถไฟแห่งประเทศไทย</h2>
  <h3  style=" text-align:center ; vertical-align: middle;">บัญชีสำรวจวัสดุสำรองใช้การซึ่งอยู่ในครอบครอง เมื่อวันที่ ${date}</h3>
  <h3  style=" text-align:center ; vertical-align: middle; margin-bottom: 0.5cm;">รหัสสังกัด 1640 ฝ่ายการอาณัติสัญญาณและโทรคมนาคม</h3>
  ${table}
</div>
`;

const createPageS1LastPage = (table, date, total) => `
<div class="invoice-box">
  <pp>ส.1</pp>
  <h2  style=" text-align:center ; vertical-align: middle;">การรถไฟแห่งประเทศไทย</h2>
  <h3  style=" text-align:center ; vertical-align: middle;">บัญชีสำรวจวัสดุสำรองใช้การซึ่งอยู่ในครอบครอง เมื่อวันที่ ${date}</h3>
  <h3  style=" text-align:center ; vertical-align: middle; margin-bottom: 0.5cm;">รหัสสังกัด 1640 ฝ่ายการอาณัติสัญญาณและโทรคมนาคม</h3>
  ${table}
  <p style=" text-align:right ; vertical-align: middle; ">รวมเงินประเภทบัญชี 2031515 ทั้งสิ้น ${total}</p>
  <p style=" text-align:right ; vertical-align: middle; ">รวมเงินทั้งสิ้น ${total}</p>
</div>
`;

const createCategory = (item) =>
    `
    <h2  style=" text-align:center ; vertical-align: middle;align-items:center">(${item})</h2>
`

const createPageS1Header = (category_group, date, source, index, img) => `
<div class="invoice-box">
    <br></br>
    <img src=${img} style="display: block;margin-left: auto;margin-right: auto;width: 20%;" >
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
</div>
`

const createPageS1Category = (index, category) => `
<div class="invoice-box" style=" justify-content:center ;align-items:center">
    <h1 style=" text-align:center ; vertical-align: middle;align-items:center;margin-top: 50%;">${index}. (${category})</h1>
</div>
`



const createHtmlS16_46 = (table) => `
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
        margin-top: 0.5cm;
        float: right;
        margin: 0;
        width: 15%;
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
</tr>`
    ;

const createTableS16_46 = (head, rows, content, total) => `
<table cellpadding="0" cellspacing="0" >
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
</table>
`;

const createPageS16_46 = (table, date, content) => `
  <div class="invoice-box">

    <pp>ส.๑๑๔๕๑/๑</pp>
    </br>
    <pp>แบบ ส.๑๖/๔๖</pp>
    </br>
    <pp>ฉบับที่๑</pp>


    <u><h2  style=" text-align:center ; vertical-align: middle;">ใบเบิกและใบส่งสิ่งของ</h2></u>

    <table>
      <tr>
        <td>
            เลขที่ .....${content.NoDocument}.....
        </td>
        <td>
            <pr>พัสดุส่งเลขที่ .....${content.NoInternal}.....</pr>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <td>
            ลงวันที่ .....${date}.....
        </td>
        <td>
            <pr>ลงวันที่ .....${date}.....</pr>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <td>
            เบิกจากงานคลังพัสดุ .....${content.SourceWarehouseName}.....
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <td>
            ผู้เบิก .....${content.CreatedByUserNameTh}.....
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <td>
            ให้ส่งสิ่งของไปที่ .....${content.DestWarehouseName}.....
        </td>
      </tr>
    </table>

  
    ${table}


    <table>
      <tr class="item2">
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ลงชื่อผู้เบิก......................................
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">   
        </td>
      </tr>
    </table>

    <table>
      <tr class="item2">
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ตำแหน่ง........................................
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            บันทึกเสนอ........................................
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ตรวจแล้วถูกต้อง
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
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            .....................................................
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ........................................
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ........................................
        </td>
      </tr>
    </table>

    <table>
      <tr class="item2">
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ตำแหน่ง........................................
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
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ได้รับของตามรายการข้างบนนี้ ถูกต้องแล้ว
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ส่งผ่านจ่ายได้........................................
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">   
        </td>
      </tr>
    </table>

    <table>
      <tr class="item2">
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ........................................ผู้รับ
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">   
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">   
        </td>
      </tr>
    </table>

    <table>
      <tr class="item2">
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            (........................................)
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">
            ........................................
        </td>
        <td style="width: 33%; text-align:center ; vertical-align: middle;">   
        </td>
      </tr>
    </table>

    <table>
    <tr class="item2">
      <td style="width: 33%; text-align:center ; vertical-align: middle;">
      ตำแหน่ง........................................
      </td>
      <td style="width: 33%; text-align:center ; vertical-align: middle;">
          แทนหัวหน้ากองจัดการพัสดุ </br> ปฎิบัติการแทน ผู้อำนวยการฝ่ายการพัสดุ
      </td>
      <td style="width: 33%; text-align:center ; vertical-align: middle;">   
      </td>
    </tr>
  </table>

  



  </div>
`;





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
<td style=" text-align:center ; vertical-align: middle;">${item.left_month_unit}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.left_month_price}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.get_month_unit}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.get_month_price}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.from_accept}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.internal_item_create_on}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.petition_item_create_on}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.pay_month_unit}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.pay_month_price}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.balance_month_unit}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.balance_month_price}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.pay_for_internal_item}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.type}</td>
</tr>`
    ;

const createRowB22Page2 = (item) =>
    `<tr class="item">

<td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
<td style=" text-align:left ; vertical-align: middle;">${item.description}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.unit}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.left_month_unit}</td>
<td style=" text-align:center ; vertical-align: middle;">${item.left_month_price}</td>
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
      <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.from_accept}</td>
      <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.internal_item_create_on}</td>
      <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.petition_item_create_on}</td>
      <td style=" text-align:center; vertical-align: middle;" colSpan="2">จ่ายเดือนนี้</td>
      <td style=" text-align:center; vertical-align: middle;" colSpan="2">คงเหลือ</td>
      <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.pay_for_internal_item}</td>
      <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.type}</td>
    </tr>
    <tr class="heading" >
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.left_month_unit}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.left_month_price}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.get_month_unit}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.get_month_price}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.pay_month_unit}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.pay_month_price}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.balance_month_unit}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.balance_month_price}</td>
    </tr>
    ${rows}
  </table>
`;

const createTableB22Page2 = (head, rows) => `
  <table cellpadding="0" cellspacing="0" >
    <tr class="heading">
      <td  style="width: 4%; text-align:center ; vertical-align: middle;"  rowspan="2">${head.item_id}</td>
      <td  style="width: 36%; text-align:center ; vertical-align: middle;" rowspan="2">${head.description}</td>
      <td  style="width: 10%; text-align:center ; vertical-align: middle;" rowspan="2">${head.unit}</td>
      <td style=" text-align:center; vertical-align: middle;" colSpan="2">รับเดือนนี้</td>
    </tr>
    <tr class="heading" >
        <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_unit}</td>
        <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_price}</td>
    </tr>
    ${rows}

    <tr class="item">
    <td style=" text-align:center ; vertical-align: middle;"></td>
    <td style=" text-align:center ; vertical-align: middle; "></td>
    <td style=" text-align:center ; vertical-align: middle; ">รวม</td>
    <td style=" text-align:center ; vertical-align: middle;">0</td>
    <td style=" text-align:center ; vertical-align: middle;"></td>
  </tr>
  </table>
`;

const createPageB22Page1 = (table, date) => `
<div class="invoice-box">
  <pp>แบบ บ.๒๒</pp>
  <h3  style=" text-align:center ; vertical-align: middle;">บัญชีรายละเอียดแสดงรายการ รับ-จ่าย สิ่งของและคงเหลือ</h3>
  <h3  style=" text-align:center ; vertical-align: middle; margin-bottom: 0.5cm;margin: 0">ประจำเดือน ${date}</h3>
  ${table}
</div>
`;

const createPageB22Page2 = (table, inventory, date) => `
<div class="invoice-box">
  <h3  style=" text-align:center ; vertical-align: middle;">บัญชีรายละเอียดแสดงรายรับสิ่งของตอน ${inventory}</h3>
  <h3  style=" text-align:center ; vertical-align: middle; margin-bottom: 0.5cm;margin: 0">ประจำเดือน ${date}</h3>
  ${table}
</div>
`;



const createHtmlS101 = (table) => `
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
        margin-top: 0.5cm;
        float: right;
        margin: 0;
        width: 15%;
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

const createPageS101Page1 = (date, content) => `
  <div class="invoice-box">
    <pp>แบบ สส. 101</pp>
    <h2  style=" text-align:center ; vertical-align: middle;">ฝ่ายกรอาณัติสัญญาณและโทรคมนาคม การรถไฟ</h2>
    

    
    <table>
        <tr>
        <td>
            <pr>เลขที่ .....${content.NoInternal}.....</pr>
        </td>
        </tr>
    </table>

    <table>
        <tr>
        <td>
            รายงานการตรวจซ่อมอุปกรณ์แขวง .....${content.NoInternal}.....
        </td>
        <td>
            <pr>วันที่ .....${content.NoInternal}.....</pr>
        </td>
        </tr>
    </table>


  

    <table cellpadding="0" cellspacing="0" >
        <tr class="item">
            <td class="item" style="width: 61%; text-align:left ; vertical-align: middle; border: 0px solid #ffffff;background:#ffffff" >(1) ชนิดของงาน <label>ติดตั้ง</label> <input type="checkbox" /> <label>บำรุงรักษา</label> <input type="checkbox" /> <label>ซ่อมแซม</label><input type="checkbox"/></td>
            <td  style="width: 15%; text-align:center ; vertical-align: middle; border: 0px solid #ffffff;background:#ffffff"></td>
            <td  style="width: 6%; text-align:center; vertical-align: middle;" >เวลา</td>
            <td  style="width: 6%; text-align:center; vertical-align: middle;" >วันที่</td>
            <td style="width: 6%; text-align:center; vertical-align: middle;" >เดือน</td>   
            <td style="width: 6%; text-align:center; vertical-align: middle;" >พ.ศ.</td>  
        </tr>
        <tr class="item">
            <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;">(2) ได้รับแจ้งเหตุจาก .....${content.NoInternal}.....</td>
            <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;">วันเวลาที่รับแจ้ง</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
        </tr>
        <tr class="item">
            <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;">    โดยจดหมายหรือโทรเลขที่ .....${content.NoInternal}.....</td>
            <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;">วันเวลาที่เกิดเหตุ</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
        </tr>
        <tr class="item">
            <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;">(3) งาน .....${content.NoInternal}.....</td>
            <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;">ออกเดินทาง</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
        </tr>
        <tr class="item">
            <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;">(4) เดินทางโดย .....${content.NoInternal}.....</td>
            <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;">เดินทางถึง</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
        </tr>
        <tr class="item">
            <td style=" text-align:left ; vertical-align: middle; border: 0px solid #eee;">(5) ระบบที่ตรวจซ่อม</td>
            <td style=" text-align:center ; vertical-align: middle; border: 0px solid #eee;">วันเวลาแล้วเสร็จ</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;" >-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
            <td style=" text-align:center ; vertical-align: middle;">-</td>
        </tr>
  </table>

   
 

    <table >
      <tr class="item2">
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
            ก. ระบบอาณัติสัญญาณ .....${content.NoInternal}.....
        </td>
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
            ข. ระบบสายส่ง .....${content.NoInternal}.....
        </td>
           
      </tr>
    </table>

    <table >
      <tr class="item2">
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
            ค. ระบบเครื่องกั้นถนน .....${content.NoInternal}.....
        </td>
        <td style="width: 40%; text-align:left ; vertical-align: middle;">
            ง. ระบบเครื่องทางสะดวก .....${content.NoInternal}.....
        </td>
           
      </tr>
    </table>
    <table >
    <tr class="item2">
      <td style="width: 40%; text-align:left ; vertical-align: middle;">
          จ. ระบบโทรศัพท์ .....${content.NoInternal}.....
      </td>
      <td style="width: 40%; text-align:left ; vertical-align: middle;">
          ฉ. ระบบไฟฟ้า .....${content.NoInternal}.....
      </td>
         
    </tr>
  </table>

  <table >
    <tr class="item2">
      <td style="width: 40%; text-align:left ; vertical-align: middle;">
          ช. ระบบโทรพิมพ์ .....${content.NoInternal}.....
      </td>
      <td style="width: 40%; text-align:left ; vertical-align: middle;">
          ซ. ระบบวิทยุ .....${content.NoInternal}.....
      </td>
         
    </tr>
  </table>

  <table >
    <tr class="item2">
      <td style="width: 40%; text-align:left ; vertical-align: middle;">
          ฌ. ระบบอิเลคทรอนิคส์ .....${content.NoInternal}.....
      </td>
      <td style="width: 40%; text-align:left ; vertical-align: middle;">
          
      </td>
    </tr>
  </table>

    <table>
        <tr>
        <td>
            (6) ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานี/ตำแหน่งที่ตั้ง) .....${content.NoInternal}.....
        </td>
        </tr>
    </table>

    <table>
        <tr>
        <td>
            (7) ซื้ออุปกรณ์ที่บำรุงรักษา .....${content.NoInternal}.....
        </td>
        </tr>
    </table>
    
    <table>
        <tr>
        <td>
            (8) สาเหตุและอาการเสียโดยสรุป .....${content.NoInternal}.....
        </td>
        </tr>
    </table>       

    <table>
        <tr>
        <td>
            (9) ขบวนรถที่ .....${content.NoInternal}..... เสียเวลาเพราะเหตุนี้ .....${content.NoInternal}..... นาที
        </td>
        </tr>
    </table>  

    <table>
        <tr>
        <td>
            (10) สรุปการแก้ไขและการซ่อมแซม .....${content.NoInternal}.....
        </td>
        </tr>
    </table>   

    <table>
        <tr>
        <td>
            (11) ยังไม่ได้จัดการแก้ไขเพราะ .....${content.NoInternal}.....
        </td>
        </tr>
    </table>   

    <table>
        <tr>
        <td>
            (12) ผู้ควบคุมทดสอบ ชื่อ .....${content.NoInternal}..... ตำแหน่ง .....${content.NoInternal}..... ลงนาม .....${content.NoInternal}....
        </td>
        </tr>
    </table>   

    <table>
        <tr>
        <td>
            (13) ผู้ควบคุมแก้ไข ชื่อ .....${content.NoInternal}..... ตำแหน่ง .....${content.NoInternal}..... ลงนาม .....${content.NoInternal}....
        </td>
        </tr>
    </table> 

    <table>
        <tr>
        <td>
            (14) รายชื่อผู้ร่วมวาน (ชื่อและตำแหน่ง) .....${content.NoInternal}..... 
        </td>
        </tr>
    </table>   

    <table>
        <tr>
        <td>
            (15) ข้าพเจ้ารับรองว่าข้อความข้างบนนี้เป็นความจริง
        </td>
        <td>
            <pr>(ลงชื่อ) .....${content.NoInternal}..... </pr>
        </td>
        </tr>
    </table> 

    <table>
        <tr>
      
        <td>
            <pr>(.....${content.NoInternal}.....)</pr>
        </td>
        </tr>
    </table>

    <table>
        <tr>
        
        <td>
            <pr>ตำแหน่ง .....${content.NoInternal}..... </pr>
        </td>
        </tr>
    </table> 


  </div>
`;

const createPageS101Page2 = (table, date, content) => `
  <div class="invoice-box" >
    <table style="margin-top: 1cm;">
        <tr>
        <td>
            (16) รายละเอียดมีดังต่อไปนี้ .....${content.NoInternal}.....
        </td>
        </tr>
    </table>
    <table>
        <tr>
        <td>
            (17) รายการอะไหล่ที่เปลี่ยนซ่อมหรือค่าเสียหาย
        </td>
        </tr>
    </table>
    ${table}
    <table>
        <tr>
        <td>
            (18) ความเห็นของนายตรวจลายหัวหน้าแขวง .....${content.NoInternal}.....
        </td>
        </tr>
    </table>

    <table>
        <tr>
        <td>
            <pr>(ลงชื่อ) .....${content.NoInternal}.....</pr>
        </td>
        </tr>
    </table>

    <table>
    <tr>
    <td>
        <pr>นายตรวจสายหัวหน้าแขวง .....${content.NoInternal}.....</pr>
    </td>
    </tr>
</table>

  </div>
`;

const createPageS101Page3 = (date, content) => `
  <div class="invoice-box" >


    <table style="margin-top: 1cm;">
      <tr class="item2">
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
            <img src=${img}   >
        </td>
       
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
            <img src=${img}   >
        </td>
        
      </tr>
    </table>
    <table >
      <tr class="item2">
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
            <img src=${img} >
        </td>
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
            <img src=${img}  >
        </td>
           
      </tr>
    </table>
    <table >
      <tr class="item2">
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
            <img src=${img}  >
        </td>
        <td style="width: 40%; text-align:center ; vertical-align: middle;">
            <img src=${img}  >
        </td>
            
      </tr>
    </table>
    
  </div>
`;

const createTableSS101 = (head, rows) => `
<table cellpadding="0" cellspacing="0" >
  <tr class="heading" >
      <td  style="width: 5%; text-align:center ; vertical-align: middle;">${head.item_id}</td>
      <td  style="width: 45%; text-align:center ; vertical-align: middle;">${head.description}</td>
      <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.unit}</td>
      <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.quantity}</td>
      <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.internal_item_id}</td>
      <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.remark}</td>
  </tr>
  ${rows}
</table>
`;


const createRowSS101 = (item) =>
    `<tr class="item">
  <td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
  <td style=" text-align:left ; vertical-align: middle;">${item.description}</td>
  <td style=" text-align:center ; vertical-align: middle;">${item.unit}</td>
  <td style=" text-align:center ; vertical-align: middle;">${item.quantity}</td>
  <td style=" text-align:right ; vertical-align: middle;">${item.internal_item_id}</td>
  <td style=" text-align:right ; vertical-align: middle;">${item.remark}</td>
</tr>`
    ;





const createHtmlReport = (table) => `
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

const createTableReportPage1 = (head, rows) => `
    <table cellpadding="0" cellspacing="0" >
      <tr class="heading">
        <td  style="width: 4%; text-align:center ; vertical-align: middle;"  rowspan="2">${head.item_id}</td>
        <td  style="width: 26%; text-align:center ; vertical-align: middle;" rowspan="2">${head.description}</td>
        <td  style="width: 5%; text-align:center ; vertical-align: middle;" rowspan="2">${head.unit}</td>
        <td style=" text-align:center; vertical-align: middle;" colSpan="2">เหลือเดือนก่อน</td>
        <td style=" text-align:center; vertical-align: middle;" colSpan="2">รับเดือนนี้</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.from_accept}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.internal_item_create_on}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.petition_item_create_on}</td>
        <td style=" text-align:center; vertical-align: middle;" colSpan="2">จ่ายเดือนนี้</td>
        <td style=" text-align:center; vertical-align: middle;" colSpan="2">คงเหลือ</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.pay_for_internal_item}</td>
        <td  style="width: 5%; text-align:center; vertical-align: middle;" rowspan="2">${head.type}</td>
      </tr>
      <tr class="heading" >
          <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.left_month_unit}</td>
          <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.left_month_price}</td>
          <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.get_month_unit}</td>
          <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.get_month_price}</td>
          <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.pay_month_unit}</td>
          <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.pay_month_price}</td>
          <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.balance_month_unit}</td>
          <td  style="width: 5%; text-align:center; vertical-align: middle;">${head.balance_month_price}</td>
      </tr>
      ${rows}
    </table>
  `;

const createRowReportPage1 = (item) =>
    `<tr class="item">
    <td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
    <td style=" text-align:left ; vertical-align: middle;">${item.description}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.unit}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_unit}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_price}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.get_month_unit}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.get_month_price}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.from_accept}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.internal_item_create_on}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.petition_item_create_on}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.pay_month_unit}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.pay_month_price}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.balance_month_unit}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.balance_month_price}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.pay_for_internal_item}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.type}</td>
    </tr>`
    ;

const createRowReportPage2_1 = (item) =>
    `<tr class="item">
    
    <td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
    <td style=" text-align:left ; vertical-align: middle;">${item.description}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.unit}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_unit}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_price}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_sum}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.remark}</td>
    </tr>`
    ;


const createRowReportPage2_2 = (item) =>
    `<tr class="item">
    
    <td style=" text-align:center ; vertical-align: middle;">${item.item_id}</td>
    <td style=" text-align:left ; vertical-align: middle;">${item.name}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.positional}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_unit}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_price}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_sum}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_sum}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.left_month_sum}</td>
    <td style=" text-align:center ; vertical-align: middle;">${item.remark}</td>
    </tr>`
    ;

const createTableReportPage2_1 = (head, rows) => `
      <table cellpadding="0" cellspacing="0" >
        <tr class="heading">
          <td  style="width: 4%; text-align:center ; vertical-align: middle;"  rowspan="2">${head.item_id}</td>
          <td  style="width: 36%; text-align:center ; vertical-align: middle;" rowspan="2">${head.description}</td>
          <td  style="width: 10%; text-align:center ; vertical-align: middle;" rowspan="2">${head.unit}</td>
          <td style=" text-align:center; vertical-align: middle;" >ราคา/หน่วย</td>
          <td style=" text-align:center; vertical-align: middle;" >จำนวน</td>
          <td style=" text-align:center; vertical-align: middle;" >รวมเป็นเงิน</td>
          <td  style="width: 10%; text-align:center ; vertical-align: middle;" rowspan="2">${head.remark}</td>
        </tr>
        <tr class="heading" >
            <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_unit}</td>
            <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_price}</td>
            <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_sum}</td>
        </tr>
        ${rows}
    
        <tr class="item">
    
            <td style=" text-align:center ; vertical-align: middle;"></td>
            <td style=" text-align:left ; vertical-align: middle;">รวมเป็นเงินทั้งสิ้น</td>
            <td style=" text-align:center ; vertical-align: middle;"></td>
            <td style=" text-align:center ; vertical-align: middle;">}</td>
            <td style=" text-align:center ; vertical-align: middle;"></td>
            <td style=" text-align:center ; vertical-align: middle;"></td>
            <td style=" text-align:center ; vertical-align: middle;"></td>
        </tr>
      </table>
    `;


const createTableReportPage2_2 = (head, rows) => `
    <table cellpadding="0" cellspacing="0" >
      <tr class="heading">
        <td  style="width: 4%; text-align:center ; vertical-align: middle;"  rowspan="2">${head.item_id}</td>
        <td  style="width: 36%; text-align:center ; vertical-align: middle;" rowspan="2">${head.name}</td>
        <td  style="width: 10%; text-align:center ; vertical-align: middle;" rowspan="2">${head.positional}</td>
        <td style=" text-align:center; vertical-align: middle;" >ค่าแรงวันละ</td>
        <td style=" text-align:center; vertical-align: middle;" >ค่าเบี้ยเลี้ยง</td>
        <td style=" text-align:center; vertical-align: middle;" >ค่าที่พัก</td>
        <td style=" text-align:center; vertical-align: middle;" >รวมวัน</td>
        <td style=" text-align:center; vertical-align: middle;" >รวมเป็นเงิน</td>
        <td  style="width: 10%; text-align:center ; vertical-align: middle;" rowspan="2">${head.remark}</td>
      </tr>
      <tr class="heading" >
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_unit}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_price}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_sum}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_sum}</td>
          <td  style="width: 10%; text-align:center; vertical-align: middle;">${head.left_month_sum}</td>
      </tr>
      ${rows}
  
    </table>
  `;




const createPageReportPage1 = (table, date) => `
    <div class="invoice-box">
      <h3  style=" text-align:center ; vertical-align: middle;">งานระบบเสาสาย</h3>
      <h3  style=" text-align:center ; vertical-align: middle;">บัญชีแสดงรายการ รับ-จ่าย สิ่งของ</h3>
      <h3  style=" text-align:center ; vertical-align: middle; margin-bottom: 0.5cm;margin: 0">ประจำเดือน ${date}</h3>
      ${table}
    </div>
    `;

const createPageReportPage2 = (table1, table2) => `
    <div class="invoice-box">
      <h3  style=" text-align:center ; vertical-align: middle; margin-bottom: 0.5cm;margin: 0">รายการวัสดุของที่ใช้ดำเนินการ</h3>
      ${table1}
      <h3  style=" text-align:center ; vertical-align: middle; margin-bottom: 0.5cm;margin: 0">ผู้ปฎิบัติการดังนี้</h3>
      ${table2}
    </div>
    `;





export const exportPDF = (routeLocation, valuesContext) => new Promise((resolve, reject) => {
    if (routeLocation === '/report-s-1') {
        let newDate = new Date()
        let date = newDate.getDate();
        let mouth = newDate.getMonth() + 1;
        let year = newDate.getFullYear() + 543;
        if (mouth === Number(valuesContext.mouth_id) && year === Number(valuesContext.year_id)) {
            console.log("ccccc")
        } else {
            date = 30
        }
        mouth = valuesContext.mouth.find((element) => {
            return element.id === mouth;
        })
        let create_on = date + " " + mouth.mouth + " " + year;
        let filterResult = valuesContext.line_items.sort(function (a, b) {
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

            filterResult_type.map((item) => {
                var myObj = {
                    "item_id": line_number,
                    "description": item.item_description_th,
                    "internal_item_id": item.internal_item_id,
                    "unit": item.uom_name,
                    "quantity": item.current_unit_count,
                    "uom_group_id": item.committed_unit_count,
                    "per_unit_price": item.pricing.average_price
                };
                line_number = line_number + 1;
                total = total + item.committed_unit_count
                line_items.push(myObj)
            })
            r[keyss] = {
                "Totol": total,
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
                "uom_group_id": "รวมเป็นเงิน",
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
        console.log(head_doc)
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
    }
    else if (routeLocation === '/inventory-transfer') {

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
                "DestWarehouseName": valuesContext.status_name_th,
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
    }
    else if (routeLocation === '/warehouse') {


        const data_json = {
            "HeadersTilte": "บ.22",
            "CreateOn": "30 กันยายน 2562",
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
                    "from_accept": "รับจาก",
                    "internal_item_create_on": "ใบส่งเลขที่ลงวันที่",
                    "petition_item_create_on": "ใบส่งเลขที่ลงวันที่",
                    "pay_month_unit": "จำนวน",
                    "pay_month_price": "ราคา",
                    "balance_month_unit": "จำนวน",
                    "balance_month_price": "ราคา",
                    "pay_for_internal_item": "จ่ายให้ใครใบส่งเลขที่ใช้งานอะไร",
                    "type": "ประเภทบัญชี2031515"

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
                    "Item": [
                        {
                            "item_id": "ลำดับที่",
                            "description": "รายการ",
                            "unit": "หน่วย",
                            "left_month_unit": "จำนวน",
                            "left_month_price": "ราคา",
                            "get_month_unit": "จำนวน",
                            "get_month_price": "ราคา",
                            "from_accept": "รับจาก",
                            "internal_item_create_on": "ใบส่งเลขที่ลงวันที่",
                            "petition_item_create_on": "ใบส่งเลขที่ลงวันที่",
                            "pay_month_unit": "จำนวน",
                            "pay_month_price": "ราคา",
                            "balance_month_unit": "จำนวน",
                            "balance_month_price": "ราคา",
                            "pay_for_internal_item": "จ่ายให้ใครใบส่งเลขที่ใช้งานอะไร",
                            "type": "ประเภทบัญชี2031515"
                        },
                        {
                            "item_id": "ลำดับที่",
                            "description": "รายการ",
                            "unit": "หน่วย",
                            "left_month_unit": "จำนวน",
                            "left_month_price": "ราคา",
                            "get_month_unit": "จำนวน",
                            "get_month_price": "ราคา",
                            "from_accept": "รับจาก",
                            "internal_item_create_on": "ใบส่งเลขที่ลงวันที่",
                            "petition_item_create_on": "ใบส่งเลขที่ลงวันที่",
                            "pay_month_unit": "จำนวน",
                            "pay_month_price": "ราคา",
                            "balance_month_unit": "จำนวน",
                            "balance_month_price": "ราคา",
                            "pay_for_internal_item": "จ่ายให้ใครใบส่งเลขที่ใช้งานอะไร",
                            "type": "ประเภทบัญชี2031515"
                        }, {
                            "item_id": "ลำดับที่",
                            "description": "รายการ",
                            "unit": "หน่วย",
                            "left_month_unit": "จำนวน",
                            "left_month_price": "ราคา",
                            "get_month_unit": "จำนวน",
                            "get_month_price": "ราคา",
                            "from_accept": "รับจาก",
                            "internal_item_create_on": "ใบส่งเลขที่ลงวันที่",
                            "petition_item_create_on": "ใบส่งเลขที่ลงวันที่",
                            "pay_month_unit": "จำนวน",
                            "pay_month_price": "ราคา",
                            "balance_month_unit": "จำนวน",
                            "balance_month_price": "ราคา",
                            "pay_for_internal_item": "จ่ายให้ใครใบส่งเลขที่ใช้งานอะไร",
                            "type": "ประเภทบัญชี2031515"
                        }
                    ]
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
                for (var i = 0; i < data_json.ItemInWarehouse[id].Item.length; i += 2) {
                    R.push(data_json.ItemInWarehouse[id].Item.slice(i, i + 2));
                }
                let page = R;
                for (let i = 0; i < page.length; i++) {
                    const rows = page[i].map(createRowB22Page1).join('');
                    const table = createTableB22Page1(data_json.Headers.Page_1, rows);
                    const tablePage = createPageB22Page1(table, data_json.CreateOn)
                    pageAll = pageAll + tablePage
                }
            }
            else {
                var R = [];
                for (var i = 0; i < data_json.ItemInWarehouse[id].Item.length; i += 2) {
                    R.push(data_json.ItemInWarehouse[id].Item.slice(i, i + 2));
                }
                let page = R;
                for (let i = 0; i < page.length; i++) {
                    const rows = page[i].map(createRowB22Page2).join('');
                    const table = createTableB22Page2(data_json.Headers.Page_2, rows);
                    const tablePage = createPageB22Page2(table, "", data_json.CreateOn)
                    pageAll = pageAll + tablePage
                }
            }

        })
        const html = createHtmlB22(pageAll);
        return resolve(html);
    }
    else if (routeLocation === '/ss-101') {


        const data_json = {
            "HeadersTilte": "สส.101",
            "CreateOn": valuesContext.created_on,
            "Content": {
                "NoDocument": valuesContext.document_id,
                "NoInternal": valuesContext.internal_document_id,
                "SourceWarehouseName": valuesContext.src_warehouse_id,
                "CreatedByUserNameTh": valuesContext.created_by_user_employee_id,
                "DestWarehouseName": valuesContext.status_name_th,
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
            "ItemInWarehouse": [
                {
                    "item_id": "ข้อที่",
                    "description": "รายการสิ่งของ",
                    "internal_item_id": "สิ่งของเลขที่",
                    "unit": "หน่วย",
                    "price_quantity": "เบิกจำนวน",
                    "quantity": "จ่ายจำนวน",
                    "price": "บาท",
                    "type": "สด."
                }
            ],
            "ApprovalBy": {



            }
            ,
            "Images": [],
            "Totol": total
        }
        let pageAll = ``;

        const tablePage = createPageS101Page1(data_json.CreateOn, data_json.Content)
        pageAll = pageAll + tablePage

        var R = [];
        for (var i = 0; i < data_json.ItemInWarehouse.length; i += 25) {
            R.push(data_json.ItemInWarehouse.slice(i, i + 25));
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
            console.log(rows)
            const table = createTableSS101(data_json.Headers, rows);
            const tablePage2 = createPageS101Page2(table, data_json.CreateOn, data_json.Content)
            pageAll = pageAll + tablePage2
        }


        const tablePage3 = createPageS101Page3(data_json.CreateOn, data_json.Content)
        pageAll = pageAll + tablePage3

        const html = createHtmlS101(pageAll);
        return resolve(html);



    }

})







export default useExportPdfInitializer;