import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useFormikContext } from 'formik';

const PopupModalInventory = (props) => {
  const [data, setData] = useState([]);
  const [currentQueryString, setCurrentQueryString] = useState("");
  const [queryString, setQueryString] = useState("")
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const filterDataOnCurrentQueryString = () => {
      // currentQueryString
      setData(props.warehouses.filter(function (warehouses) {
        var removeSpaces = currentQueryString.replace(/\s/g, '');
        const regex = new RegExp(`${removeSpaces}`, 'i');
        var isMatch = regex.test(warehouses.warehouse_id) || regex.test(warehouses.name);
        return (isMatch);
      }));
      // setData corresponding to currentQueryString
    };
    filterDataOnCurrentQueryString();
  }, [currentQueryString, props.warehouses]);

  return (
    <div className="modal" id="modalInventory" style={{ display: "none" }}>
      <div className="gray-board">
        <p className="head-title-modal edit">ค้นหาเลขที่คลัง</p>
        <div className="container_12 edit-padding">

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อคลัง</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_3" value={queryString} onChange={e => setQueryString(e.target.value)} />
              <button className="button-blue edit grid_1 mr-5" type="button" onClick={() => setCurrentQueryString(queryString)}>ค้นหา</button>
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
                {data.map(function (inventory_show_popup, index) {
                  return (
                    <tr key={index} id={index}>
                      <td className="edit-padding" style={{ minWidth: "150px" }}> {inventory_show_popup.warehouse_id} </td>
                      <td className="edit-padding" style={{ minWidth: "300px" }}> {inventory_show_popup.name} </td>
                      <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                        <button type="button" className="button-blue" onClick={() => setFieldValue(`${props.name}`, inventory_show_popup.warehouse_id, true)} aria-label="Close active modal" aria-controls="modalInventory" id="closeModalInventory" >เลือก</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

            <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalInventory" id="closeModalInventory">กลับ</button>

        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  warehouses: state.api.fact.warehouses.items,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PopupModalInventory);