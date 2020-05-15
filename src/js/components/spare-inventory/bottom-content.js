import React from 'react';
import { connect } from 'react-redux';
import Files from '../common/files'
import '../../../css/style.css'
import '../../../css/table.css';

class BottomContent extends React.Component {

  checkActionMode = (mode) => {
    let current = this;
    if (mode === "search") {
      return (
        <>
          <div className="grid_12 mt-2">
            <div className="grid_4 ml-3">
              {this.props.inventory_show.status === 1 ? <input type="checkbox" id="checkExample2" defaultChecked="selected" disabled="disabled" /> : <input type="checkbox" id="checkExample2" disabled="disabled" />}
              <label className="cancel-default d-inline ml-2n" htmlFor="checkExample2">ปิดการใช้งาน</label>
            </div>
          </div>

          <div className="grid_12 mt-2">
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">สถานที่</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" disabled="disabled">
                  <option defaultValue="0"> none </option>
                  {this.props.station.map(function (station, index) {
                    if (current.props.inventory_show.station === station.name) {
                      return <option defaultValue={station.id} key={index} selected> {station.name} </option>
                    }
                    else {
                      return null
                    }
                  })}
                </select>
              </div>
            </div>

            <div className="grid_12 mt-5">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ที่อยู่</p>
              </div>
              <div className="grid_4 pull_0">
                <input type="text" className="cancel-default font-black" defaultValue={this.props.inventory_show.address} disabled="disabled"></input>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">แขวง/ตำบล</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" disabled="disabled">
                  <option value="0"> none </option>
                  {this.props.district.map(function (district, index) {
                    if (current.props.inventory_show.district === district.name) {
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
              <div className="grid_2"><p className="cancel-default">เขต/อำเภอ</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" disabled="disabled">
                  <option value="0"> none </option>
                  {this.props.zone.map(function (zone, index) {
                    if (current.props.inventory_show.zone === zone.name) {
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
              <div className="grid_2"><p className="cancel-default">จังหวัด</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" disabled="disabled">
                  <option value="0"> none </option>
                  {this.props.county.map(function (county, index) {
                    if (current.props.inventory_show.county === county.name) {
                      return <option defaultValue={county.id} key={index} selected> {county.name} </option>
                    }
                    else {
                      return null
                    }
                  })}
                </select>
              </div>
            </div>

            <div className="grid_12 mt-1">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">รหัสไปรษณีย์</p>
              </div>
              <div className="grid_4 pull_0">
                <input type="number" className="cancel-default font-black" defaultValue={this.props.inventory_show.post_office} disabled="disabled"></input>
              </div>
            </div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <div className="grid_12 mt-2">
            <div className="grid_4 ml-3">
              {this.props.inventory_show.status === 1 ? <input type="checkbox" id="checkExample2" value={this.props.inventory_show.status} onClick={(e) => this.props.onClickStatus(e)} /> : <input type="checkbox" id="checkExample2" value={this.props.inventory_show.status} onClick={(e) => this.props.onClickStatus(e)} />}
              <label className="cancel-default d-inline ml-2n" htmlFor="checkExample2">ปิดการใช้งาน</label>
            </div>
          </div>

          <div className="grid_12 mt-2">
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">สถานที่</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeStation(e)} >
                  <option defaultValue="0"> none </option>
                  {this.props.station.map(function (station, index) {
                    if (current.props.inventory_show.station === station.name) {
                      return <option value={station.name} key={index} selected> {station.name} </option>
                    }
                    else {
                      return <option value={station.name} key={index}> {station.name} </option>
                    }
                  })}
                </select>
              </div>
            </div>

            <div className="grid_12 mt-5">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ที่อยู่</p>
              </div>
              <div className="grid_4 pull_0">
                <input type="text" className="cancel-default font-black" value={this.props.inventory_show.address} onChange={(e) => this.props.onChangeAddress(e)}></input>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">แขวง/ตำบล</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeDistrict(e)}>
                  <option value="0"> none </option>
                  {this.props.district.map(function (district, index) {
                    if (current.props.inventory_show.district === district.name) {
                      return <option value={district.name} key={index} selected> {district.name} </option>
                    }
                    else {
                      return <option value={district.name} key={index}> {district.name} </option>
                    }
                  })}
                </select>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">เขต/อำเภอ</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeZone(e)}>
                  <option value="0"> none </option>
                  {this.props.zone.map(function (zone, index) {
                    if (current.props.inventory_show.zone === zone.name) {
                      return <option value={zone.name} key={index} selected> {zone.name} </option>
                    }
                    else {
                      return <option value={zone.name} key={index}> {zone.name} </option>
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">จังหวัด</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeCounty(e)}>
                  <option value="0"> none </option>
                  {this.props.county.map(function (county, index) {
                    if (current.props.inventory_show.county === county.name) {
                      return <option value={county.name} key={index} selected> {county.name} </option>
                    }
                    else {
                      return <option value={county.name} key={index}> {county.name} </option>
                    }
                  })}
                </select>
              </div>
            </div>

            <div className="grid_12 mt-1">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">รหัสไปรษณีย์</p>
              </div>
              <div className="grid_4 pull_0">
                <input type="number" className="cancel-default font-black" value={this.props.inventory_show.post_office} onChange={(e) => this.props.onChangePostOffice(e)}></input>
              </div>
            </div>
          </div>

        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12 mt-2">
            <div className="grid_4 ml-3"> <input type="checkbox" id="checkExample2" value={this.props.status_add} onClick={(e) => this.props.onClickStatusAdd(e)} />
              <label className="cancel-default d-inline ml-2n" htmlFor="checkExample2">ปิดการใช้งาน</label>
            </div>
          </div>

          <div className="grid_12 mt-2">
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">สถานที่</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeStationAdd(e)} >
                  <option defaultValue="0"> none </option>
                  {this.props.station.map(function (station, index) {
                    return <option value={station.name} key={index}> {station.name} </option>
                  })}
                </select>
              </div>
            </div>

            <div className="grid_12 mt-5">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ที่อยู่</p>
              </div>
              <div className="grid_4 pull_0">
                <input type="text" className="cancel-default font-black" value={this.props.address_add} onChange={(e) => this.props.onChangeAddressAdd(e)}></input>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">แขวง/ตำบล</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeDistrictAdd(e)}>
                  <option value="0"> none </option>
                  {this.props.district.map(function (district, index) {
                    return <option value={district.name} key={index}> {district.name} </option>
                  })}
                </select>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">เขต/อำเภอ</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeZoneAdd(e)}>
                  <option value="0"> none </option>
                  {this.props.zone.map(function (zone, index) {
                    return <option value={zone.name} key={index}> {zone.name} </option>
                  })}
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">จังหวัด</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" onChange={(e) => this.props.onChangeCountyAdd(e)}>
                  <option value="0"> none </option>
                  {this.props.county.map(function (county, index) {
                    return <option value={county.name} key={index}> {county.name} </option>
                  })}
                </select>
              </div>
            </div>

            <div className="grid_12 mt-1">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">รหัสไปรษณีย์</p>
              </div>
              <div className="grid_4 pull_0">
                <input type="number" className="cancel-default font-black" value={this.props.post_office_add} onChange={(e) => this.props.onChangePostOfficeAdd(e)}></input>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  render() {
    return (
      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="grid_12 ">
            <div id="ทั่วไป" className="tabcontent">
              {this.checkActionMode(this.props.actionMode)}
            </div>
            <div id="แนบไฟล์" className="tabcontent">
              <Files />
            </div>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,

  // State ของ Drop Dawn
  station: state.station,
  district: state.district,
  zone: state.zone,
  county: state.county,

  inventory_show: state.inventory_show,

  // Mode Add
  status_add: state.status_add, //สถานการใช้งาน 1 = ใช้งาน , 2 = ไม่ใช้งาน
  station_add: state.station_add,
  address_add: state.address_add,
  district_add: state.district_add,
  zone_add: state.zone_add,
  county_add: state.county_add,
  post_office_add: state.post_office_add
})
const mapDispatchToProps = (dispatch) => ({
  // Mode Edit
  onClickStatus: (e) => dispatch(onClickStatus(e)),
  onChangeStation: (e) => dispatch(onChangeStation(e)),
  onChangeAddress: (e) => dispatch(onChangeAddress(e)),
  onChangeDistrict: (e) => dispatch(onChangeDistrict(e)),
  onChangeZone: (e) => dispatch(onChangeZone(e)),
  onChangeCounty: (e) => dispatch(onChangeCounty(e)),
  onChangePostOffice: (e) => dispatch(onChangePostOffice(e)),

  // Mode Add
  onClickStatusAdd: (e) => dispatch(onClickStatusAdd(e)),
  onChangeStationAdd: (e) => dispatch(onChangeStationAdd(e)),
  onChangeStationAdd: (e) => dispatch(onChangeStationAdd(e)),
  onChangeAddressAdd: (e) => dispatch(onChangeAddressAdd(e)),
  onChangeDistrictAdd: (e) => dispatch(onChangeDistrictAdd(e)),
  onChangeZoneAdd: (e) => dispatch(onChangeZoneAdd(e)),
  onChangeCountyAdd: (e) => dispatch(onChangeCountyAdd(e)),
  onChangePostOfficeAdd: (e) => dispatch(onChangePostOfficeAdd(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

// Mode Edit
export const onClickStatus = (e) => {
  return {
    type: "ON CHANGE STATUS",
    value: e.target.value
  }
}
export const onChangeStation = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE STATION",
    value: e.target.value
  }
}
export const onChangeAddress = (e) => {
  return {
    type: "ON CHANGE ADDRESS",
    value: e.target.value
  }
}
export const onChangeDistrict = (e) => {
  return {
    type: "ON CHANGE DISTRICT",
    value: e.target.value
  }
}
export const onChangeZone = (e) => {
  return {
    type: "ON CHANGE ZONE",
    value: e.target.value
  }
}
export const onChangeCounty = (e) => {
  return {
    type: "ON CHANGE COUNTY",
    value: e.target.value
  }
}
export const onChangePostOffice = (e) => {
  return {
    type: "ON CHANGE POST OFFICE",
    value: e.target.value
  }
}

// Mode Add
export const onClickStatusAdd = (e) => {
  return {
    type: "ON CHANGE STATUS ADD",
    value: e.target.value
  }
}
export const onChangeStationAdd = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE STATION ADD",
    value: e.target.value
  }
}
export const onChangeAddressAdd = (e) => {
  return {
    type: "ON CHANGE ADDRESS ADD",
    value: e.target.value
  }
}
export const onChangeDistrictAdd = (e) => {
  return {
    type: "ON CHANGE DISTRICT ADD",
    value: e.target.value
  }
}
export const onChangeZoneAdd = (e) => {
  return {
    type: "ON CHANGE ZONE ADD",
    value: e.target.value
  }
}
export const onChangeCountyAdd = (e) => {
  return {
    type: "ON CHANGE COUNTY ADD",
    value: e.target.value
  }
}
export const onChangePostOfficeAdd = (e) => {
  return {
    type: "ON CHANGE POST OFFICE ADD",
    value: e.target.value
  }
}
