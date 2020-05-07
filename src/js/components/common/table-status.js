import React from 'react';
import { connect } from 'react-redux'

class TableSatus extends React.Component {
  checkVariable = (check, value) => {
    if (check === "green") {
      return (
        <i className="fas fa-check-circle green"></i>
      )
    }
    if (check === "gray") {
      return (
        <i className="fas fa-check-circle gray"></i>
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
              {current.props.headTableStatus.map(function (headTableStatus, index) {
                return (
                  <th className="font-for-status" style={{ minWidth: `${headTableStatus[1]}` }} key={index}>
                    {headTableStatus[0]}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {current.props.bodyTableStatus.map((bodyTableStatus, i) => {
              return (
                <tr key={i} id={i}>
                  {bodyTableStatus.map((rowBodyTable, j) => {
                    return (
                      <>
                        <td className="font-for-status" style={{ minWidth: `${rowBodyTable[1]}` }} key={j} id={j}>
                          {current.checkVariable(rowBodyTable[2],rowBodyTable[0])}
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
    headTableStatus: state.headTableStatus,
    bodyTableStatus: state.bodyTableStatus
  };
};

export default connect(mapStateToProps)(TableSatus);