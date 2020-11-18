import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useFormikContext } from 'formik';

const PopupModalUsername = (props) => {
  const [data, setData] = useState([]);
  const [currentQueryString, setCurrentQueryString] = useState("");
  const [queryString, setQueryString] = useState("")
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const filterDataOnCurrentQueryString = () => {
        // currentQueryString
        setData(props.users.filter(function (users) {
          var removeSpaces = currentQueryString.replace(/\s/g, '');
          const regex = new RegExp(`${removeSpaces}`, 'i');
          var isMatch = regex.test(users.employee_id) || regex.test(users.firstname_th);
          return (isMatch);
        }));
        // setData corresponding to currentQueryString
    };
    filterDataOnCurrentQueryString();
  }, [currentQueryString, props.users]);

  return (
    <div className="modal" id="modalUserName" style={{ display: "none" }}>
      <div className="gray-board">
        <p className="head-title-modal edit">ค้นหาชื่อผู้นำเข้า</p>
        <div className="container_12 edit-padding">
          <div className="container_12">
            <div className="grid_2"><p className="cancel-default">ค้นหาพนักงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_3" value={queryString} onChange={e => setQueryString(e.target.value)} />
              <button className="button-blue edit grid_1 mr-5" type="button" onClick={() => setCurrentQueryString(queryString)}>ค้นหา</button>
            </div>
          </div>

          <div className="container_12">
            <table className="table-many-column mt-3" style={{height: "270px"}}>
              <thead>
                <tr>
                  <th className="font" style={{ minWidth: "300px" }}>รหัสพนักงาน</th>
                  <th className="font" style={{ minWidth: "450px" }}>ชื่อพนักงาน</th>
                  <th className="font" style={{ minWidth: "150px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map(function (line_users, index) {
                  return (
                    <tr key={index} id={index}>
                      <td className="edit-padding" style={{ minWidth: "150px" }}> {line_users.employee_id} </td>
                      <td className="edit-padding" style={{ maxWidth: "300px" }}> {line_users.firstname_th} {line_users.lastname_th}</td>
                      <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                        <button type="button" className="button-blue" onClick={() => setFieldValue('created_by_user_employee_id', line_users.employee_id, true)} aria-label="Close active modal" aria-controls="modalUserName" id="closeModalInventory" >เลือก</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalUserName" id="closeModalInventory">กลับ</button>

        </div>
      </div>
    </div>)
}

const mapStateToProps = (state) => ({
  users: state.api.fact.users.items,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PopupModalUsername);