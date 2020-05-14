import React from 'react';
import { connect } from 'react-redux'
import '../../../css/style.css'
import '../../../css/tabs.css'
import '../../../css/grid12.css';

class BottomContent extends React.Component {

  checkActionMode2 = (mode) => {
    const current = this;
    if (mode === "search") {

      return (
        <>


          <div className="grid_12 mt-2" style={{ paddingRight: "10px" }}>
            <table className="table-many-column">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}></th>
                  <th className="font text-center" style={{ minWidth: "200px" }}></th>
                  <th className="font text-center" style={{ minWidth: "100px" }}></th>
                  <th className="font text-center" colSpan="5">การดำเนินการ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>สรุปรวม</th>
                  <th className="font text-center" style={{ minWidth: "200px" }}></th>
                </tr>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font text-center" style={{ minWidth: "200px" }}>รายละเอียด</th>
                  <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.พบ.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.หห.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.จข.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.พญ.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.ชพ.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>แขวง</th>
                  <th className="font text-center" style={{ minWidth: "200px" }}>ตอน นตส.ชพ.</th>
                </tr>
              </thead>
              <tbody>

                {this.props.list_show_main.map(function (list_show, row) {
                  return (
                    <tr key={row} id={row}>
                      <td className="edit-padding" style={{ minWidth: "30px" }}>{list_show.id}</td>
                      <td className="edit-padding" style={{ minWidth: "200px" }}>{list_show.detail}</td>
                      <td className="edit-padding" style={{ minWidth: "100px" }}>
                        <select className="edit-select-table">
                          <option defaultValue="1">{list_show.unit}</option>
                        </select>
                      </td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.t1}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.t2}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.t3}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.t4}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.t5}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.t6}</td>
                      <td className="edit-padding" style={{ minWidth: "200px" }}>{list_show.t7}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
            <textarea className="edit grid_8  pull_0 " name="Text1" cols="40" rows="2" disabled="disabled"></textarea>
          </div>

        </>)
    }
    if (mode === "edit") {

      return (
        <>
          <div className="grid_12 mt-2" style={{ paddingRight: "10px" }}>
            <table className="table-many-column">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}></th>
                  <th className="font text-center" style={{ minWidth: "200px" }}></th>
                  <th className="font text-center" style={{ minWidth: "100px" }}></th>
                  <th className="font text-center" colSpan="5">การดำเนินการ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>สรุปรวม</th>
                  <th className="font text-center" style={{ minWidth: "200px" }}></th>
                </tr>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font text-center" style={{ minWidth: "200px" }}>รายละเอียด</th>
                  <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.พบ.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.หห.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.จข.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.พญ.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.ชพ.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>แขวง</th>
                  <th className="font text-center" style={{ minWidth: "200px" }}>ตอน นตส.ชพ.</th>
                </tr>
              </thead>
              <tbody>


                {this.props.list_show_main.map(function (list_show, row) {
                  return (
                    <tr key={row} id={row}>
                      <td className="edit-padding" style={{ minWidth: "30px" }}>{list_show.id}</td>
                      <td className="edit-padding" style={{ minWidth: "200px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.detail} onChange={(e) => current.props.onChangeDetailMainEachRow(e)}></input></td>
                      <td className="edit-padding" style={{ minWidth: "100px" }}>
                        <select className="edit-select-table">
                          <option defaultValue="1">{list_show.unit}</option>
                        </select>
                      </td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t1} onChange={(e) => current.props.onChangeT1MainEachRow(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t2} onChange={(e) => current.props.onChangeT2MainEachRow(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t3} onChange={(e) => current.props.onChangeT3MainEachRow(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t4} onChange={(e) => current.props.onChangeT4MainEachRow(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t5} onChange={(e) => current.props.onChangeT5MainEachRow(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.t6}</td>
                      <td className="edit-padding" style={{ minWidth: "200px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t7} onChange={(e) => current.props.onChangeT7MainEachRow(e)}></input></td>
                    </tr>
                  )
                })}



              </tbody>
            </table>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
            <textarea className="edit grid_8  pull_0 " name="Text1" cols="40" rows="2" ></textarea>
          </div>
        </>)
    }
    if (mode === "add") {

      return (
        <>
          <div className="grid_12 mt-2" style={{ paddingRight: "10px" }}>
            <table className="table-many-column">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}></th>
                  <th className="font text-center" style={{ minWidth: "200px" }}></th>
                  <th className="font text-center" style={{ minWidth: "100px" }}></th>
                  <th className="font text-center" colSpan="5">การดำเนินการ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>สรุปรวม</th>
                  <th className="font text-center" style={{ minWidth: "200px" }}></th>
                </tr>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font text-center" style={{ minWidth: "200px" }}>รายละเอียด</th>
                  <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.พบ.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.หห.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.จข.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.พญ.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.ชพ.</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>แขวง</th>
                  <th className="font text-center" style={{ minWidth: "200px" }}>ตอน นตส.ชพ.</th>
                </tr>
              </thead>
              <tbody>

                {this.props.list_show_mode_add_main.map(function (list_show, row) {
                  return (
                    <tr key={row} id={row}>
                      <td className="edit-padding" style={{ minWidth: "30px" }}>{list_show.id}</td>
                      <td className="edit-padding" style={{ minWidth: "200px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.detail} onChange={(e) => current.props.onChangeDetailMainEachRowAdd(e)}></input></td>
                      <td className="edit-padding" style={{ minWidth: "100px" }}>
                        <select className="edit-select-table">
                          <option defaultValue="1">{list_show.unit}</option>
                        </select>
                      </td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t1} onChange={(e) => current.props.onChangeT1MainEachRowAdd(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t2} onChange={(e) => current.props.onChangeT2MainEachRowAdd(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t3} onChange={(e) => current.props.onChangeT3MainEachRowAdd(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t4} onChange={(e) => current.props.onChangeT4MainEachRowAdd(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t5} onChange={(e) => current.props.onChangeT5MainEachRowAdd(e)}></input></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.t6}</td>
                      <td className="edit-padding" style={{ minWidth: "200px" }}>
                        <input type="text" className="cancel-default float-right" value={list_show.t7} onChange={(e) => current.props.onChangeT7MainEachRowAdd(e)}></input></td>
                    </tr>
                  )
                })}


              </tbody>
            </table>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
            <textarea className="edit grid_8  pull_0 " name="Text1" cols="40" rows="2" ></textarea>
          </div>
        </>)
    }

  }


  checkActionMode3 = (mode) => {
    const current = this;
    if (mode === "search") {

      return (
        <>
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>

              {this.props.list_show.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>{list_show.no_part}</td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table" disabled="disabled">
                        <option defaultValue="1">{list_show.unit}</option>
                      </select>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      {list_show.quility}
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}> {list_show.note}</td>
                  </tr>)
              })}
            </tbody>
          </table>

        </>

      )

    }
    if (mode === "edit") {
      return (
        <>
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>

              {this.props.list_show.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRow(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table" onChange={(e) => current.props.onChangeUnitEachRow(e)}>
                        {current.props.list_unit.map(function (list_unit, index) {
                          if (list_show.unit === list_unit.status) {
                            return <option defaultValue={list_unit.id} key={index} selected> {list_unit.status} </option>
                          }
                          else {
                            return null
                          }
                        })}
                      </select>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRow(e)}></input>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRow(e)}></input>
                    </td>
                  </tr>)
              })}
            </tbody>
          </table>


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

        </>

      )
    }
    if (mode === "add") {

      return (
        <>
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>

              {current.props.list_show_mode_add.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPartModeAdd" aria-controls="modalNoPartModeAdd" onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table" onChange={(e) => current.props.onChangeUnitEachRowAdd(e)}>
                        {current.props.list_unit.map(function (list_unit, index) {
                          if (list_show.unit === list_unit.status) {
                            return <option defaultValue={list_unit.id} key={index} selected> {list_unit.status} </option>
                          }
                          else {
                            return null
                          }
                        })}
                      </select>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRowAdd(e)}></input>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRowAdd(e)}></input>
                    </td>
                  </tr>)
              })}
            </tbody>
          </table>


          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartModeAdd" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add} onChange={(e) => this.props.onChangeNoPartModeAdd(e)} />
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

        </>
      )

    }
  }
  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <div id="แผนการดำเนินงาน" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode2(this.props.actionMode)}
              </div>

              <div id="อุปกรณ์ที่ต้องนำไปปฎิบัติงาน" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode3(this.props.actionMode)}
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
  list_unit: state.list_unit,
  list_job: state.list_job,
  list_status_asset1: state.list_status_asset1,
  document_show_mode_add: state.document_show_mode_add,

  list_show: state.list_show,
  list_no_part: state.list_no_part,
  no_part_show: state.no_part_show,
  no_part_show_mode_add: state.no_part_show_mode_add,
  list_show_mode_add: state.list_show_mode_add,

  list_show_main: state.list_show_main,
  list_no_part_main: state.list_no_part_main,
  no_part_show_main: state.no_part_show_main,
  no_part_show_mode_add_main: state.no_part_show_mode_add_main,
  list_show_mode_add_main: state.list_show_mode_add_main,

})


const mapDispatchToProps = (dispatch) => ({
  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onChangeNoPartEachRow: (e) => dispatch(onChangeNoPartEachRow(e)),
  onClickNoPartEachRow: (e) => dispatch(onClickNoPartEachRow(e)),
  onClickSearchPopUpNoPart: (e) => dispatch(onClickSearchPopUpNoPart(e)),
  onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),

  onChangeQuilityEachRow: (e) => dispatch(onChangeQuilityEachRow(e)),
  onChangeNoteEachRow: (e) => dispatch(onChangeNoteEachRow(e)),
  onChangeUnitEachRow: (e) => dispatch(onChangeUnitEachRow(e)),

  onChangeQuilityEachRowAdd: (e) => dispatch(onChangeQuilityEachRowAdd(e)),
  onChangeNoteEachRowAdd: (e) => dispatch(onChangeNoteEachRowAdd(e)),
  onChangeUnitEachRowAdd: (e) => dispatch(onChangeUnitEachRowAdd(e)),


  onChangeNoPartEachRowModeAdd: (e) => dispatch(onChangeNoPartEachRowModeAdd(e)),
  onClickNoPartEachRowModeAdd: (e) => dispatch(onClickNoPartEachRowModeAdd(e)),
  onClickSearchPopUpNoPartModeAdd: (e) => dispatch(onClickSearchPopUpNoPartModeAdd(e)),
  onClickSelectPopUpNoPartModeAdd: (e) => dispatch(onClickSelectPopUpNoPartModeAdd(e)),
  onChangeNoPartModeAdd: (e) => dispatch(onChangeNoPartModeAdd(e)),

  onChangeNoPartEachRowMain: (e) => dispatch(onChangeNoPartEachRowMain(e)),
  onChangeNoPartMainEachRowModeAdd: (e) => dispatch(onChangeNoPartMainEachRowModeAdd(e)),
  onChangeDetailMainEachRow: (e) => dispatch(onChangeDetailMainEachRow(e)),
  onChangeDetailMainEachRowAdd: (e) => dispatch(onChangeDetailMainEachRowAdd(e)),
  onChangeUnitMainEachRow: (e) => dispatch(onChangeUnitMainEachRow(e)),
  onChangeUnitMainEachRowAdd: (e) => dispatch(onChangeUnitMainEachRowAdd(e)),

  onChangeT1MainEachRow: (e) => dispatch(onChangeT1MainEachRow(e)),
  onChangeT1MainEachRowAdd: (e) => dispatch(onChangeT1MainEachRowAdd(e)),
  onChangeT2MainEachRow: (e) => dispatch(onChangeT2MainEachRow(e)),
  onChangeT2MainEachRowAdd: (e) => dispatch(onChangeT2MainEachRowAdd(e)),
  onChangeT3MainEachRow: (e) => dispatch(onChangeT3MainEachRow(e)),
  onChangeT3MainEachRowAdd: (e) => dispatch(onChangeT3MainEachRowAdd(e)),
  onChangeT4MainEachRow: (e) => dispatch(onChangeT4MainEachRow(e)),
  onChangeT4MainEachRowAdd: (e) => dispatch(onChangeT4MainEachRowAdd(e)),
  onChangeT5MainEachRow: (e) => dispatch(onChangeT5MainEachRow(e)),
  onChangeT5MainEachRowAdd: (e) => dispatch(onChangeT5MainEachRowAdd(e)),
  onChangeT7MainEachRow: (e) => dispatch(onChangeT7MainEachRow(e)),
  onChangeT7MainEachRowAdd: (e) => dispatch(onChangeT7MainEachRowAdd(e)),

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

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
  console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  return {
    type: "ON CLICK NO PART EACH ROW",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
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
export const onChangeUnitEachRow = (e) => {
  return {
    type: "ON CHANGE UNIT EACH ROW",
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
export const onChangeUnitEachRowAdd = (e) => {
  return {
    type: "ON CHANGE UNIT EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}




export const onChangeNoPartEachRowModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode.parentNode.id)
  return {
    type: "ON CHANGE NO PART EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartEachRowModeAdd = (e) => {
  // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
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
  return {
    type: "ON CLICK SELECT POPUP NO PART MODE ADD",
    rowIndex: e.target.parentNode.parentNode.id
  }
}




///Table

// export const onClickSearchPopUpNoPartMain = (e) => {
//   return {
//     type: "ON CLICK SEARCH POPUP NO PART",
//   }
// }
// export const onChangeNoPartMain = (e) => {
//   return {
//     type: "ON CHANGE NO PART",
//     value: e.target.value,
//   }
// }
// export const onClickSelectPopUpNoPartMain = (e) => {
//   return {
//     type: "ON CLICK SELECT POPUP NO PART",
//     rowIndex: e.target.parentNode.parentNode.id
//   }
// }
export const onChangeNoPartEachRowMain = (e) => {
  return {
    type: "ON CHANGE NO PART MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
// export const onClickNoPartMainEachRow = (e) => {
//   console.log(e.target.parentNode.parentNode.parentNode.parentNode)
//   return {
//     type: "ON CLICK NO PART EACH ROW",
//     rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
//   }
// }

export const onChangeNoPartMainEachRowModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode.parentNode.id)
  return {
    type: "ON CHANGE NO PART MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}

export const onChangeDetailMainEachRow = (e) => {
  return {
    type: "ON CHANGE DETAIL MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeUnitMainEachRow = (e) => {
  return {
    type: "ON CHANGE UNIT MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeDetailMainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE DETAIL MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeUnitMainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE UNIT MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT1MainEachRow = (e) => {
  return {
    type: "ON CHANGE T1 MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT1MainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE T1 MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}



export const onChangeT2MainEachRow = (e) => {
  return {
    type: "ON CHANGE T2 MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT2MainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE T2 MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT3MainEachRow = (e) => {
  return {
    type: "ON CHANGE T3 MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT3MainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE T3 MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT4MainEachRow = (e) => {
  return {
    type: "ON CHANGE T4 MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT4MainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE T4 MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT5MainEachRow = (e) => {
  return {
    type: "ON CHANGE T5 MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT5MainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE T5 MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT7MainEachRow = (e) => {
  return {
    type: "ON CHANGE T7 MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeT7MainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE T7 MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

