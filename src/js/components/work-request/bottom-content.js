import React from 'react';
import { connect } from 'react-redux';
import Document from '../../../images/document.svg'
import Files from '../common/files'
import '../../../css/style.css'

class BottomContent extends React.Component {
  checkActionMode = (mode) => {
    let current = this;
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้แจ้งเหตุ</p></div>
            <div className="grid_7 ">
              <input type="text" className="cancel-default mt-1" value={this.props.document_show.created_by_user_id} disabled="disabled"></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">วันเวลาเกิดเหตุ</p></div>
            <div className="grid_7 ">
              <input type="date" className="cancel-default grid_3 mt-1" value={this.props.document_show.created_on_date} disabled="disabled"></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.document_show.created_on_time} disabled="disabled"></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">อาการขัดข้อง</p></div>
            <div className="grid_7 ">
              {/* parameter undefined */}
              <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.document_show.job_name} disabled="disabled"></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
            <div className="grid_3 ">
              {/* parameter undefined */}
              <input type="text" className="cancel-default mt-1" value={this.props.document_show.created_by_user_id} disabled="disabled"></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ ตอน</p></div>
            <div className="grid_3 ">
              {/* parameter undefined */}
              <input type="text" className="cancel-default mt-1" value={this.props.document_show.created_by_user_id} disabled="disabled"></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายละเอียดของสถานที่</p></div>
            <div className="grid_3 ">
              {/* parameter undefined */}
              <input type="text" className="cancel-default mt-1" value={this.props.document_show.created_by_user_id} disabled="disabled"></input>
            </div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้แจ้งเหตุ</p></div>
            <div className="grid_7 ">
              <input type="text" className="cancel-default mt-1" value={this.props.document_show.created_by_user_id} onChange={(e) => { this.props.onChangeInformatioNameEdit(e) }}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">วันเวลาเกิดเหตุ</p></div>
            <div className="grid_7 ">
              <input type="date" className="cancel-default grid_3 mt-1" value={this.props.document_show.created_on_date} onChange={(e) => { this.props.onChangeDateEdit(e) }}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.document_show.created_on_time} onChange={(e) => { this.props.onChangeTimeEdit(e) }}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">อาการขัดข้อง</p></div>
            <div className="grid_7 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.document_show.job_name} onChange={(e) => { this.props.onChangeJobNameEdit(e) }}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeDistrictEdit(e)}>
               
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ ตอน</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeZoneEdit(e)}>
               
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายละเอียดของสถานที่</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeStationEdit(e)}>
                
              </select>
            </div>
          </div>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้แจ้งเหตุ</p></div>
            <div className="grid_7 ">
              <input type="text" className="cancel-default mt-1" value={this.props.document_show_mode_add.created_by_admin_name_th} disabled="disabled"></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">วันเวลาเกิดเหตุ</p></div>
            <div className="grid_7 ">
              <input type="date" className="cancel-default grid_3 mt-1" value={this.props.document_show_mode_add.created_on_date} onChange={(e) => { this.props.onChangeDateAdd(e) }}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.document_show_mode_add.created_on_time} onChange={(e) => { this.props.onChangeTimeAdd(e) }}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">อาการขัดข้อง</p></div>
            <div className="grid_7 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.document_show_mode_add.job_name} onChange={(e) => { this.props.onChangeJobNameAdd(e) }}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeDistrictAdd(e)}>
              
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ ตอน</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeZoneAdd(e)}>
             
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายละเอียดของสถานที่</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeStationAdd(e)}>
               
              </select>
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

            <h3 className="head-title-bottom mt-2">ข้อมูลเหตุขัดข้อง/ชำรุด</h3>
            {/* Input in Bottom */}
            {this.checkActionMode(this.props.actionMode)}
          </div>
          <div className="grid_12 ">
            <Files />
          </div>


        </div>
      </div>

    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  document_show: state.document_show,
  // list_show: state.list_show,

  document_show_mode_add: state.document_show_mode_add,
  
})

const mapDispatchToProps = (dispatch) => ({
  // Mode Edit
  onChangeInformatioNameEdit: (e) => dispatch(onChangeInformatioNameEdit(e)),
  onChangeDateEdit: (e) => dispatch(onChangeDateEdit(e)),
  onChangeTimeEdit: (e) => dispatch(onChangeTimeEdit(e)),
  onChangeStationEdit: (e) => dispatch(onChangeStationEdit(e)),
  onChangeDistrictEdit: (e) => dispatch(onChangeDistrictEdit(e)),
  onChangeZoneEdit: (e) => dispatch(onChangeZoneEdit(e)),
  onChangeJobNameEdit: (e) => dispatch(onChangeJobNameEdit(e)),

  // Mode Add
  onChangeInformatioNameAdd: (e) => dispatch(onChangeInformatioNameAdd(e)),
  onChangeDateAdd: (e) => dispatch(onChangeDateAdd(e)),
  onChangeTimeAdd: (e) => dispatch(onChangeTimeAdd(e)),
  onChangeStationAdd: (e) => dispatch(onChangeStationAdd(e)),
  onChangeDistrictAdd: (e) => dispatch(onChangeDistrictAdd(e)),
  onChangeZoneAdd: (e) => dispatch(onChangeZoneAdd(e)),
  onChangeJobNameAdd: (e) => dispatch(onChangeJobNameAdd(e)),

})
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

export const onChangeInformatioNameEdit = (e) => {
  return {
    type: "ON CHANGE INFORMATION EDIT",
    value: e.target.value
  }
}
export const onChangeDateEdit = (e) => {
  return {
    type: "ON CHANGE DATE EDIT",
    value: e.target.value
  }
}

export const onChangeTimeEdit = (e) => {
  return {
    type: "ON CHANGE TIME EDIT",
    value: e.target.value
  }
}

export const onChangeStationEdit = (e) => {
  return {
    type: "ON CHANGE STATION EDIT",
    value: e.target.value
  }
}

export const onChangeDistrictEdit = (e) => {
  return {
    type: "ON CHANGE DISTRICTS EDIT",
    value: e.target.value
  }
}

export const onChangeZoneEdit = (e) => {
  return {
    type: "ON CHANGE ZONE EDIT",
    value: e.target.value
  }
}

export const onChangeJobNameEdit = (e) => {
  return {
    type: "ON CHANGE JOB NAME EDIT",
    value: e.target.value
  }
}


export const onChangeInformatioNameAdd = (e) => {
  return {
    type: "ON CHANGE INFORMATION ADD",
    value: e.target.value
  }
}
export const onChangeDateAdd = (e) => {
  return {
    type: "ON CHANGE DATE ADD",
    value: e.target.value
  }
}

export const onChangeTimeAdd = (e) => {
  return {
    type: "ON CHANGE TIME ADD",
    value: e.target.value
  }
}

export const onChangeStationAdd = (e) => {
  return {
    type: "ON CHANGE STATION ADD",
    value: e.target.value
  }
}

export const onChangeDistrictAdd = (e) => {
  return {
    type: "ON CHANGE DISTRICTS ADD",
    value: e.target.value
  }
}

export const onChangeZoneAdd = (e) => {
  return {
    type: "ON CHANGE ZONE ADD",
    value: e.target.value
  }
}

export const onChangeJobNameAdd = (e) => {
  return {
    type: "ON CHANGE JOB NAME ADD",
    value: e.target.value
  }
}