import React from 'react';
import { connect } from 'react-redux'

import '../../../css/style.css'
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
    if (mode === "search") {
      // console.log("Search mode is Action")
      return (
        <>
          <div className="grid_12">
            <div className="grid_1"><p className="top-text">เลขที่คลัง</p></div>
            <div>
              <div className="grid_2">
                <div className="p-search-box cancel-margin">
                  <input type="text" className="p-search-box__input cancel-default" value={this.props.no_inventory} onChange={(e) => this.props.onChangeNoInventory(e)} />
                  <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalInventory" onClick={(e) => this.props.onClickOpenPopUp(e)}></i></button>
                </div>
              </div>
              <div className="grid_2 cancel-default text-right">
                <p className="cancel-default">ชื่อเต็มคลัง</p>
              </div>
              <div className="grid_4">
                <input type="text" className="cancel-default font-black" defaultValue={this.props.inventory_show.full_name} disabled="disabled"></input>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_5 cancel-default text-right">
              <p className="cancel-default">ชื่อย่อคลัง</p>
            </div>
            <div className="grid_4">
              <input type="text" className="cancel-default font-black" defaultValue={this.props.inventory_show.short_name} disabled="disabled"></input>
            </div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_1"><p className="top-text">เลขที่คลัง</p></div>
            <div>
              <div className="grid_2">
                <div className="p-search-box cancel-margin">
                  <input type="text" className="p-search-box__input cancel-default" value={this.props.no_inventory} onChange={(e) => this.props.onChangeNoInventory(e)} />
                  <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalInventory" onClick={(e) => this.props.onClickOpenPopUp(e)}></i></button>
                </div>
              </div>
              <div className="grid_2 cancel-default text-right">
                <p className="cancel-default">ชื่อเต็มคลัง</p>
              </div>
              <div className="grid_4">
                <input type="text" className="cancel-default font-black" value={this.props.inventory_show.full_name} onChange={(e) => this.props.onChangeFullName(e)}></input>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_5 cancel-default text-right">
              <p className="cancel-default">ชื่อย่อคลัง</p>
            </div>
            <div className="grid_4">
              <input type="text" className="cancel-default font-black" value={this.props.inventory_show.short_name} onChange={(e) => this.props.onChangeShortName(e)}></input>
            </div>
          </div>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_1"><p className="top-text">เลขที่คลัง</p></div>
            <div>
              <div className="grid_2">
                <input type="text" className="cancel-default font-black" value={this.props.no_inventory_add} onChange={(e) => this.props.onChangeNoInventoryAdd(e)} />
              </div>
              <div className="grid_2 cancel-default text-right">
                <p className="cancel-default">ชื่อเต็มคลัง</p>
              </div>
              <div className="grid_4">
                <input type="text" className="cancel-default font-black" value={this.props.full_name_add} onChange={(e) => this.props.onChangeFullNameAdd(e)}></input>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_5 cancel-default text-right">
              <p className="cancel-default">ชื่อย่อคลัง</p>
            </div>
            <div className="grid_4">
              <input type="text" className="cancel-default font-black" value={this.props.short_name_add} onChange={(e) => this.props.onChangeShortNameAdd(e)}></input>
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
            <section className="grid_12 ">
              <h4 className="head-title">คลัง - Setup</h4>
              {/* Input in TopBar */}
              {this.checkActionMode(this.props.actionMode)}
            </section>

            {/*  Tab Bar  */}
            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ทั่วไป")}>ทั่วไป</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>
          </div>
        </div>

        {/* PopUp ค้นหาเลขที่คลัง */}
        <div className="modal" id="modalInventory" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาคลัง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่คลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.no_inventory} onChange={(e) => this.props.onChangeNoInventory(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoInventory(e)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>เลขที่คลัง</th>
                      <th className="font" style={{ minWidth: "450px" }}>ชื่อเต็มคลัง</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.inventory_show_popup.map(function (inventory_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}> {inventory_show_popup.no_inventory} </td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {inventory_show_popup.full_name} </td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoInventory(e)} aria-label="Close active modal" aria-controls="modalInventory" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalInventory" id="closeModalInventory">กลับ</button>
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
  no_inventory: state.no_inventory,
  inventory_show_popup: state.inventory_show_popup,
  inventory_show: state.inventory_show,

  // Mode Add
  no_inventory_add: state.no_inventory_add,
  full_name_add: state.full_name_add,
  short_name_add: state.short_name_add,
})
const mapDispatchToProps = (dispatch) => ({
  onChangeNoInventory: (e) => dispatch(onChangeNoInventory(e)),
  onClickPopUpSearchNoInventory: (e) => dispatch(onClickPopUpSearchNoInventory(e)),
  onClickSelectNoInventory: (e) => dispatch(onClickSelectNoInventory(e)),
  onClickOpenPopUp: (e) => dispatch(onClickOpenPopUp(e)),

  // Mode Edit
  onChangeFullName: (e) => dispatch(onChangeFullName(e)),
  onChangeShortName: (e) => dispatch(onChangeShortName(e)),

  // Mode Add
  onChangeNoInventoryAdd: (e) => dispatch(onChangeNoInventoryAdd(e)),
  onChangeFullNameAdd: (e) => dispatch(onChangeFullNameAdd(e)),
  onChangeShortNameAdd: (e) => dispatch(onChangeShortNameAdd(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

// Mode Search
export const onChangeNoInventory = (e) => {
  return {
    type: "ON CHANGE NO INVENTORY",
    value: e.target.value
  }
}
export const onClickPopUpSearchNoInventory = (e) => {
  return {
    type: "CLICK SEARCH POPUP NO INVENTORY"
  }
}
export const onClickSelectNoInventory = (e) => {
  // console.log(e.target.parentNode.parentNode)
  return {
    type: "CLICK SELECT POPUP NO INVENTORY",
    row_inventory_show_popup: e.target.parentNode.parentNode.id
  }
}
export const onClickOpenPopUp = (e) => {
  return {
    type: "CLICK OPEN POPUP"
  }
}

// Mode Edit
export const onChangeFullName = (e) => {
  return {
    type: "ON CHANGE FULL NAME",
    value: e.target.value
  }
}
export const onChangeShortName = (e) => {
  return {
    type: "ON CHANGE SHORT NAME",
    value: e.target.value
  }
}

// Mode Add
export const onChangeNoInventoryAdd = (e) => {
  return {
    type: "ON CHANGE NO INVENTORY ADD",
    value: e.target.value
  }
}
export const onChangeFullNameAdd = (e) => {
  return {
    type: "ON CHANGE FULL NAME ADD",
    value: e.target.value
  }
}
export const onChangeShortNameAdd = (e) => {
  return {
    type: "ON CHANGE SHORT NAME ADD",
    value: e.target.value
  }
}