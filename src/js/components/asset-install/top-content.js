import React from 'react';
import { connect } from 'react-redux'
import '../../../css/grid12.css';

class TopContent extends React.Component {



  componentDidMount() {
    document.getElementById("defaultOpen").click();
  }

  tapChange(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  checkActionMode = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่สินทรัพย์</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_asset_install} onChange={(e) => { this.props.onChangeNoAssetInstall(e) }} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showAssetInstall" aria-controls="modalAssetInstall"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " defaultValue={this.props.asset_install_show.create_date_time} disabled="disabled" />

              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>


          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่ของ</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="text" className="cancel-default grid_3  " disabled="disabled" defaultValue={this.props.asset_install_show.number}></input>
              </div>
              <div className="p-search-box cancel-margin grid_3   float-right">
                <input type="text" className=" p-search-box__input cancel-default  " defaultValue={this.props.asset_install_show.create_name} disabled="disabled"></input>
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default "><p className="cancel-default ">รายละเอียด</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_4 pull_0">
                <input type="text" className="cancel-default " disabled="disabled" defaultValue={this.props.asset_install_show.des}></input>
              </div>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default "><p className="cancel-default ">หน่วย</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="text" className="cancel-default " disabled="disabled" defaultValue={this.props.asset_install_show.unit}></input>
              </div>
            </div>
          </div>

        </>
      )
    }
    if (mode === "edit") {
      return (
        <>

          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่สินทรัพย์</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_asset_install} onChange={(e) => { this.props.onChangeNoAssetInstall(e) }} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showAssetInstall" aria-controls="modalAssetInstall"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " defaultValue={this.props.asset_install_show.create_date_time} onChange={(e) => { this.props.onChangeCreateDatetime(e) }} />

              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>


          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่ของ</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="text" className="cancel-default grid_3  " defaultValue={this.props.asset_install_show.number} onChange={(e) => { this.props.onChangeNumber(e) }}></input>
              </div>
              <div className="p-search-box cancel-margin grid_3   float-right">
                <input type="text" className=" p-search-box__input cancel-default  " defaultValue={this.props.asset_install_show.create_name} onChange={(e) => { this.props.onChangeCreateName(e) }}></input>
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default "><p className="cancel-default ">รายละเอียด</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_4 pull_0">
                <input type="text" className="cancel-default " defaultValue={this.props.asset_install_show.des} onChange={(e) => { this.props.onChangeDes(e) }}></input>
              </div>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default "><p className="cancel-default ">หน่วย</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="text" className="cancel-default " defaultValue={this.props.asset_install_show.unit} onChange={(e) => { this.props.onChangeUnit(e) }}></input>
              </div>
            </div>
          </div>


        </>
      )
    }

    if (mode === "add") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่สินทรัพย์</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_asset_install_add} onChange={(e) => { this.props.onChangeNoAssetInstallAdd(e) }} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showAssetInstall" aria-controls="modalAssetInstall"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " defaultValue={this.props.create_date_time_add} onChange={(e) => { this.props.onChangeCreateDatetimeAdd(e) }} />

              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>


          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่ของ</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="text" className="cancel-default grid_3  " defaultValue={this.props.number_add} onChange={(e) => { this.props.onChangeNumberAdd(e) }} ></input>
              </div>
              <div className="p-search-box cancel-margin grid_3   float-right">
                <input type="text" className=" p-search-box__input cancel-default  " defaultValue={this.props.create_name_add} onChange={(e) => { this.props.onChangeCreateNameAdd(e) }} ></input>
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default "><p className="cancel-default ">รายละเอียด</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_4 pull_0">
                <input type="text" className="cancel-default " defaultValue={this.props.des_add} onChange={(e) => { this.props.onChangeDesAdd(e) }} ></input>
              </div>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default "><p className="cancel-default ">หน่วย</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="text" className="cancel-default " defaultValue={this.props.unit_add} onChange={(e) => { this.props.onChangeUnitAdd(e) }} ></input>
              </div>
            </div>
          </div>



        </>
      )
    }

  }

  render() {
    let current = this;
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12  ">
              <h4 className="head-title">ติดตั้งสินทรัพย์</h4>
              {/* Input in TopBar */}
              {this.checkActionMode(this.props.actionMode)}

            </section>

            <div className="grid_12">
              <div className="tab grid_6">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ทั่วไป")}>ทั่วไป</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "สถานที่ติดตั้ง")}>สถานที่ติดตั้ง</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "หมายเหตุ")}>หมายเหตุ</button>
              </div>
            </div>
          </div>

        </div>


        <div className="modal" id="modalAssetInstall" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">เลขที่เอกสารใบสั่งซ่อมบำรุง</p>
            <div className="container_12 edit-padding">
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.no_asset_install} onChange={(e) => this.props.onChangeNoAssetInstall(e)} />
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง:</p></div>
                <div className="grid_8 pull_0">
                  <select className="edit-select-top grid_3 " onChange={(e) => this.props.onChangeDistricts(e)}>
                    <option defaultValue=""></option>
                    {this.props.district.map(function (district, index) {
                      return <option value={district.name} key={index}> {district.name} </option>
                    })}
                  </select>
                  <select className="edit-select-top grid_3 float-right" onChange={(e) => this.props.onChangeZones(e)}>
                    <option defaultValue=""></option>
                    {this.props.zone.map(function (zone, index) {
                      return <option value={zone.name} key={index}> {zone.name} </option>
                    })}
                  </select>
                  <p className="cancel-default grid_2 float-right">สถานที่ ตอน:</p>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">วันที่เริ่มต้น:</p></div>
                <div className="grid_8 pull_0">
                  <input type="date" className="cancel-default grid_3 " value={this.props.date_starts} onChange={(e) => this.props.onChangeDateStarts(e)}></input>
                  <input type="date" className="cancel-default grid_3 float-right" value={this.props.date_ends} onChange={(e) => this.props.onChangeDateEnds(e)}></input>
                  <p className="cancel-default grid_2 float-right">วันที่สิ้นสุด:</p>
                </div>
                <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchAssetInstall(e)}>ค้นหา</button>
              </div>


              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                      <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th>
                      <th className="font" style={{ minWidth: "150px" }}>วันเวลาแจ้งขัดข้อง</th>
                      <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                      <th className="font" style={{ minWidth: "150px" }}>สถานที่ แขวน/ตอน</th>
                      <th className="font" style={{ minWidth: "150px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.asset_install_show_popup.map(function (asset_install_show_popup, index) {
                      return (
                        <tr key={index} id={index}>

                          <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>{asset_install_show_popup.no_asset_install}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{asset_install_show_popup.job_name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{asset_install_show_popup.date_start} {asset_install_show_popup.time_start}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{asset_install_show_popup.create_name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{asset_install_show_popup.station}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoAssetInstall(e)} aria-label="Close active modal" aria-controls="modalAssetInstall" id="closeModalAssetInstall">เลือก</button>
                          </td>
                        </tr>
                      )
                    })}


                  </tbody>
                </table>
              </div>
              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalAssetInstall" id="closeModalAssetInstall">กลับ</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  no_asset_install: state.no_word_order,
  asset_install_show_popup: state.asset_install_show_popup,
  asset_install_show: state.asset_install_show,
  districts: state.districts,
  zones: state.zones,
  date_starts: state.date_starts,
  date_ends: state.date_ends,

  district: state.district,
  zone: state.zone,

  // Mode Add
  no_asset_install_add: state.no_asset_install_add,
  create_date_time_add: state.create_date_time_add,
  create_name_add: state.create_name_add,

  number_add: state.number_add,
  des_add: state.des_add,
  unit_add: state.unit_add,


})

const mapDispatchToProps = (dispatch) => ({
  onChangeNoAssetInstall: (e) => dispatch(onChangeNoAssetInstall(e)),
  onClickPopUpSearchAssetInstall: (e) => dispatch(onClickPopUpSearchAssetInstall(e)),
  onClickSelectNoAssetInstall: (e) => dispatch(onClickSelectNoAssetInstall(e)),

  onChangeDistricts: (e) => dispatch(onChangeDistricts(e)),
  onChangeZones: (e) => dispatch(onChangeZones(e)),
  onChangeDateStarts: (e) => dispatch(onChangeDateStarts(e)),
  onChangeDateEnds: (e) => dispatch(onChangeDateEnds(e)),


  // Mode Edit
  onChangeCreateDatetime: (e) => dispatch(onChangeCreateDatetime(e)),
  onChangeCreateName: (e) => dispatch(onChangeCreateName(e)),
  onChangeNumber: (e) => dispatch(onChangeNumber(e)),
  onChangeDes: (e) => dispatch(onChangeDes(e)),
  onChangeUnit: (e) => dispatch(onChangeUnit(e)),


  // Mode Add
  onChangeNoAssetInstallAdd: (e) => dispatch(onChangeNoAssetInstallAdd(e)),
  onChangeCreateDatetimeAdd: (e) => dispatch(onChangeCreateDatetimeAdd(e)),
  onChangeCreateNameAdd: (e) => dispatch(onChangeCreateNameAdd(e)),

  onChangeNumberAdd: (e) => dispatch(onChangeNumberAdd(e)),
  onChangeDesAdd: (e) => dispatch(onChangeDesAdd(e)),
  onChangeUnitAdd: (e) => dispatch(onChangeUnitAdd(e))

})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

// Mode Search
export const onChangeNoAssetInstall = (e) => {
  return {
    type: "ON CHANGE NO ASSETINSTALL",
    value: e.target.value
  }
}
export const onChangeDistricts = (e) => {
  return {
    type: "ON CHANGE DISTRICTS ASSETINSTALL",
    value: e.target.value
  }
}

export const onChangeZones = (e) => {
  return {
    type: "ON CHANGE ZONES ASSETINSTALL",
    value: e.target.value
  }
}

export const onChangeDateStarts = (e) => {
  return {
    type: "ON CHANGE DATE STRARTS ASSETINSTALL",
    value: e.target.value
  }
}

export const onChangeDateEnds = (e) => {
  return {
    type: "ON CHANGE DATE ENDS ASSETINSTALL",
    value: e.target.value
  }
}

export const onClickPopUpSearchAssetInstall = (e) => {
  return {
    type: "CLICK SEARCH POPUP NO ASSETINSTALL"
  }
}
export const onClickSelectNoAssetInstall = (e) => {
  return {
    type: "CLICK SELECT POPUP NO ASSETINSTALL",
    row_asset_install_show_popup: e.target.parentNode.parentNode.id
  }
}


// Mode Edit
export const onChangeCreateDatetime = (e) => {
  return {
    type: "ON CHANGE CREATE DATETIME",
    value: e.target.value
  }
}
export const onChangeCreateName = (e) => {
  return {
    type: "ON CHANGE CREATE NAME",
    value: e.target.value
  }
}

export const onChangeNumber = (e) => {
  return {
    type: "ON CHANGE NUMBER",
    value: e.target.value
  }
}

export const onChangeDes = (e) => {
  return {
    type: "ON CHANGE DES",
    value: e.target.value
  }
}

export const onChangeUnit = (e) => {
  return {
    type: "ON CHANGE UNIT",
    value: e.target.value
  }
}




// Mode Add
export const onChangeNoAssetInstallAdd = (e) => {
  return {
    type: "ON CHANGE NO ASSETINSTALL ADD",
    value: e.target.value
  }
}
export const onChangeCreateDatetimeAdd = (e) => {
  return {
    type: "ON CHANGE CREATE DATETIME ADD",
    value: e.target.value
  }
}
export const onChangeCreateNameAdd = (e) => {
  return {
    type: "ON CHANGE CREATE NAME ADD",
    value: e.target.value
  }
}

export const onChangeNumberAdd = (e) => {
  return {
    type: "ON CHANGE NUMBER ADD",
    value: e.target.value
  }
}
export const onChangeDesAdd = (e) => {
  return {
    type: "ON CHANGE DES ADD",
    value: e.target.value
  }
}

export const onChangeUnitAdd = (e) => {
  return {
    type: "ON CHANGE UNIT ADD",
    value: e.target.value
  }
}