import React from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

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
        <Redirect to="/main"></Redirect>
      )
    }
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่คลัง</p>
            </div>
            <div className="grid_3 pull_1">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={this.props.inventory_id} onChange={(e) => this.props.onChangeInventoryId(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalSrcInventory"></i></button>
              </div>
            </div>
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" value={this.props.inventory_name} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">ชื่อคลัง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่สิ่งของ</p>
            </div>
            <div className="grid_3 pull_1">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={this.props.no_item} onChange={(e) => this.props.onChangeNoItem(e)} />
                {/* <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart"></i></button> */}
              </div>
            </div>
            {/* <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" value={this.props.des_item} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">รายการสิ่งของ</p>
            </div> */}
          </div>

          <div className="grid_12">
            {/* <div className="grid_2">
              <p className="top-text">แขวง</p>
            </div>
            <div className="grid_3 pull_1">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={this.props.districts} onChange={(e) => this.props.onChangeDistricts(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalDistricts"></i></button>
              </div>
            </div> */}
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">ปี</p>
            </div>
          </div>

          <div className="grid_12">
            {/* <div className="grid_2">
              <p className="top-text">ตอน</p>
            </div>
            <div className="grid_3 pull_1">
            <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={this.props.node} onChange={(e) => this.props.onChangeNode(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNode"></i></button>
              </div>
            </div> */}
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เดือน</p>
            </div>
          </div>

          <div className="grid_12">
            <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" onClick={(e) => this.props.onClickSearchS1(this.props.inventory_id, this.props.no_item)}>ค้นหา</button>
          </div>
        </>
      )
    }
  }

  render() {
    const current = this;
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">รายงาน ส.1</h4>
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

        {/* PopUp เลขที่อะไหล่ */}
        <div className="modal" id="modalNoPart" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.no_item} onChange={(e) => this.props.onChangeNoItem(e)} />
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">รายละเอียด</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.des_item} onChange={(e) => this.props.onChangeDesItem(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(this.props.no_item, this.props.des_item)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                      <th className="font" style={{ minWidth: "450px" }}>รายละเอียด</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.item_pop_up.map(function (item_pop_up, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{item_pop_up.internal_item_id}</td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}>{item_pop_up.description}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart" onClick={(e) => current.props.onClickSelectPopUpNoPart(e)}>เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>
              </div>

            </div>
          </div>
        </div>

        {/* PopUp ค้นหาเลขที่คลัง */}
        <div className="modal" id="modalSrcInventory" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่คลัง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่คลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.inventory_id} onChange={(e) => this.props.onChangeInventoryId(e)} />
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชื่อคลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.inventory_name} onChange={(e) => this.props.onChangeInventoryName(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchInventory(this.props.inventory_id, this.props.inventory_name)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>เลขที่คลัง</th>
                      <th className="font" style={{ minWidth: "450px" }}>ชื่อคลัง</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.props.inventory_pop_up.map(function (inventory_pop_up, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{inventory_pop_up.warehouse_id}</td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}>{inventory_pop_up.name}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" aria-label="Close active modal" aria-controls="modalSrcInventory" id="closeModalInventory" onClick={(e) => current.props.onClickPopUpSelectInventory(e)}>เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalSrcInventory" id="closeModalInventory">กลับ</button>
              </div>

            </div>
          </div>
        </div>

        {/* PopUp ค้นหาแขวง */}
        <div className="modal" id="modalDistricts" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาแขวง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชื่อแขวง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.districts} onChange={(e) => this.props.onChangeDistricts(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchDistricts(this.props.districts)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "100px" }}>ลำดับ</th>
                      <th className="font" style={{ minWidth: "650px" }}>ชื่อแขวง</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.props.districts_pop_up.map(function (districts_pop_up, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding">{index+1}</td>
                          <td className="edit-padding">{districts_pop_up.name}</td>
                          <td className="edit-padding text-center">
                            <button type="button" className="button-blue" aria-label="Close active modal" aria-controls="modalDistricts" id="closeModalInventory" onClick={(e) => current.props.onClickPopUpSelectDistricts(e)}>เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalDistricts" id="closeModalInventory">กลับ</button>
              </div>

            </div>
          </div>
        </div>

       {/* PopUp ค้นหาตอน */}
       <div className="modal" id="modalNode" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาตอน</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชื่อตอน</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.node} onChange={(e) => this.props.onChangeNode(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNode(this.props.node, this.props.districts_id)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "100px" }}>ลำดับ</th>
                      <th className="font" style={{ minWidth: "650px" }}>ชื่อตอน</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.props.node_pop_up.map(function (node_pop_up, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding">{index+1}</td>
                          <td className="edit-padding">{node_pop_up.name}</td>
                          <td className="edit-padding text-center">
                            <button type="button" className="button-blue" aria-label="Close active modal" aria-controls="modalNode" id="closeModalInventory" onClick={(e) => current.props.onClickPopUpSelectNode(e)}>เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalNode" id="closeModalInventory">กลับ</button>
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

  no_item: state.no_item,
  des_item: state.des_item,
  item_pop_up: state.item_pop_up,
  inventory_id: state.inventory_id,
  inventory_name: state.inventory_name,
  inventory_pop_up: state.inventory_pop_up,
  districts: state.districts,
  districts_pop_up: state.districts_pop_up,
  node: state.node,
  node_pop_up: state.node_pop_up,
  districts_id: state.districts_id,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeNoItem: (e) => dispatch(onChangeNoItem(e)),
  onChangeDesItem: (e) => dispatch(onChangeDesItem(e)),
  onClickSearchPopUpNoPart: (e, i) => dispatch(onClickSearchPopUpNoPart(e, i)),
  onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),
  onChangeInventoryId: (e) => dispatch(onChangeInventoryId(e)),
  onChangeInventoryName: (e) => dispatch(onChangeInventoryName(e)),
  onClickPopUpSearchInventory: (e, i) => dispatch(onClickPopUpSearchInventory(e, i)),
  onClickPopUpSelectInventory: (e) => dispatch(onClickPopUpSelectInventory(e)),
  onChangeDistricts: (e) => dispatch(onChangeDistricts(e)),
  onClickPopUpSearchDistricts: (e) => dispatch(onClickPopUpSearchDistricts(e)),
  onClickPopUpSelectDistricts: (e) => dispatch(onClickPopUpSelectDistricts(e)),
  onChangeNode: (e) => dispatch(onChangeNode(e)),
  onClickPopUpSearchNode: (e, i) => dispatch(onClickPopUpSearchNode(e ,i)),
  onClickPopUpSelectNode: (e) => dispatch(onClickPopUpSelectNode(e)),
  onClickSearchS1: (e, i) => dispatch(onClickSearchS1(e, i)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

export const onChangeNoItem = (e) => {
  return {
    type: "ON CHANGE NO ITEM",
    value: e.target.value
  }
}
export const onChangeDesItem = (e) => {
  return {
    type: "ON CHANGE DES ITEM",
    value: e.target.value
  }
}
export const onClickSearchPopUpNoPart = (list_no_part, list_desription_part) => {
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/items?internal_item_id=${list_no_part}&description=${list_desription_part}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      // dispatch
      dispatch({
        type: "ON CLICK SEARCH POPUP NO PART",
        value: res.data.results
      });
    });
  };
}
export const onClickSelectPopUpNoPart = (e) => {
  var rowIndex = e.target.parentNode.parentNode.id
  return {
    type: "ON CLICK SELECT POPUP NO PART",
    rowIndex: rowIndex
  };
}
export const onChangeInventoryId = (e) => {
  return {
    type: "ON CHANGE INVENTORY ID",
    value: e.target.value
  }
}
export const onChangeInventoryName = (e) => {
  return {
    type: "ON CHANGE INVENTORY NAME",
    value: e.target.value
  }
}
export const onClickPopUpSearchInventory = (dest_warehouse_id, dest_warehouse_name) => {
  console.log("dest_warehouse_id", dest_warehouse_id, "dest_warehouse_name", dest_warehouse_name)
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/warehouses?warehouse_id=${dest_warehouse_id}&name=${dest_warehouse_name}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      dispatch({
        type: "CLICK SEARCH POPUP INVENTORY",
        value: res.data.results
      });
    });
  };
}
export const onClickPopUpSelectInventory = (e) => {
  console.log(e.target.parentNode.parentNode)
  return {
    type: "CLICK SELECT POPUP INVENTORY",
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeDistricts = (e) => {
  return {
    type: "ON CHANGE DISTRICTS",
    value: e.target.value
  }
}
export const onClickPopUpSearchDistricts = (districts) => {
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/districts?district_name=${districts}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      dispatch({
        type: "CLICK SEARCH POPUP DISTRICTS",
        value: res.data.results
      });
    });
  };
}
export const onClickPopUpSelectDistricts = (e) => {
  return {
    type: "CLICK SELECT POPUP DISTRICTS",
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNode = (e) => {
  return {
    type: "ON CHANGE NODE",
    value: e.target.value
  }
}
export const onClickPopUpSearchNode = (node, districts_id) => {
  console.log(districts_id)
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/nodes?district_id=${districts_id}&node_name=${node}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      // dispatch
      dispatch({
        type: "ON CLICK SEARCH POPUP NODE",
        value: res.data.results
      });
    });
  };
}
export const onClickPopUpSelectNode = (e) => {
  var rowIndex = e.target.parentNode.parentNode.id
  return {
    type: "ON CLICK SELECT POPUP NODE",
    rowIndex: rowIndex
  };
}
export const onClickSearchS1 = (inventory_id, no_item) => {
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/statistic/goods-monthly-summary/plus?warehouse_id=${inventory_id}&internal_item_id=${no_item}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      dispatch({
        type: "CLICK SEARCH POPUP S1",
        value: res.data.results
      });
    });
  };
}