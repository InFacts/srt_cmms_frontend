import React from 'react';
import { connect } from 'react-redux'

class Table extends React.Component {
  checkVariable = (check, value) => {
    if (check === "search") {
      return (
        <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
          <input type="text" className="p-search-box__input cancel-default-table" value={value} onChange={(e) => this.props.handleChangeSearch(e)} onKeyDown={(e) => this.props._handleKeyDown(e)} />
          <button type="button" className="p-search-box__button cancel-padding hidden"><i className="p-icon--search" onClick={(e) => this.props.handleOnClickOpenPopUp(e, value)} id="showModal2" aria-controls={this.props.idPopUpTable} ></i></button>
        </div>
      )
    }
    if (check === "number") {
      return (
        <input type="number" min="0" className="cancel-default" value={value} onChange={(e) => this.props.handleChangeNumber(e)} />
      )
    }
    if (check === "text") {
      return (
        <input type="text" className="cancel-default" value={value} onChange={(e) => this.props.handleChangeText(e)} />
      )
    }
    else {
      return value;
    }
  }
  render() {
    const current = this;
    return (
      <>
        <table className="table-many-column">
          <thead>
            <tr>
              {this.props.headTable.map(function (headTable, index) {
                return (
                  <th className={`font ${headTable[1]}`} style={{ minWidth: `${headTable[2]}` }} key={index}>
                    {headTable[0]}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.bodyTable.map((bodyTable, rowBodyTable) => {
              return (
                <tr key={rowBodyTable} id={rowBodyTable}>
                  {bodyTable.map((rowBodyTable, columnBodyTable) => {
                    return (
                      <>
                        <td className={`edit-padding" ${rowBodyTable[1]} ${rowBodyTable[2]}`} key={columnBodyTable} id={columnBodyTable}>
                          {current.checkVariable(rowBodyTable[3], rowBodyTable[0])}
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
  // console.log("NEW state", state);
  return {
    headTable: state.headTable,
    bodyTable: state.bodyTable,
    idPopUpTable: state.idPopUpTable
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleChangeSearch: (e) => dispatch(changeSearch(e)),
  handleOnClickOpenPopUp: (e, value) => dispatch(onClickOpenPopUp(e, value)),
  handleChangeText: (e) => dispatch(changeText(e)),
  handleChangeNumber: (e) => dispatch(changeNumber(e)),
  _handleKeyDown: (e) => dispatch(handleKeyDown(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(Table);

// Action Creator
export const changeSearch = (e) => {
  // console.log(e.target.parentNode.parentNode.parentNode)
  return {
    type: "CLICK SEARCH TYPE HAVE WORD",
    value: e.target.value,
    columnBodyTable: e.target.parentNode.parentNode.id,
    rowBodyTable: e.target.parentNode.parentNode.parentNode.id
  }
}

export const onClickOpenPopUp = (e, value) => {
  // console.log("value", value)
  return {
    type: "CLICK SEARCH TYPE NO WORD",
    value: value,
    columnBodyTable: e.target.parentNode.parentNode.parentNode.id,
    rowBodyTable: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}

export const changeText = (e) => {
  return {
    type: "TEXT",
    value: e.target.value,
    columnBodyTable: e.target.parentNode.id,
    rowBodyTable: e.target.parentNode.parentNode.id
  }
}

export const changeNumber = (e) => {
  // console.log(e.target.parentNode)
  // console.log(e.target.parentNode.parentNode)
  return {
    type: "NUMBER",
    value: e.target.value,
    columnBodyTable: e.target.parentNode.id,
    rowBodyTable: e.target.parentNode.parentNode.id
  }
}

export const handleKeyDown = (e) => {
    return {
      type: "ENTER VALUE IN TABLE",
      key: e.key,
      value: e.target.value,
      columnBodyTable: e.target.parentNode.parentNode.id,
      rowBodyTable: e.target.parentNode.parentNode.parentNode.id
    }
}