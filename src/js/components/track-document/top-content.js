import React from 'react';
import { connect } from 'react-redux'
import '../../../css/style.css'
import '../../../css/grid12.css';
import { Redirect } from 'react-router-dom'
class TopContent extends React.Component {



  render() {
    let current = this;

   

    if ( this.props.actionMode === "home") {
      return (
          <Redirect to="/main"></Redirect>
      )
  }
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">รายการติดตามเอกสาร</h4>



              <div className="grid_12">
                <div className="grid_11"><p className="cancel-default">ค้นหาข้อมูล</p></div>
                <div className="grid_7">
                  <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="เอกสารของฉัน" onChange={(e) => { this.props.onChangeFindTrackDocument(e) }} />
                  <label htmlFor="Radio1" className="cancel-default d-inline">เอกสารของฉัน</label>
                  <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="เอกสารทั้งหมด" onChange={(e) => { this.props.onChangeFindTrackDocument(e) }} />
                  <label htmlFor="Radio2" className="cancel-default d-inline ml-3">เอกสารทั้งหมด</label>
                </div>
              </div>

              {/* <div className="grid_12">
                <div className="grid_1"><p className="cancel-default">ประเภทเอกสาร</p></div>
                <div className="grid_8 pull_0">
                  <select className="edit-select-top grid_2 " onChange={(e) => this.props.onChangeTypeTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.type_document_list.map(function (type_document, index) {
                      return <option value={type_document.type} key={index}> {type_document.type} </option>
                    })}
                  </select>
                  <p className="cancel-default grid_1 ">วันเริ่มต้น</p>
                  <input type="date" className="cancel-default grid_2 " value={this.props.date_start} onChange={(e) => { this.props.onChangeDateStartTrackDocument(e) }}></input>
                </div>
              </div> */}


              <div className="grid_12 mt-2">
                <div className="grid_1 cancel-default">
                  <p className="cancel-default">ประเภทเอกสาร </p>
                </div>
                <div className="grid_2">
                  <select className="edit-select-top grid_2 " onChange={(e) => this.props.onChangeTypeTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.type_document_list.map(function (type_document, index) {
                      return <option value={type_document.type} key={index}> {type_document.type} </option>
                    })}
                  </select>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">วันเริ่มต้น </p>
                </div>
                <div className="grid_3">
                  <input type="date" className="cancel-default grid_3 " value={this.props.date_start} onChange={(e) => { this.props.onChangeDateStartTrackDocument(e) }}></input>
                </div>
              </div>



              {/* <div className="grid_12">
                <div className="grid_1"><p className="cancel-default">เลขที่เอกสาร</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_2 " value={this.props.no_track_document} onChange={(e) => { this.props.onChangeNoTrackDocument(e) }}></input>
                  <p className="cancel-default grid_1 ">วันสิ้นสุด</p>
                  <input type="date" className="cancel-default grid_2 " value={this.props.date_end} onChange={(e) => { this.props.onChangeDateEndTrackDocument(e) }}></input>
                  <p className="cancel-default grid_1 ">สถานะเอกสาร</p>
                  <select className="edit-select-top grid_2 " onChange={(e) => this.props.onChangeStatusTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.status_document_list.map(function (status_document, index) {
                      return <option value={status_document.status} key={index}> {status_document.status} </option>
                    })}
                  </select>
                </div>
              </div> */}


              <div className="grid_12">
                <div className="grid_1 cancel-default">
                  <p className="cancel-default">เลขที่เอกสาร </p>
                </div>
                <div className="grid_2">
                  <input type="text" className="cancel-default grid_2 " value={this.props.no_track_document} onChange={(e) => { this.props.onChangeNoTrackDocument(e) }}></input>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">วันสิ้นสุด </p>
                </div>
                <div className="grid_3">
                  <input type="date" className="cancel-default grid_3 " value={this.props.date_end} onChange={(e) => { this.props.onChangeDateEndTrackDocument(e) }}></input>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">สถานะเอกสาร </p>

                </div>
                <div className="grid_2">
                  <select className="edit-select-top grid_2 " onChange={(e) => this.props.onChangeStatusTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.status_document_list.map(function (status_document, index) {
                      return <option value={status_document.status} key={index}> {status_document.status} </option>
                    })}
                  </select>
                </div>
              </div>



              {/* <div className="grid_12">
                <div className="grid_1"><p className="cancel-default">แขวง</p></div>
                <div className="grid_8 pull_0">
                  <select className="edit-select-top grid_2 " onChange={(e) => this.props.onChangeDistrictTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.district_list.map(function (district, index) {
                      return <option value={district.name} key={index}> {district.name} </option>
                    })}
                  </select>

                  <p className="cancel-default grid_1 ">ตอน</p>
                  <select className="edit-select-top grid_2 " onChange={(e) => this.props.onChangeZoneTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.zone_list.map(function (zone, index) {
                      return <option value={zone.name} key={index}> {zone.name} </option>
                    })}
                  </select>


                  <p className="cancel-default grid_1 ">สถานี</p>
                  <select className="edit-select-top grid_2 " onChange={(e) => this.props.onChangeStationTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.station_list.map(function (station, index) {
                      return <option value={station.name} key={index}> {station.name} </option>
                    })}
                  </select>

                </div>
                <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={(e) => current.props.onClickSearchTrackDocument(e)}>ค้นหา</button>
              </div> */}

              <div className="grid_12">
                <div className="grid_1 cancel-default">
                  <p className="cancel-default">แขวง </p>
                </div>
                <div className="grid_2">
                  <select className="edit-select-top grid_2 " onChange={(e) => this.props.onChangeDistrictTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.district_list.map(function (district, index) {
                      return <option value={district.name} key={index}> {district.name} </option>
                    })}
                  </select>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">ตอน </p>
                </div>
                <div className="grid_3">
                  <select className="edit-select-top grid_3 " onChange={(e) => this.props.onChangeZoneTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.zone_list.map(function (zone, index) {
                      return <option value={zone.name} key={index}> {zone.name} </option>
                    })}
                  </select>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">สถานี </p>
                </div>
                <div className="grid_2">
                  <select className="edit-select-top grid_2 " onChange={(e) => this.props.onChangeStationTrackDocument(e)}>
                    <option defaultValue=""></option>
                    {this.props.station_list.map(function (station, index) {
                      return <option value={station.name} key={index}> {station.name} </option>
                    })}
                  </select>
                </div>
                <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={(e) => current.props.onClickSearchTrackDocument(e)}>ค้นหา</button>
              </div>




            </section>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,

  find_document_list: state.find_document_list,
  type_document_list: state.type_document_list,
  status_document_list: state.status_document_list,
  station_list: state.station_list,
  district_list: state.district_list,
  zone_list: state.zone_list,

  no_track_document: state.no_track_document,
  find_document: state.find_document,
  type_document: state.type_document,
  date_start: state.date_start,
  date_end: state.date_end,
  status_document: state.status_document,
  district: state.district,
  zone: state.zone,
  station: state.station,

})


const mapDispatchToProps = (dispatch) => ({
  onClickSearchTrackDocument: (e) => dispatch(onClickSearchTrackDocument(e)),

  onChangeNoTrackDocument: (e) => dispatch(onChangeNoTrackDocument(e)),
  onChangeFindTrackDocument: (e) => dispatch(onChangeFindTrackDocument(e)),
  onChangeTypeTrackDocument: (e) => dispatch(onChangeTypeTrackDocument(e)),
  onChangeDateStartTrackDocument: (e) => dispatch(onChangeDateStartTrackDocument(e)),
  onChangeDateEndTrackDocument: (e) => dispatch(onChangeDateEndTrackDocument(e)),
  onChangeStatusTrackDocument: (e) => dispatch(onChangeStatusTrackDocument(e)),
  onChangeDistrictTrackDocument: (e) => dispatch(onChangeDistrictTrackDocument(e)),
  onChangeZoneTrackDocument: (e) => dispatch(onChangeZoneTrackDocument(e)),
  onChangeStationTrackDocument: (e) => dispatch(onChangeStationTrackDocument(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

export const onClickSearchTrackDocument = (e) => {
  return {
    type: "CLICK SEARCH TRACKDOCUMENT"
  }
}

export const onChangeNoTrackDocument = (e) => {
  return {
    type: "ON CHANGE NO TRACKDOCUMENT",
    value: e.target.value
  }
}

export const onChangeFindTrackDocument = (e) => {
  return {
    type: "ON CHANGE FIND TRACKDOCUMENT",
    value: e.target.value
  }
}

export const onChangeTypeTrackDocument = (e) => {
  return {
    type: "ON CHANGE TYPE TRACKDOCUMENT",
    value: e.target.value
  }
}

export const onChangeDateStartTrackDocument = (e) => {
  return {
    type: "ON CHANGE DATE START TRACKDOCUMENT",
    value: e.target.value
  }
}

export const onChangeDateEndTrackDocument = (e) => {
  return {
    type: "ON CHANGE DATE END TRACKDOCUMENT",
    value: e.target.value
  }
}

export const onChangeStatusTrackDocument = (e) => {
  return {
    type: "ON CHANGE STATUS TRACKDOCUMENT",
    value: e.target.value
  }
}

export const onChangeDistrictTrackDocument = (e) => {
  return {
    type: "ON CHANGE DISTRICT TRACKDOCUMENT",
    value: e.target.value
  }
}

export const onChangeZoneTrackDocument = (e) => {
  return {
    type: "ON CHANGE ZONE TRACKDOCUMENT",
    value: e.target.value
  }
}

export const onChangeStationTrackDocument = (e) => {
  return {
    type: "ON CHANGE STATION TRACKDOCUMENT",
    value: e.target.value
  }
}