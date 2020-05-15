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
          <div id="ทั่วไป" className="tabcontent">


            <h4 className="head-title-bottom mt-2">ผู้ที่รับผิดชอบ</h4>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หน่วยงาน/แขวง</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select" disabled="disabled">
                  {this.props.district.map(function (district, index) {
                    if (current.props.asset_install_show.district === district.name) {
                      return <option defaultValue={district.id} key={index} selected> {district.name} </option>
                    }
                    else {
                      return null
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12 mb-4">
              <div className="grid_2"><p className="cancel-default">ตอน</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select" disabled="disabled" >
                  {this.props.zone.map(function (zone, index) {
                    if (current.props.asset_install_show.zone === zone.name) {
                      return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                    }
                    else {
                      return null
                    }
                  })}
                </select>
              </div>
            </div>
            <h4 className="head-title-bottom mt-2">การติดตั้ง</h4>
            <div className="grid_12 ">
              <div className="grid_2"><p className="cancel-default  ">วันที่ติดตั้งเสร็จ</p></div>
              <div className="grid_3 pull_0">
                <div className="p-search-box cancel-margin ">
                  <input type="date" className="p-search-box__input cancel-default" value={this.props.asset_install_show.date_start} disabled="disabled" />
                </div>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default ">วันที่ประกาศใช้</p></div>
              <div className="grid_3 pull_0">
                <div className="p-search-box cancel-margin">
                  <input type="date" className="p-search-box__input cancel-default" value={this.props.asset_install_show.date_end} disabled="disabled" />
                </div>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">ตอน</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select-top" disabled="disabled">
                  {this.props.zone.map(function (zone, index) {
                    if (current.props.asset_install_show.state === zone.name) {
                      return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                    }
                    else {
                      return null
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_8 pull_0">
                <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.asset_install_show.note} disabled="disabled"></textarea>
              </div>
            </div>

          </div>

          <div id="สถานที่ติดตั้ง" className="tabcontent">

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">ที่อยู่</p></div>
              <div className="grid_9 pull_0 mt-1">
                <input className="cancel-default" type="text" value={this.props.asset_install_show.location1} disabled="disabled" />
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">แขวง</p></div>
              <div className="grid_9 pull_0">
                <select className="edit-select" disabled="disabled">
                  {this.props.district.map(function (district, index) {
                    if (current.props.asset_install_show.location2 === district.name) {
                      return <option defaultValue={district.id} key={index} selected> {district.name} </option>
                    }
                    else {
                      return null
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">เขต</p></div>
              <div className="grid_9 pull_0">
                <select className="edit-select" disabled="disabled" >
                  {this.props.zone.map(function (zone, index) {
                    if (current.props.asset_install_show.location2 === zone.name) {
                      return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                    }
                    else {
                      return null
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">เลขไปรณีย์</p></div>
              <div className="grid_9 pull_0 mt-1">
                <input className="cancel-default" type="text" value={this.props.asset_install_show.location3} disabled="disabled" />
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">Google Map</p></div>
              <div className="grid_9 pull_0 mt-1">
                <input className="cancel-default" type="text" value={this.props.asset_install_show.location4} disabled="disabled" />
              </div>
            </div>
          </div>

          <div id="แนบไฟล์" className="tabcontent">
            <div className="grid_12 ">
              <Files />
            </div>
          </div>

          <div id="หมายเหตุ" className="tabcontent">
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_9 pull_0">
                <textarea className="edit" name="Text1" cols="40" rows="2" style={{ height: "15rem", resize: "none" }} value={this.props.asset_install_show.note2} disabled="disabled"></textarea>
              </div>
            </div>

          </div>
        </>
      )
    }

    if (mode === "edit") {
      return (
        <>
          <div id="ทั่วไป" className="tabcontent">


            <h4 className="head-title-bottom mt-2">ผู้ที่รับผิดชอบ</h4>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หน่วยงาน/แขวง</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select" >
                  {this.props.district.map(function (district, index) {
                    if (current.props.asset_install_show.district === district.name) {
                      return <option defaultValue={district.id} key={index} selected> {district.name} </option>
                    }
                    else {
                      return <option value={district.name} key={index}> {district.name} </option>
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12 mb-4">
              <div className="grid_2"><p className="cancel-default">ตอน</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select" >
                  {this.props.zone.map(function (zone, index) {
                    if (current.props.asset_install_show.zone === zone.name) {
                      return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                    }
                    else {
                      return <option value={zone.name} key={index}> {zone.name} </option>
                    }
                  })}
                </select>
              </div>
            </div>
            <h4 className="head-title-bottom mt-2">การติดตั้ง</h4>
            <div className="grid_12 ">
              <div className="grid_2"><p className="cancel-default  ">วันที่ติดตั้งเสร็จ</p></div>
              <div className="grid_3 pull_0">
                <div className="p-search-box cancel-margin ">
                  <input type="date" className="p-search-box__input cancel-default" />
                </div>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default ">วันที่ประกาศใช้</p></div>
              <div className="grid_3 pull_0">
                <div className="p-search-box cancel-margin">
                  <input type="date" className="p-search-box__input cancel-default" />
                </div>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">ตอน</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select-top" onChange={(e) => this.props.onChangeStatus(e)}>
                  {this.props.district.map(function (district, index) {
                    if (current.props.asset_install_show.state === district.name) {
                      return <option defaultValue={district.id} key={index} selected> {district.name} </option>
                    }
                    else {
                      return <option value={district.name} key={index}> {district.name} </option>
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_8 pull_0" >
                <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.asset_install_show.note} onChange={(e) => this.props.onChangeNote(e)}></textarea>
              </div>
            </div>

          </div>

          <div id="สถานที่ติดตั้ง" className="tabcontent">

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">ที่อยู่</p></div>
              <div className="grid_9 pull_0 mt-1">
                <input className="cancel-default" type="text" value={this.props.asset_install_show.location1} onChange={(e) => this.props.onChangeLocation1(e)} />
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">แขวง</p></div>
              <div className="grid_9 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeLocation2(e)}>
                  {this.props.district.map(function (district, index) {
                    if (current.props.asset_install_show.location2 === district.name) {
                      return <option defaultValue={district.id} key={index} selected> {district.name} </option>
                    }
                    else {
                      return <option value={district.name} key={index}> {district.name} </option>
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">เขต</p></div>
              <div className="grid_9 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeLocation3(e)}>
                  {this.props.zone.map(function (zone, index) {
                    if (current.props.asset_install_show.location3 === zone.name) {
                      return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                    }
                    else {
                      return <option value={zone.name} key={index}> {zone.name} </option>
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">เลขไปรณีย์</p></div>
              <div className="grid_9 pull_0 mt-1">
                <input className="cancel-default" type="text" value={this.props.asset_install_show.location4} onChange={(e) => this.props.onChangeLocation4(e)} />
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">Google Map</p></div>
              <div className="grid_9 pull_0 mt-1">
                <input className="cancel-default" type="text" value={this.props.asset_install_show.note2} onChange={(e) => this.props.onChangeNote2(e)} />
              </div>
            </div>
          </div>

          <div id="แนบไฟล์" className="tabcontent">
            <div className="grid_12 ">
              <Files />
            </div>
          </div>

          <div id="หมายเหตุ" className="tabcontent">
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_9 pull_0">
                <textarea className="edit" name="Text1" cols="40" rows="2" style={{ height: "15rem", resize: "none" }}></textarea>
              </div>
            </div>

          </div>
        </>
      )
    }


    if (mode === "add") {
      return (
        <>
          <div id="ทั่วไป" className="tabcontent">


            <h4 className="head-title-bottom mt-2">ผู้ที่รับผิดชอบ</h4>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หน่วยงาน/แขวง</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select" >
                  <option defaultValue="0"> none </option>
                  {this.props.district.map(function (district, index) {
                    return <option value={district.name} key={index}> {district.name} </option>
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12 mb-4">
              <div className="grid_2"><p className="cancel-default">ตอน</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select" >
                  <option defaultValue="0"> none </option>
                  {this.props.zone.map(function (zone, index) {
                    return <option value={zone.name} key={index}> {zone.name} </option>
                  })}
                </select>
              </div>
            </div>
            <h4 className="head-title-bottom mt-2">การติดตั้ง</h4>
            <div className="grid_12 ">
              <div className="grid_2"><p className="cancel-default  ">วันที่ติดตั้งเสร็จ</p></div>
              <div className="grid_3 pull_0">
                <div className="p-search-box cancel-margin ">
                  <input type="date" className="p-search-box__input cancel-default" />
                </div>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default ">วันที่ประกาศใช้</p></div>
              <div className="grid_3 pull_0">
                <div className="p-search-box cancel-margin">
                  <input type="date" className="p-search-box__input cancel-default" />
                </div>
              </div>
            </div>




            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">ตอน</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select-top" onChange={(e) => this.props.onChangeStatusAdd(e)}>
                  <option defaultValue="0"> none </option>
                  {this.props.district.map(function (district, index) {
                    return <option value={district.name} key={index}> {district.name} </option>
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_8 pull_0">
                <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.note_add} onChange={(e) => { this.props.onChangeNoteAdd(e) }}></textarea>
              </div>
            </div>

          </div>

          <div id="สถานที่ติดตั้ง" className="tabcontent">

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">ที่อยู่</p></div>
              <div className="grid_9 pull_0 mt-1">
                <input className="cancel-default" type="text" value={this.props.location1_add} onChange={(e) => { this.props.onChangeLocation1Add(e) }} />
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">แขวง</p></div>
              <div className="grid_9 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeLocation2Add(e)}>
                <option defaultValue="0"> none </option>
                  {this.props.district.map(function (district, index) {
                    return <option value={district.name} key={index}> {district.name} </option>
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">เขต</p></div>
              <div className="grid_9 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeLocation3Add(e)}>
                <option defaultValue="0"> none </option>
                  {this.props.zone.map(function (zone, index) {
                    return <option value={zone.name} key={index}> {zone.name} </option>
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">เลขไปรณีย์</p></div>
              <div className="grid_9 pull_0 mt-1">
                <input className="cancel-default" type="text" value={this.props.location4} onChange={(e) => { this.props.onChangeLocation4Add(e) }} />
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">Google Map</p></div>
              <div className="grid_9 pull_0 mt-1">
                <input className="cancel-default" type="text" value={this.props.note2_add} onChange={(e) => { this.props.onChangeNote2Add(e) }} />
              </div>
            </div>
          </div>

          <div id="แนบไฟล์" className="tabcontent">
            <div className="grid_12 ">
              <Files />
            </div>
          </div>

          <div id="หมายเหตุ" className="tabcontent">
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_9 pull_0">
                <textarea className="edit" name="Text1" cols="40" rows="2" style={{ height: "15rem", resize: "none" }}></textarea>
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
              {/* Input in Bottom */}
              {this.checkActionMode(this.props.actionMode)}






            </div>
          </div>
        </div>
      </form>
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  asset_install_show: state.asset_install_show,

  district: state.district,
  zone: state.zone,



  // Mode Add
  status_add: state.status_add,
  note_add: state.note_add,
  location1_add: state.location1_add,
  location2_add: state.location2_add,
  location3_add: state.location3_add,
  location4_add: state.location4_add,
  note2_add: state.note2_add,

})

const mapDispatchToProps = (dispatch) => ({

  onChangeStatus: (e) => dispatch(onChangeStatus(e)),
  onChangeNote: (e) => dispatch(onChangeNote(e)),
  onChangeNote2: (e) => dispatch(onChangeNote2(e)),
  onChangeLocation1: (e) => dispatch(onChangeLocation1(e)),
  onChangeLocation2: (e) => dispatch(onChangeLocation2(e)),
  onChangeLocation3: (e) => dispatch(onChangeLocation3(e)),
  onChangeLocation4: (e) => dispatch(onChangeLocation4(e)),


  onChangeStatusAdd: (e) => dispatch(onChangeStatusAdd(e)),
  onChangeNoteAdd: (e) => dispatch(onChangeNoteAdd(e)),
  onChangeNote2Add: (e) => dispatch(onChangeNote2Add(e)),
  onChangeLocation1Add: (e) => dispatch(onChangeLocation1Add(e)),
  onChangeLocation2Add: (e) => dispatch(onChangeLocation2Add(e)),
  onChangeLocation3Add: (e) => dispatch(onChangeLocation3Add(e)),
  onChangeLocation4Add: (e) => dispatch(onChangeLocation4Add(e)),

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);


export const onChangeStatus = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE STATUS",
    value: e.target.value
  }
}

export const onChangeNote = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE NOTE",
    value: e.target.value
  }
}



export const onChangeNote2 = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE NOTE2",
    value: e.target.value
  }
}


export const onChangeLocation1 = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE LOCATION1",
    value: e.target.value
  }
}

export const onChangeLocation2 = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE LOCATION2",
    value: e.target.value
  }
}

export const onChangeLocation3 = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE LOCATION3",
    value: e.target.value
  }
}

export const onChangeLocation4 = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE LOCATION4",
    value: e.target.value
  }
}





export const onChangeStatusAdd = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE STATUS ADD",
    value: e.target.value
  }
}

export const onChangeNoteAdd = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE NOTE ADD",
    value: e.target.value
  }
}



export const onChangeNote2Add = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE NOTE2 ADD",
    value: e.target.value
  }
}


export const onChangeLocation1Add = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE LOCATION1 ADD",
    value: e.target.value
  }
}

export const onChangeLocation2Add = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE LOCATION2 ADD",
    value: e.target.value
  }
}

export const onChangeLocation3Add = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE LOCATION3 ADD",
    value: e.target.value
  }
}

export const onChangeLocation4Add = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE LOCATION4 ADD",
    value: e.target.value
  }
}
