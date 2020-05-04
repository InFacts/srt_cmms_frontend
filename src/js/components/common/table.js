import React from 'react';
import { connect } from 'react-redux'

class Table extends React.Component {
  render() {
    const current = this;
    return (
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

          {this.props.bodyTable.map(function (bodyTable, i) {
            return (
              <tr>
                {bodyTable.map(function (rowBodyTable, y) {
                  console.log("hi", rowBodyTable)
                  return (
                    <>
                      <td className={`edit-padding" ${rowBodyTable[1]} ${rowBodyTable[2]}`} key={i} id={i, y}>
                        {rowBodyTable[3] ?
                          <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                            <input type="text" className="p-search-box__input cancel-default-table" value={rowBodyTable[0]} onChange={(e) => current.props.handleChangeText(e)} />
                            <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModal" aria-controls="modal"></i></button>
                          </div> : rowBodyTable[0]}
                      </td>
                    </>
                  )
                })}
              </tr>
            )
          })}

        </tbody>
      </table>
    )
  };
}

const mapStateToProps = (state) => ({
  headTable: state.headTable,
  bodyTable: state.bodyTable
})

const mapDispatchToProps = (dispatch) => ({
  handleChangeText: (e) => dispatch(changeText(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table);


// ACtion Creator
export const changeText = (e) => {
  // console.log(e.target.parentNode.parentNode.id)
  return {
    type: "TEXT",
    value: e.target.value,
    position: e.target.parentNode.parentNode.id
  }
}