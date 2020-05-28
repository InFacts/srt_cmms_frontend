import React from 'react';
import { connect } from 'react-redux'
import '../../../css/style.css'
import '../../../css/grid12.css';
import { Redirect } from 'react-router-dom'
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
    if (mode === "home") {
      return (
          <Redirect to="/main-spare"></Redirect>
      )
  }
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายงาน</p></div>
            <div className="grid_3 pull_0">
              <input className="cancel-default " type="text" value={this.props.report} />
            </div>
            <div className="grid_2"><p className="cancel-default float-left">ระดับของรายงาน</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top">
                {this.props.level_list.map(function (level, index) {
                  if (current.props.level === level.type) {
                    return <option defaultValue={level.id} key={index} selected> {level.type} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ประเภทช่วงเวลา</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top">
                {this.props.type_list.map(function (type, index) {
                  if (current.props.type === type.type) {
                    return <option defaultValue={type.id} key={index} selected> {type.type} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
            <div className="grid_2"><p className="cancel-default float-left">แขวง</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top">
                {this.props.district_list.map(function (distric, index) {
                  if (current.props.distric === distric.name) {
                    return <option defaultValue={distric.id} key={index} selected> {distric.name} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>


          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ปี</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top">
                {this.props.year_list.map(function (year, index) {
                  if (current.props.year === year.type) {
                    return <option defaultValue={year.id} key={index} selected> {year.type} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
            <div className="grid_2"><p className="cancel-default float-left">ตอน</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top">
                {this.props.station_list.map(function (station, index) {
                  if (current.props.station === station.name) {
                    return <option defaultValue={station.id} key={index} selected> {station.name} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">เดือน</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top">
                {this.props.month_list.map(function (month, index) {
                  if (current.props.month === month.type) {
                    return <option defaultValue={month.id} key={index} selected> {month.type} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>
        </>
      )
    }
  }

  render() {

    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">รายงาน บ.22</h4>
              {/* Input in TopBar */}
              {this.checkActionMode(this.props.actionMode)}
            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายงาน")}>รายงาน</button>
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

  level_list: state.level_list,
  type_list: state.type_list,
  district_list: state.district_list,
  station_list: state.station_list,
  year_list: state.year_list,
  month_list: state.month_list,

  report: state.report,
  level: state.level,
  type: state.type,
  district: state.district,
  station: state.station,
  year: state.year,
  month: state.month,
})

const mapDispatchToProps = (dispatch) => ({

  onChangeReport: (e) => dispatch(onChangeReport(e)),
  onChangeLevel: (e) => dispatch(onChangeLevel(e)),
  onChangeType: (e) => dispatch(onChangeType(e)),
  onChangeDistrict: (e) => dispatch(onChangeDistrict(e)),
  onChangeStation: (e) => dispatch(onChangeStation(e)),
  onChangeYear: (e) => dispatch(onChangeYear(e)),
  onChangeMonth: (e) => dispatch(onChangeMonth(e)),

})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

export const onChangeReport = (e) => {
  return {
    type: "ON CHANGE REPORT",
    value: e.target.value
  }
}

export const onChangeLevel = (e) => {
  return {
    type: "ON CHANGE LEVEL",
    value: e.target.value
  }
}

export const onChangeType = (e) => {
  return {
    type: "ON CHANGE TYPE",
    value: e.target.value
  }
}

export const onChangeDistrict = (e) => {
  return {
    type: "ON CHANGE DISTRICT",
    value: e.target.value
  }
}

export const onChangeStation = (e) => {
  return {
    type: "ON CHANGE STATION",
    value: e.target.value
  }
}

export const onChangeYear = (e) => {
  return {
    type: "ON CHANGE YEAR",
    value: e.target.value
  }
}

export const onChangeMonth = (e) => {
  return {
    type: "ON CHANGE MONTH",
    value: e.target.value
  }
}