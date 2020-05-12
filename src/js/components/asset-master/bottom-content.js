import React from 'react';
import Document from '../../../images/document.svg'
import '../../../css/style.css'
import '../../../css/tabs.css'
import '../../../css/grid12.css';
import { connect } from 'react-redux'
import Files from '../common/files'

class BottomContent extends React.Component {





  checkActionMode = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อหน่วยนับการนำเข้า</p></div>
            <div className="grid_3 ">
              <input className="cancel-default grid_2 mt-1 " disabled="disabled" defaultValue={this.props.document_show.import_name} type="text" />
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">จำนวนต่อหน่วยนำเข้า</p></div>
            <div className="grid_3 ">
              <input className="cancel-default grid_2 mt-1 " disabled="disabled" defaultValue={this.props.document_show.import_quantity} type="text" />
              <p className="cancel-default grid_1 float-right ">Pack</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
            <div className="grid_3 ">
              <input className="cancel-default grid_2 mt-1 " type="text" disabled="disabled" defaultValue={this.props.document_show.depreciation_per_year} />
              <p className="cancel-default grid_1 float-right ">บาท</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
            <div className="grid_2 ">
              <select className="edit-select grid_2 " disabled="disabled">
                {current.props.depreciation_type.map(function (depreciation_type, index) {
                  if (current.props.document_show.depreciation_type === depreciation_type.status) {
                    return <option defaultValue={depreciation_type.id} key={index} selected> {depreciation_type.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12 mt-5">
            <div className="grid_2">
              <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="option1" />
              <label htmlFor="Radio1" className="cancel-default d-inline">เปิดการใช้งาน</label>
            </div>
          </div>
          <div className="grid_12 ">
            <div className="grid_2">
              <input className="d-inline" type="radio" name="RadioOptions" id="Radio2" value="option2" />
              <label htmlFor="Radio2" className="cancel-default d-inline">ปิดการใช้งาน</label>
            </div>
          </div>
          <div className="grid_12 mt-1">
            <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_8">
              <textarea className="edit" name="Text1" cols="40" rows="2" disabled="disabled" defaultValue={this.props.document_show.note}></textarea>
            </div>
          </div>
        </>)
    }
    if (mode === "edit") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อหน่วยนับการนำเข้า</p></div>
            <div className="grid_3 ">
              <input className="cancel-default grid_2 mt-1 " defaultValue={this.props.document_show.import_name} onChange={(e) => this.props.onChangeImportName(e)} type="text" />
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">จำนวนต่อหน่วยนำเข้า</p></div>
            <div className="grid_3 ">
              <input className="cancel-default grid_2 mt-1 " defaultValue={this.props.document_show.import_quantity} onChange={(e) => this.props.onChangeImportQuantity(e)} type="text" />
              <p className="cancel-default grid_1 float-right ">Pack</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
            <div className="grid_3 ">
              <input className="cancel-default grid_2 mt-1 " type="text" onChange={(e) => this.props.onChangeDepPerYear(e)} defaultValue={this.props.document_show.depreciation_per_year} />
              <p className="cancel-default grid_1 float-right ">บาท</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
            <div className="grid_2 ">
              <select className="edit-select grid_2 " onChange={(e) => this.props.onChangeDepType(e)}>
                {current.props.depreciation_type.map(function (depreciation_type, index) {
                  if (current.props.document_show.depreciation_type === depreciation_type.status) {
                    return <option defaultValue={depreciation_type.id} key={index} selected> {depreciation_type.status} </option>
                  }
                  else {
                    return <option value={depreciation_type.status} key={index}> {depreciation_type.status} </option>
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12 mt-5">
            <div className="grid_2">
              <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="option1" />
              <label htmlFor="Radio1" className="cancel-default d-inline">เปิดการใช้งาน</label>
            </div>
          </div>
          <div className="grid_12 ">
            <div className="grid_2">
              <input className="d-inline" type="radio" name="RadioOptions" id="Radio2" value="option2" />
              <label htmlFor="Radio2" className="cancel-default d-inline">ปิดการใช้งาน</label>
            </div>
          </div>
          <div className="grid_12 mt-1">
            <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_8">
              <textarea className="edit" name="Text1" cols="40" rows="2" onChange={(e) => this.props.onChangeNote(e)} defaultValue={this.props.document_show.note}></textarea>
            </div>
          </div>

        </>)
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อหน่วยนับการนำเข้า</p></div>
            <div className="grid_3 ">
              <input className="cancel-default grid_2 mt-1 " defaultValue={this.props.document_show_mode_add.import_name} onChange={(e) => this.props.onChangeImportNameAdd(e)} type="text" />
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">จำนวนต่อหน่วยนำเข้า</p></div>
            <div className="grid_3 ">
              <input className="cancel-default grid_2 mt-1 " defaultValue={this.props.document_show_mode_add.import_quantity} onChange={(e) => this.props.onChangeImportQuantityAdd(e)} type="text" />
              <p className="cancel-default grid_1 float-right ">Pack</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
            <div className="grid_3 ">
              <input className="cancel-default grid_2 mt-1 " type="text" onChange={(e) => this.props.onChangeDepPerYearAdd(e)} defaultValue={this.props.document_show_mode_add.depreciation_per_year} />
              <p className="cancel-default grid_1 float-right ">บาท</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
            <div className="grid_2 ">
              <select className="edit-select grid_2 " onChange={(e) => this.props.onChangeDepTypeAdd(e)}>
                {current.props.depreciation_type.map(function (depreciation_type, index) {
                  if (current.props.document_show_mode_add.depreciation_type === depreciation_type.status) {
                    return <option defaultValue={depreciation_type.id} key={index} selected> {depreciation_type.status} </option>
                  }
                  else {
                    return <option value={depreciation_type.status} key={index}> {depreciation_type.status} </option>
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12 mt-5">
            <div className="grid_2">
              <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="option1" />
              <label htmlFor="Radio1" className="cancel-default d-inline">เปิดการใช้งาน</label>
            </div>
          </div>
          <div className="grid_12 ">
            <div className="grid_2">
              <input className="d-inline" type="radio" name="RadioOptions" id="Radio2" value="option2" />
              <label htmlFor="Radio2" className="cancel-default d-inline">ปิดการใช้งาน</label>
            </div>
          </div>
          <div className="grid_12 mt-1">
            <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_8">
              <textarea className="edit" name="Text1" cols="40" rows="2" onChange={(e) => this.props.onChangeNoteAdd(e)} defaultValue={this.props.document_show_mode_add.note}></textarea>
            </div>
          </div>
        </>)
    }
  }

  checkActionMode2 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">กลุ่มของการบำรุงรักษา  </p>
            </div>
            <div className="grid_3">
              <input type="text" className="cancel-default" disabled="disabled" defaultValue={this.props.document_show.group_maintenance}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ชนิดของการบำรุงรักษา  </p>
            </div>
            <div className="grid_3">
              <input type="text" className="cancel-default" disabled="disabled" defaultValue={this.props.document_show.type_maintenance}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>



          <div className="grid_12 mt-2">
            <table className="table-many-column">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "150px" }}>ชื่อรายการบำรุงรักษา</th>
                  <th className="font text-center" style={{ minWidth: "250px" }}>ความถี่ของการบำรุงรักษา</th>
                  <th className="font" style={{ minWidth: "400px" }}>หมายเหตุ</th>
                  <th className="font" style={{ minWidth: "80px" }}>action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.list_show_main.map(function (list_maintenance_show, row) {
                  return (
                    <tr key={row} id={row}>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_maintenance_show.id}</th>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>{list_maintenance_show.name}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "250px" }}>{list_maintenance_show.freq}</td>
                      <td className="edit-padding" style={{ minWidth: "400px" }}>{list_maintenance_show.note}</td>
                      <td className="edit-padding" style={{ minWidth: "80px" }}>
                        <button className="button-blue">แก้ไข</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>)
    }
    if (mode === "edit") {
      return (
        <>

          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">กลุ่มของการบำรุงรักษา  </p>
            </div>
            <div className="grid_3">
              <input type="text" className="cancel-default" onChange={(e) => this.props.onChangeGroupMain(e)} defaultValue={this.props.document_show.group_maintenance}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ชนิดของการบำรุงรักษา  </p>
            </div>
            <div className="grid_3">
              <input type="text" className="cancel-default" onChange={(e) => this.props.onChangeTypeMain(e)} defaultValue={this.props.document_show.type_maintenance}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>



          <div className="grid_12 mt-2">
            <table className="table-many-column">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "150px" }}>ชื่อรายการบำรุงรักษา</th>
                  <th className="font text-center" style={{ minWidth: "250px" }}>ความถี่ของการบำรุงรักษา</th>
                  <th className="font" style={{ minWidth: "400px" }}>หมายเหตุ</th>
                  <th className="font" style={{ minWidth: "80px" }}>action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.list_show_main.map(function (list_maintenance_show, row) {
                  return (
                    <tr key={row} id={row}>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_maintenance_show.id}</th>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>{list_maintenance_show.name}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "250px" }}>{list_maintenance_show.freq}</td>
                      <td className="edit-padding" style={{ minWidth: "400px" }}>{list_maintenance_show.note}</td>
                      <td className="edit-padding" style={{ minWidth: "80px" }}>
                        <button type="button" className="button-blue" id="showModalNoPartMaster" aria-controls="modalNoPartMaster" onClick={(e) => current.props.onClickNoPartMasterEachRow(e)} >แก้ไข</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartMaster" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_main} onChange={(e) => this.props.onChangeNoPartMaster(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartMaster(e)}>ค้นหา</button>
                  </div>
                </div>
                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.props.no_part_show_main.map(function (no_part_show, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show.no_part} </td>
                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartMaster(e)} aria-label="Close active modal" aria-controls="modalNoPartMaster" id="closeModalNoPartMaster" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartMaster" id="closeModalNoPartMaster">กลับ</button>
                </div>

              </div>
            </div>
          </div>




        </>)
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">กลุ่มของการบำรุงรักษา  </p>
            </div>
            <div className="grid_3">
              <input type="text" className="cancel-default" onChange={(e) => this.props.onChangeGroupMainAdd(e)} defaultValue={this.props.document_show_mode_add.group_maintenance}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ชนิดของการบำรุงรักษา  </p>
            </div>
            <div className="grid_3">
              <input type="text" className="cancel-default" onChange={(e) => this.props.onChangeTypeMainAdd(e)} defaultValue={this.props.document_show_mode_add.type_maintenance}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>



          <div className="grid_12 mt-2">
            <table className="table-many-column">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "150px" }}>ชื่อรายการบำรุงรักษา</th>
                  <th className="font text-center" style={{ minWidth: "250px" }}>ความถี่ของการบำรุงรักษา</th>
                  <th className="font" style={{ minWidth: "400px" }}>หมายเหตุ</th>
                  <th className="font" style={{ minWidth: "80px" }}>action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.list_show_mode_add_main.map(function (list_maintenance_show, row) {
                  return (
                    <tr key={row} id={row}>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_maintenance_show.id}</th>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>{list_maintenance_show.name}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "250px" }}>{list_maintenance_show.freq}</td>
                      <td className="edit-padding" style={{ minWidth: "400px" }}>{list_maintenance_show.note}</td>
                      <td className="edit-padding" style={{ minWidth: "80px" }}>
                        <button type="button" className="button-blue" id="showModalNoPartMainAdd" aria-controls="modalNoPartMainAdd" onClick={(e) => current.props.onClickNoPartMainEachRow(e)} >แก้ไข</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartMasterModeAdd" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add_main} onChange={(e) => this.props.onChangeNoPartMasterModeAdd(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartMasterModeAdd(e)}>ค้นหา</button>
                  </div>
                </div>

                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show_mode_add_main.map(function (no_part_show_mode_add, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show_mode_add.no_part} </td>

                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartMasterModeAdd(e)} aria-label="Close active modal" aria-controls="modalNoPartMasterModeAdd" id="closeModalNoPartMaster" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartMasterModeAdd" id="closeModalNoPartMaster">กลับ</button>
                </div>
              </div>
            </div>
          </div>
        </>)
    }
  }

  checkActionMode3 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <><Files />
        </>)
    }
    if (mode === "edit") {
      return (
        <><Files />
        </>)
    }
    if (mode === "add") {
      return (
        <><Files />
        </>)
    }
  }

  checkActionMode4 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ชื่อย่อหน่วยนับ</p>
            </div>
            <div className="grid_2">
              <input type="text" className="cancel-default" disabled="disabled" defaultValue={this.props.document_show.short_name_unit}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อหน่วยนับ</p></div>
            <div className="grid_2 ">
              <input className="cancel-default grid_2 mt-1 " disabled="disabled" defaultValue={this.props.document_show.name_unit} type="text" />
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
            <div className="grid_2 ">
              <select className="edit-select grid_3 " disabled="disabled" >
                {current.props.type_unit.map(function (type_unit, index) {
                  if (current.props.document_show.type_unit === type_unit.status) {
                    return <option defaultValue={type_unit.id} key={index} selected> {type_unit.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">Valuation Method</p></div>
            <div className="grid_2 ">
              <select className="edit-select grid_3 " disabled="disabled">
                {current.props.valuation_method.map(function (valuation_method, index) {
                  if (current.props.document_show.valuation_method === valuation_method.status) {
                    return <option defaultValue={valuation_method.id} key={index} selected> {valuation_method.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>

          <div className="grid_12 mt-2">
            <table className="table-many-column grid_12">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>
                  <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                  <th className="font text-center" style={{ minWidth: "150px" }}>ที่อยู่ปัจจุบัน</th>
                  <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>มูลค่า</th>
                  <th className="font text-center" style={{ minWidth: "120px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "300px" }}>หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>


                {this.props.list_show.map(function (list_show, row) {
                  return (
                    <tr key={row} id={row}>

                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>{list_show.no_part}</td>
                      <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "150px" }}>{list_show.location}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                        <select className="edit-select-table" disabled="disabled">
                          {current.props.list_status.map(function (list_status, index) {
                            if (list_show.status === list_status.status) {
                              return <option defaultValue={list_status.id} key={index} selected> {list_status.status} </option>
                            }
                            else {
                              return null
                            }
                          })}
                        </select>
                      </td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.value}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "120px" }}>{list_show.quility}</td>
                      <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list_show.note}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>)
    }
    if (mode === "edit") {
      return (
        <>

          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ชื่อย่อหน่วยนับ</p>
            </div>
            <div className="grid_2">
              <input type="text" className="cancel-default" onChange={(e) => this.props.onChangeShortNameUnit(e)} defaultValue={this.props.document_show.short_name_unit}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อหน่วยนับ</p></div>
            <div className="grid_2 ">
              <input className="cancel-default grid_2 mt-1 " onChange={(e) => this.props.onChangeNameUnit(e)} defaultValue={this.props.document_show.name_unit} type="text" />
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
            <div className="grid_2 ">
              <select className="edit-select grid_3 " onChange={(e) => this.props.onChangeTypeUnit(e)}>
                {current.props.type_unit.map(function (type_unit, index) {
                  if (current.props.document_show.type_unit === type_unit.status) {
                    return <option defaultValue={type_unit.id} key={index} selected> {type_unit.status} </option>
                  }
                  else {
                    return <option value={type_unit.status} key={index}> {type_unit.status} </option>
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">Valuation Method</p></div>
            <div className="grid_2 ">
              <select className="edit-select grid_3 " onChange={(e) => this.props.onChangeValMethod(e)} >
                {current.props.valuation_method.map(function (valuation_method, index) {
                  if (current.props.document_show.valuation_method === valuation_method.status) {
                    return <option defaultValue={valuation_method.id} key={index} selected> {valuation_method.status} </option>
                  }
                  else {
                    return <option value={valuation_method.status} key={index}> {valuation_method.status} </option>
                  }
                })}
              </select>
            </div>
          </div>

          <div className="grid_12 mt-2">
            <table className="table-many-column grid_12">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>
                  <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                  <th className="font text-center" style={{ minWidth: "150px" }}>ที่อยู่ปัจจุบัน</th>
                  <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>มูลค่า</th>
                  <th className="font text-center" style={{ minWidth: "120px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "300px" }}>หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>


                {this.props.list_show.map(function (list_show, row) {
                  return (
                    <tr key={row} id={row}>

                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                      <td className="edit-padding">
                        <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                          <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRow(e)} />
                          <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                        </div>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "150px" }}>{list_show.location}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                        <select className="edit-select-table" onChange={(e) => current.props.onChangeStatusEachRow(e)}>
                          {current.props.list_status.map(function (list_status, index) {
                            if (list_show.status === list_status.status) {
                              return <option defaultValue={list_status.id} key={index} selected> {list_status.status} </option>
                            }
                            else {
                              return null
                            }
                          })}
                        </select>
                      </td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.value}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "120px" }}>
                        <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRow(e)}></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRow(e)}></input>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>



          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPart" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(e)}>ค้นหา</button>
                  </div>
                </div>
                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.props.no_part_show.map(function (no_part_show, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show.no_part} </td>
                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPart(e)} aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>
                </div>

              </div>
            </div>
          </div>
        </>)
    }
    if (mode === "add") {
      return (
        <>

          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ชื่อย่อหน่วยนับ</p>
            </div>
            <div className="grid_2">
              <input type="text" className="cancel-default" onChange={(e) => this.props.onChangeShortNameUnitAdd(e)} defaultValue={this.props.document_show_mode_add.short_name_unit}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อหน่วยนับ</p></div>
            <div className="grid_2 ">
              <input className="cancel-default grid_2 mt-1 " onChange={(e) => this.props.onChangeNameUnitAdd(e)} defaultValue={this.props.document_show_mode_add.name_unit} type="text" />
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
            <div className="grid_2 ">
              <select className="edit-select grid_3 " onChange={(e) => this.props.onChangeTypeUnitAdd(e)}>
                {current.props.type_unit.map(function (type_unit, index) {

                  return <option defaultValue={type_unit.id} key={index} selected> {type_unit.status} </option>

                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">Valuation Method</p></div>
            <div className="grid_2 ">
              <select className="edit-select grid_3 " onChange={(e) => this.props.onChangeValMethodAdd(e)} >
                {current.props.valuation_method.map(function (valuation_method, index) {

                  return <option defaultValue={valuation_method.id} key={index} selected> {valuation_method.status} </option>

                })}
              </select>
            </div>
          </div>






          <div className="grid_12 mt-2">
            <table className="table-many-column grid_12">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>
                  <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                  <th className="font text-center" style={{ minWidth: "150px" }}>ที่อยู่ปัจจุบัน</th>
                  <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>มูลค่า</th>
                  <th className="font text-center" style={{ minWidth: "120px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "300px" }}>หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>


                {this.props.list_show_mode_add.map(function (list_show, row) {
                  return (
                    <tr key={row} id={row}>

                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                      <td className="edit-padding">
                        <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                          <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} />
                          <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPartModeAdd" aria-controls="modalNoPartModeAdd" onClick={(e) => current.props.onClickNoPartEachRowModeAdd(e)}></i></button>
                        </div>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "150px" }}>{list_show.location}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                        <select className="edit-select-table" onChange={(e) => current.props.onChangeStatusEachRowAdd(e)}>
                          {current.props.list_status.map(function (list_status, index) {
                            if (list_show.status === list_status.status) {
                              return <option defaultValue={list_status.id} key={index} selected> {list_status.status} </option>
                            }
                            else {
                              return null
                            }
                          })}
                        </select>
                      </td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.value}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "120px" }}>
                        <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRowAdd(e)}></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRowAdd(e)}></input>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>


          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartModeAdd" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add} onChange={(e) => this.props.onChangeNoPartModea(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartModeAdd(e)}>ค้นหา</button>
                  </div>
                </div>

                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show_mode_add.map(function (no_part_show_mode_add, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show_mode_add.no_part} </td>

                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartModeAdd(e)} aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart">กลับ</button>
                </div>
              </div>
            </div>
          </div>
        </>)
    }
  }



  // {/* PopUp เลขที่อะไหล่ */}
  // <div className="modal" id="modalNoPart" style={{ display: "none" }}>
  //   <div className="gray-board">
  //     <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
  //     <div className="container_12 edit-padding">
  //       <div className="grid_12">
  //         <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
  //         <div className="grid_8 pull_0">
  //           <input type="text" className="cancel-default grid_3" value={this.props.list_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
  //           <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(e)}>ค้นหา</button>
  //         </div>
  //       </div>
  //       <div className="grid_12">
  //         <table className="table-many-column mt-3">
  //           <thead>
  //             <tr>
  //               <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

  //               <th className="font" style={{ minWidth: "100px" }}>Action</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {current.props.no_part_show.map(function (no_part_show, index) {
  //               return (
  //                 <tr key={index} id={index}>
  //                   <td className="edit-padding"> {no_part_show.no_part} </td>
  //                   <td className="edit-padding text-center">
  //                     <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPart(e)} aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart" >เลือก</button>
  //                   </td>
  //                 </tr>
  //               )
  //             })}
  //           </tbody>
  //         </table>
  //       </div>
  //       <div className="grid_12">
  //         <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>
  //       </div>

  //     </div>
  //   </div>
  // </div>

  // <div className="modal" id="modalNoPartMain" style={{ display: "none" }}>
  //   <div className="gray-board">
  //     <p className="head-title-modal edit">แผนบำรุงรักษา</p>
  //     <div className="container_12 edit-padding">


  //       <div className="grid_12">
  //         <div className="grid_2"><p className="cancel-default">ชือแผนซ่อมบำรุง:</p></div>
  //         <div className="grid_8 pull_0">
  //           <input type="text" className="cancel-default grid_3" />
  //         </div>
  //       </div>

  //       <div className="grid_12">
  //         <div className="grid_2"><p className="cancel-default">ความถี่การซ่อมบำรุง:</p></div>
  //         <div className="grid_7 pull_0">
  //           <input type="text" className="cancel-default grid_3 "></input>
  //           <select className="edit-select-top grid_3 float-right" >
  //             <option defaultValue="0"></option>
  //             <option defaultValue="1">Cosmic Cuttlefish</option>
  //             <option defaultValue="2">Bionic Beaver</option>
  //             <option defaultValue="3">Xenial Xerus</option>
  //           </select>
  //           <p className="cancel-default grid_1 float-right">ครั้งต่อ:</p>
  //         </div>
  //       </div>


  //       <table className="table-many-column ">
  //         <thead>
  //           <tr>
  //             <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
  //             <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
  //             <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
  //             <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
  //             <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
  //             <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr>
  //             <th className="edit-padding text-center" style={{ minWidth: "30px" }}>1</th>
  //             <td className="edit-padding" style={{ minWidth: "130px" }}>tool 223</td>
  //             <td className="edit-padding text-left" style={{ minWidth: "250px" }}>แผนหิน</td>
  //             <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
  //               <select className="edit-select-table">
  //                 <option defaultValue="1">1</option>
  //                 <option defaultValue="2">2</option>
  //               </select>
  //             </td>
  //             <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
  //               แผ่น
  //             </td>
  //             <td className="edit-padding text-left" style={{ minWidth: "300px" }}></td>
  //           </tr>

  //         </tbody>
  //       </table>


  //       <div className="grid_12 ">
  //         <div className="grid_8 pull_0 float-right">
  //           <button className="button-blue edit mt-3 grid_1 float-right p_0" type="button" aria-label="Close active modal" aria-controls="modalNoPartMain" id="closeModalNoPartMain">ยกเลิก</button>
  //           <button className="button-blue edit mt-3  grid_1 float-right p_0" type="button" aria-label="Save active modal" aria-controls="modalNoPartMain" id="closeModalNoPartMain">บันทึก</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>





  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <div id="ทั่วไป" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode(this.props.actionMode)}
              </div>
              <div id="แผนบำรุงรักษา" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode2(this.props.actionMode)}
              </div>

              <div id="แนบไฟล์" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode3(this.props.actionMode)}
              </div>

              <div id="รายการสินทรัพย์" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode4(this.props.actionMode)}
              </div>

            </div>
          </div>
        </div>
      </form>

    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  document_show: state.document_show,
  list_show: state.list_show,
  list_show_main: state.list_show_main,

  depreciation_type: state.depreciation_type,
  type_unit: state.type_unit,
  list_status: state.list_status,
  valuation_method: state.valuation_method,

  list_no_part: state.list_no_part,
  no_part_show: state.no_part_show,
  no_part_show_mode_add: state.no_part_show_mode_add,
  list_show_mode_add: state.list_show_mode_add,


  list_no_part_main: state.list_no_part_main,
  no_part_show_main: state.no_part_show_main,
  no_part_show_mode_add_main: state.no_part_show_mode_add_main,
  list_show_mode_add_main: state.list_show_mode_add_main,

  document_show_mode_add: state.document_show_mode_add,

})

const mapDispatchToProps = (dispatch) => ({



  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onChangeNoPartEachRow: (e) => dispatch(onChangeNoPartEachRow(e)),
  onClickNoPartEachRow: (e) => dispatch(onClickNoPartEachRow(e)),
  onClickSearchPopUpNoPart: (e) => dispatch(onClickSearchPopUpNoPart(e)),
  onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),


  onChangeQuilityEachRow: (e) => dispatch(onChangeQuilityEachRow(e)),
  onChangeNoteEachRow: (e) => dispatch(onChangeNoteEachRow(e)),
  onChangeStatusEachRow: (e) => dispatch(onChangeStatusEachRow(e)),

  onChangeStatusEachRowAdd: (e) => dispatch(onChangeNoteEachRowAdd(e)),
  onChangeQuilityEachRowAdd: (e) => dispatch(onChangeQuilityEachRowAdd(e)),
  onChangeNoteEachRowAdd: (e) => dispatch(onChangeNoteEachRowAdd(e)),

  onChangeNoPartEachRowModeAdd: (e) => dispatch(onChangeNoPartEachRowModeAdd(e)),
  onClickNoPartEachRowModeAdd: (e) => dispatch(onClickNoPartEachRowModeAdd(e)),
  onClickSearchPopUpNoPartModeAdd: (e) => dispatch(onClickSearchPopUpNoPartModeAdd(e)),
  onClickSelectPopUpNoPartModeAdd: (e) => dispatch(onClickSelectPopUpNoPartModeAdd(e)),
  onChangeNoPartModeAdd: (e) => dispatch(onChangeNoPartModeAdd(e)),






  onChangeImportName: (e) => dispatch(onChangeImportName(e)),
  onChangeImportQuantity: (e) => dispatch(onChangeImportQuantity(e)),
  onChangeDepPerYear: (e) => dispatch(onChangeDepPerYear(e)),
  onChangeDepType: (e) => dispatch(onChangeDepType(e)),
  onChangeStatus: (e) => dispatch(onChangeStatus(e)),
  onChangeNote: (e) => dispatch(onChangeNote(e)),
  onChangeShortNameUnit: (e) => dispatch(onChangeShortNameUnit(e)),
  onChangeNameUnit: (e) => dispatch(onChangeNameUnit(e)),
  onChangeTypeUnit: (e) => dispatch(onChangeTypeUnit(e)),
  onChangeValMethod: (e) => dispatch(onChangeValMethod(e)),
  onChangeGroupMain: (e) => dispatch(onChangeGroupMain(e)),
  onChangeTypeMain: (e) => dispatch(onChangeTypeMain(e)),

  onChangeImportNameAdd: (e) => dispatch(onChangeImportNameAdd(e)),
  onChangeImportQuantityAdd: (e) => dispatch(onChangeImportQuantityAdd(e)),
  onChangeDepPerYearAdd: (e) => dispatch(onChangeDepPerYearAdd(e)),
  onChangeDepTypeAdd: (e) => dispatch(onChangeDepTypeAdd(e)),
  onChangeStatusAdd: (e) => dispatch(onChangeStatusAdd(e)),
  onChangeNoteAdd: (e) => dispatch(onChangeNoteAdd(e)),
  onChangeShortNameUnitAdd: (e) => dispatch(onChangeShortNameUnitAdd(e)),
  onChangeNameUnitAdd: (e) => dispatch(onChangeNameUnitAdd(e)),
  onChangeTypeUnitAdd: (e) => dispatch(onChangeTypeUnitAdd(e)),
  onChangeValMethodAdd: (e) => dispatch(onChangeValMethodAdd(e)),
  onChangeGroupMainAdd: (e) => dispatch(onChangeGroupMainAdd(e)),
  onChangeTypeMainAdd: (e) => dispatch(onChangeTypeMainAdd(e)),




  onChangeNoPartMaster: (e) => dispatch(onChangeNoPartMaster(e)),
  onChangeNoPartMasterEachRow: (e) => dispatch(onChangeNoPartMasterEachRow(e)),
  onClickNoPartMasterEachRow: (e) => dispatch(onClickNoPartMasterEachRow(e)),
  onClickSearchPopUpNoPartMaster: (e) => dispatch(onClickSearchPopUpNoPartMaster(e)),
  onClickSelectPopUpNoPartMaster: (e) => dispatch(onClickSelectPopUpNoPartMaster(e)),


  onChangeNoPartMasterEachRowModeAdd: (e) => dispatch(onChangeNoPartMasterEachRowModeAdd(e)),
  onClickNoPartMasterEachRowModeAdd: (e) => dispatch(onClickNoPartMasterEachRowModeAdd(e)),
  onClickSearchPopUpNoPartMasterModeAdd: (e) => dispatch(onClickSearchPopUpNoPartMasterModeAdd(e)),
  onClickSelectPopUpNoPartMasterModeAdd: (e) => dispatch(onClickSelectPopUpNoPartMasterModeAdd(e)),
  onChangeNoPartMasterModeAdd: (e) => dispatch(onChangeNoPartMasterModeAdd(e)),


  onChangePerMasterEachRow: (e) => dispatch(onChangePerMasterEachRow(e)),
  onChangePerMasterEachRowAdd: (e) => dispatch(onChangePerMasterEachRowAdd(e)),
  onChangeFreqMasterEachRow: (e) => dispatch(onChangeFreqMasterEachRow(e)),
  onChangeFreqMasterEachRowAdd: (e) => dispatch(onChangeFreqMasterEachRowAdd(e)),
  onChangeNameMasterEachRow: (e) => dispatch(onChangeNameMasterEachRow(e)),
  onChangeNameMasterEachRowAdd: (e) => dispatch(onChangeNameMasterEachRowAdd(e)),
  onChangeNoteMasterEachRow: (e) => dispatch(onChangeNoteMasterEachRow(e)),
  onChangeNoteMasterEachRowAdd: (e) => dispatch(onChangeNoteMasterEachRowAdd(e)),
  onChangeQuilityMasterEachRow: (e) => dispatch(onChangeQuilityMasterEachRow(e)),
  onChangeQuilityMasterEachRowAdd: (e) => dispatch(onChangeQuilityMasterEachRowAdd(e)),
  onChangeDetailMasterEachRow: (e) => dispatch(onChangeDetailMasterEachRow(e)),
  onChangeDetailMasterEachRowAdd: (e) => dispatch(onChangeDetailMasterEachRowAdd(e)),
  onChangeUnitMasterEachRow: (e) => dispatch(onChangeUnitMasterEachRow(e)),
  onChangeUnitMasterEachRowAdd: (e) => dispatch(onChangeUnitMasterEachRowAdd(e)),


})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);




export const onChangeStatusEachRow = (e) => {
  return {
    type: "ON CHANGE STATUS EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeQuilityEachRow = (e) => {
  return {
    type: "ON CHANGE QUILITY EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoteEachRow = (e) => {
  return {
    type: "ON CHANGE NOTE EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeStatusEachRowAdd = (e) => {

  return {
    type: "ON CHANGE STATUS EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeQuilityEachRowAdd = (e) => {

  return {
    type: "ON CHANGE QUILITY EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoteEachRowAdd = (e) => {
  return {
    type: "ON CHANGE NOTE EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onClickSearchPopUpNoPart = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART",
  }
}
export const onChangeNoPart = (e) => {
  return {
    type: "ON CHANGE NO PART",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPart = (e) => {

  return {
    type: "ON CLICK SELECT POPUP NO PART",
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoPartEachRow = (e) => {

  return {
    type: "ON CHANGE NO PART EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartEachRow = (e) => {

  return {
    type: "ON CLICK NO PART EACH ROW",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}




export const onChangeNoPartEachRowModeAdd = (e) => {

  return {
    type: "ON CHANGE NO PART EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartEachRowModeAdd = (e) => {
  // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  console.log(e.target.parentNode.parentNode.parentNode.parentNode.id)
  return {
    type: "ON CLICK NO PART EACH ROW MODE ADD",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}
export const onClickSearchPopUpNoPartModeAdd = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART ADD MODE",
  }
}
export const onChangeNoPartModeAdd = (e) => {
  return {
    type: "ON CHANGE NO PART MODE ADD",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode.id)
  return {
    type: "ON CLICK SELECT POPUP NO PART MODE ADD",
    rowIndex: e.target.parentNode.parentNode.id
  }
}



//#################################################################



export const onClickSearchPopUpNoPartMaster = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART MASTER",
  }
}
export const onChangeNoPartMaster = (e) => {
  return {
    type: "ON CHANGE NO PART MASTER",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartMaster = (e) => {

  return {
    type: "ON CLICK SELECT POPUP NO PART MASTER",
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoPartMasterEachRow = (e) => {

  return {
    type: "ON CHANGE NO PART MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartMasterEachRow = (e) => {

  return {
    type: "ON CLICK NO PART MASTER EACH ROW",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}

export const onChangeNoPartMasterEachRowModeAdd = (e) => {

  return {
    type: "ON CHANGE NO PART MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartMasterEachRowModeAdd = (e) => {
  // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  console.log(e.target.parentNode.parentNode.parentNode.parentNode.id)
  return {
    type: "ON CLICK NO PART MASTER EACH ROW MODE ADD",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}
export const onClickSearchPopUpNoPartMasterModeAdd = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART MASTER ADD MODE",
  }
}
export const onChangeNoPartMasterModeAdd = (e) => {
  return {
    type: "ON CHANGE NO PART MASTER MODE ADD",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartMasterModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode.id)
  return {
    type: "ON CLICK SELECT POPUP NO PART MASTER MODE ADD",
    rowIndex: e.target.parentNode.parentNode.id
  }
}



export const onChangePerMasterEachRow = (e) => {
  return {
    type: "ON CHANGE PER MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangePerMasterEachRowAdd = (e) => {
  return {
    type: "ON CHANGE PER MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}


export const onChangeFreqMasterEachRow = (e) => {
  return {
    type: "ON CHANGE FREQ MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeFreqMasterEachRowAdd = (e) => {
  return {
    type: "ON CHANGE FREQ MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeNameMasterEachRow = (e) => {
  return {
    type: "ON CHANGE NAME MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeNameMasterEachRowAdd = (e) => {
  return {
    type: "ON CHANGE NAME MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}


export const onChangeNoteMasterEachRow = (e) => {
  return {
    type: "ON CHANGE NOTE MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeNoteMasterEachRowAdd = (e) => {
  return {
    type: "ON CHANGE NOTE MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeQuilityMasterEachRow = (e) => {
  return {
    type: "ON CHANGE QUILITY MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeQuilityMasterEachRowAdd = (e) => {

  return {
    type: "ON CHANGE QUILITY MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}


export const onChangeDetailMasterEachRow = (e) => {
  return {
    type: "ON CHANGE DETAIL MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeDetailMasterEachRowAdd = (e) => {

  return {
    type: "ON CHANGE DETAIL MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}


export const onChangeUnitMasterEachRow = (e) => {
  return {
    type: "ON CHANGE UNIT MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeUnitMasterEachRowAdd = (e) => {

  return {
    type: "ON CHANGE UNIT MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}




//#################################################################











export const onChangeImportName = (e) => {
  return {
    type: "CHANGE IMPORT NAME",
    value: e.target.value
  }
}
export const onChangeImportQuantity = (e) => {
  return {
    type: "CHANGE IMPORT QUANTITY",
    value: e.target.value
  }
}
export const onChangeDepPerYear = (e) => {
  return {
    type: "CHANGE DEPRECIATION PER YEAR",
    value: e.target.value
  }
}
export const onChangeDepType = (e) => {
  return {
    type: "CHANGE DEPRECIATION TYPE",
    value: e.target.value
  }
}
export const onChangeStatus = (e) => {
  return {
    type: "CHANGE STATUS",
    value: e.target.value
  }
}
export const onChangeNote = (e) => {
  return {
    type: "CHANGE NOTE",
    value: e.target.value
  }
}
export const onChangeShortNameUnit = (e) => {
  return {
    type: "CHANGE SHORT NAME UNIT",
    value: e.target.value
  }
}
export const onChangeNameUnit = (e) => {
  return {
    type: "CHANGE NAME UNIT",
    value: e.target.value
  }
}
export const onChangeTypeUnit = (e) => {
  return {
    type: "CHANGE TYPE UNIT",
    value: e.target.value
  }
}

export const onChangeValMethod = (e) => {
  return {
    type: "CHANGE VALUATION METHOD",
    value: e.target.value
  }
}

export const onChangeGroupMain = (e) => {
  return {
    type: "CHANGE GROUP MAINTENANCE",
    value: e.target.value
  }
}

export const onChangeTypeMain = (e) => {
  return {
    type: "CHANGE TYPE MAINTENANCE",
    value: e.target.value
  }
}





export const onChangeImportNameAdd = (e) => {
  return {
    type: "CHANGE IMPORT NAME ADD",
    value: e.target.value
  }
}
export const onChangeImportQuantityAdd = (e) => {
  return {
    type: "CHANGE IMPORT QUANTITY ADD",
    value: e.target.value
  }
}
export const onChangeDepPerYearAdd = (e) => {
  return {
    type: "CHANGE DEPRECIATION PER YEAR ADD",
    value: e.target.value
  }
}
export const onChangeDepTypeAdd = (e) => {
  return {
    type: "CHANGE DEPRECIATION TYPE ADD",
    value: e.target.value
  }
}
export const onChangeStatusAdd = (e) => {
  return {
    type: "CHANGE STATUS ADD",
    value: e.target.value
  }
}
export const onChangeNoteAdd = (e) => {
  return {
    type: "CHANGE NOTE ADD",
    value: e.target.value
  }
}
export const onChangeShortNameUnitAdd = (e) => {
  return {
    type: "CHANGE SHORT NAME UNIT ADD",
    value: e.target.value
  }
}
export const onChangeNameUnitAdd = (e) => {
  return {
    type: "CHANGE NAME UNIT ADD",
    value: e.target.value
  }
}
export const onChangeTypeUnitAdd = (e) => {
  return {
    type: "CHANGE TYPE UNIT ADD",
    value: e.target.value
  }
}

export const onChangeValMethodAdd = (e) => {
  return {
    type: "CHANGE VALUATION METHOD ADD",
    value: e.target.value
  }
}

export const onChangeGroupMainAdd = (e) => {
  return {
    type: "CHANGE GROUP MAINTENANCE ADD",
    value: e.target.value
  }
}

export const onChangeTypeMainAdd = (e) => {
  return {
    type: "CHANGE TYPE MAINTENANCE ADD",
    value: e.target.value
  }
}