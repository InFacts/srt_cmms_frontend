import React from 'react';
import { connect } from 'react-redux'

class TablePopUP extends React.Component {
  render() {
    const current = this;
    return (
      <>
        <div className="modal" id={this.props.idPopUpTable} style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">{this.props.variablePopUp.head}</p>
            <div className="container_12 edit-padding">
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">{this.props.variablePopUp.labelFind}</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default" onChange={(e) => this.props.handleChangeSearchPopUp(e)} value={this.props.variablePopUp.filterInventoryID} />
                </div>
                <button className="button-blue grid_1 float-right mr-5" type="button" onClick={(e) => this.props.handleSubmitSearch(e)}>ค้นหา</button>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      {this.props.headTablePopUp.map(function (headTablePopUp, index) {
                        return (
                          <th className="font" style={{ minWidth: headTablePopUp[1] }} key={index}>{headTablePopUp[0]}</th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {current.props.bodyTablePopUp_Show.map((bodyTablePopUp_Show, i) => {
                      return (
                        <tr key={i} id={i}>
                          {bodyTablePopUp_Show.map((rowBodyTablePopUp_Show, j) => {
                            return (
                              <>
                                <td className={`edit-padding" ${rowBodyTablePopUp_Show[1]} ${rowBodyTablePopUp_Show[2]}`} key={j} id={j} >
                                  {
                                    rowBodyTablePopUp_Show[3] ? <button type="button" className="button-green" onClick={(e) => this.props.handleSubmitSelect(e)} aria-label="Close active modal" aria-controls={current.props.idPopUpTable} id="aria-controls2">ยืนยัน</button> : rowBodyTablePopUp_Show[0]
                                  }
                                </td>
                              </>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="grid_12">
                <button className="button-blue mt-5 float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls={current.props.idPopUpTable} id="aria-controls2">กลับ</button>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  };
}

const mapStateToProps = state => {
  return {
    idPopUpTable: state.idPopUpTable,
    variablePopUp: state.variablePopUp,
    headTablePopUp: state.headTablePopUp,
    bodyTablePopUp_Show: state.bodyTablePopUp_Show
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleChangeSearchPopUp: (e) => dispatch(changeSearchPopUp(e)),
  handleSubmitSearch: (e) => dispatch(submitSearch(e)),
  handleSubmitSelect: (e) => dispatch(submitSelect(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(TablePopUP);

// Action Creator
export const changeSearchPopUp = (e) => {
  return {
    type: "SEARCH POPUP",
    value: e.target.value
  }
}

export const submitSearch = (e) => {
  return {
    type: "SUBMIT SEARCH",
    value: e.target.value
  }
}

export const submitSelect = (e) => {
  // console.log("nuk check", e.target.parentNode.parentNode.id)
  return {
    type: "SELECT ROW IN POPUP",
    rowIndexPopUp: e.target.parentNode.parentNode.id
  }
}