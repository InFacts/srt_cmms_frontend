import React from 'react';
import { connect } from 'react-redux'

class TablePopUP extends React.Component {
  render() {
    const current = this;
    return (
      <>
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
      </>
    )
  };
}

const mapStateToProps = state => {
  return {
    idPopUpTable: state.idPopUpTable,
    headTablePopUp: state.headTablePopUp,
    bodyTablePopUp_Show: state.bodyTablePopUp_Show
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleSubmitSelect: (e) => dispatch(submitSelect(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(TablePopUP);

// Action Creator
export const submitSelect = (e) => {
  // console.log("nuk check", e.target.parentNode.parentNode.id)
  return {
    type: "SELECT ROW IN POPUP",
    rowIndexPopUp: e.target.parentNode.parentNode.id
  }
}