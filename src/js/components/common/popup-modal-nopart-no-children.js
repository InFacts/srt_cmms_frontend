import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useFormikContext } from 'formik';

const PopupModalNoPart = (props) => {
    //* PopUp เลขที่อะไหล่ */
    const [data, setData] = useState([]);
    const [currentQueryString, setCurrentQueryString] = useState("");
    const [queryString, setQueryString] = useState("")
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        const filterDataOnCurrentQueryString = () => {
            // currentQueryString
            setData(props.items.filter(function (items) {
                // var removeSpaces = currentQueryString.replace(/\s/g, '');
                const regex = new RegExp(`${currentQueryString}`, 'i');
                var isMatch = regex.test(items.internal_item_id) || regex.test(items.description);
                return (isMatch);
            }));
            // setData corresponding to currentQueryString
        };
        filterDataOnCurrentQueryString();
    }, [currentQueryString, props.items]);

    return (
        <div className="modal" id="modalNoPart" style={{ display: "none" }}>
            <div className="gray-board">
                <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
                <div className="container_12 edit-padding">

                    <div className="container_12">
                        <div className="grid_2"><p className="cancel-default">ค้นหาอะไหล่</p></div>
                        <div className="grid_8 pull_0">
                            <input type="text" className="cancel-default grid_3" value={queryString} onChange={(e) => setQueryString(e.target.value)} />
                            <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => setCurrentQueryString(queryString)}>ค้นหา</button>
                        </div>
                    </div>

                    <div className="container_12">
                        <table className="table-many-column mt-3" style={{ height: "270px" }}>
                            <thead>
                                <tr>
                                    <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                                    <th className="font" style={{ minWidth: "450px" }}>รายละเอียด</th>
                                    <th className="font" style={{ minWidth: "150px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(function (no_part_show, index) {
                                    if (props.itemTypeID === no_part_show.item_type_id) {
                                    return (
                                        <tr key={index} id={index}>
                                            <td className="edit-padding" style={{ minWidth: "150px" }}> {no_part_show.internal_item_id} </td>
                                            <td className="edit-padding" style={{ maxWidth: "300px" }}> {no_part_show.description} </td>
                                            <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                                                <button type="button" className="button-blue" 
                                                onClick={() => setFieldValue("internal_item_id", no_part_show.internal_item_id, true)} 
                                                aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart" >เลือก</button>
                                            </td>
                                        </tr>
                                    )}
                                })}
                            </tbody>
                        </table>
                    </div>

                    <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    items: state.api.fact.items.items,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PopupModalNoPart);