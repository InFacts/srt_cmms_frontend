import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { connect } from 'react-redux'
import { FACTS, fetchFact } from '../../redux/modules/api/fact.js'
import { identifyEndpoinsHelper } from '../../helper';
const formatDate = (dateISOString) => {
  let date = new Date(dateISOString);
  // year = date.getFullYear();
  // month = date.getMonth()+1;
  // dt = date.getDate();
  return date.toLocaleDateString('th-TH');
}

const BottomContent = (props) => {
  const listUsers = useSelector((state) => ({ ...state.api.fact.users.items }));
  const listDocumentStatus = useSelector((state) => ({ ...state.api.fact['document-status'].items }));
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const factUsers = useSelector((state) => ({ ...state.api.fact.users }), shallowEqual);
  const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);

  const [valueDivisionID, setValueDivisionID] = useState([]);
  const [valueDistrictID, setValueDistrictID] = useState('');
  const [valueNodeID, setValueNodeID] = useState('');
  const [valueNodeIDWorkOrderPM, setValueNodeIDWorkOrderPM] = useState([]);
  const [valueNodeIDFormDistrictWorkOrderPM, setValueNodeIDFormDistrictWorkOrderPM] = useState([]);

  const identifyEndpoins = (document_type_id) => identifyEndpoinsHelper(document_type_id)

  useEffect(() => {
    let users = factUsers.items;
    let user = users.find(user => `${user.user_id}` === `${decoded_token.id}`);
    if (user) {
      let nodes = factNodes.items;
      let districts = factDistricts.items;
      if (!user.position[0].district_id && !user.position[0].division_id) { //สำหรับ User ที่เป็น node
        let node = nodes.find(node => `${node.node_id}` === `${user.position[0].node_id}`);
        // console.log("node", node)
        if (node) {
          setValueNodeID(user.position[0].node_id)
        }
      } else if (!user.position[0].node_id && !user.position[0].division_id) { //สำหรับ User ที่เป็น district
        let list_nodes = [];
        nodes.map((node) => {
          if (`${node.district_id}` === `${user.position[0].district_id}`) {
            list_nodes.push(node)
          }
        })
        setValueNodeIDWorkOrderPM(list_nodes)
        setValueDistrictID(user.position[0].district_id)
      } else if (!user.position[0].node_id && !user.position[0].district_id) { //สำหรับ User ที่เป็น division
        let list_district = [];
        let list_nodes = [];
        districts.map((district) => {
          if (`${district.division_id}` === `${user.position[0].division_id}`) {
            list_district.push(district)
          }
          nodes.map((node) => {
            if (`${district.division_id}` === `${user.position[0].division_id}`) {
              if (`${node.district_id}` === `${district.district_id}`) {
                list_nodes.push(node)
              }
            }
          })
        })
        setValueDivisionID(list_district)
        setValueNodeIDFormDistrictWorkOrderPM(list_nodes)
      }
    }
  }, [decoded_token.id, factUsers.items, factUsers.items, factDistricts.items, factNodes.items])

  return (
    <>
      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="container_12 ">
            <div className="container_12">
              <table className="table-many-column mt-3" style={{ height: "380px" }}>
                <thead>
                  <tr>
                    {/* <th className="font" style={{ minWidth: "150px" }}>TEST</th> */}
                    <th className="font" style={{ minWidth: "150px" }}>วันเวลาสร้าง</th>
                    <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                    <th className="font" style={{ minWidth: "350px" }}>ประเภทเอกสาร</th>
                    {/* <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th> */}
                    <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                    <th className="font" style={{ minWidth: "150px" }}>สถานะ</th>
                    {/* <th className="font" style={{ minWidth: "150px" }}>รายละเอียด</th> */}
                  </tr>
                </thead>
                <tbody>
                  {props.track_document_show.map(function (track_document_show, index) {
                    if (Object.keys(listUsers).length !== 0 && listUsers !== undefined && Object.keys(listDocumentStatus).length !== 0 && listDocumentStatus !== undefined) {

                      // <<<<<<======= DOCUMENT SPARE ===========>>>>>>>>>
                      if (track_document_show.dest_warehouse_id && track_document_show.src_warehouse_id || track_document_show.physical_count_warehouse_id
                        || track_document_show.inventory_adjustment_warehouse_id) {
                        // <<<<<<======= DOCUMENT SPARE ===========>>>>>>>>>
                        let findWarehouse = decoded_token.has_position ?
                          decoded_token.has_position[0].warehouse_id ?
                            decoded_token.has_position[0].warehouse_id :
                            "no_warehouse" : null;

                        if (findWarehouse === track_document_show.dest_warehouse_id || findWarehouse === track_document_show.src_warehouse_id) {
                          return (
                            <tr key={index} id={index}>
                              {/* <td className="edit-padding" style={{ paddingLeft: "5px" }}>{track_document_show.document_id}</td> */}
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              {/* <td className="edit-padding" >{track_document_show.internal_document_id}</td> */}
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              {/* <td className="edit-padding" style={{  }}>{track_document_show.job_document}</td> */}
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                              {/* <td className="edit-padding">
                            <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>รายละเอียด</Link>
                          </td> */}
                            </tr>
                          )
                        } else if (findWarehouse === "no_warehouse") {
                          return (
                            <tr key={index} id={index}>
                              {/* <td className="edit-padding" style={{ paddingLeft: "5px" }}>{track_document_show.document_id}</td> */}
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              {/* <td className="edit-padding" >{track_document_show.internal_document_id}</td> */}
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              {/* <td className="edit-padding" style={{  }}>{track_document_show.job_document}</td> */}
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                              {/* <td className="edit-padding">
                            <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>รายละเอียด</Link>
                          </td> */}
                            </tr>
                          )
                        } else if (findWarehouse === track_document_show.physical_count_warehouse_id || findWarehouse === track_document_show.inventory_adjustment_warehouse_id) {
                          return (
                            <tr key={index} id={index}>
                              {/* <td className="edit-padding" style={{ paddingLeft: "5px" }}>{track_document_show.document_id}</td> */}
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              {/* <td className="edit-padding" >{track_document_show.internal_document_id}</td> */}
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              {/* <td className="edit-padding" style={{  }}>{track_document_show.job_document}</td> */}
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                              {/* <td className="edit-padding">
                            <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>รายละเอียด</Link>
                          </td> */}
                            </tr>
                          )
                        }
                      } else {  // <<<<<<======= DOCUMENT PMT ===========>>>>>>>>>
                        if (valueNodeID ? valueNodeID === track_document_show.work_order_node_id : valueDistrictID === track_document_show.work_order_district_id) {
                          // console.log("work_order")
                          return (
                            <tr key={index} id={index}>
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                            </tr>
                          )
                        } else if (valueNodeID ? valueNodeID === track_document_show.ss101_node_id : valueDistrictID === track_document_show.ss101_district_id) {
                          // console.log("ss101")
                          return (
                            <tr key={index} id={index}>
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                            </tr>
                          )
                        } else if (valueNodeID ? valueNodeID === track_document_show.equipment_installation_node_id : valueDistrictID === track_document_show.equipment_installation_district_id) {
                          // console.log("equipment_installation")
                          return (
                            <tr key={index} id={index}>
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                            </tr>
                          )
                        } else if (valueNodeID ? valueNodeID === track_document_show.selector_pm_plan_node_id : valueDistrictID === track_document_show.selector_pm_plan_district_id) {
                          // console.log("selector_pm_plan")
                          return (
                            <tr key={index} id={index}>
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                            </tr>
                          )
                        } else if (valueNodeID === track_document_show.node_id) {
                          // console.log("work_order_pmt")
                          return (
                            <tr key={index} id={index}>
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                            </tr>
                          )
                        } else if (track_document_show.document_type_id === 2011 || track_document_show.document_type_id === 2071) {
                          // Work Request // Maintenant Item ต้องเห็นทุกเอกสาร 
                          return (
                            <tr key={index} id={index}>
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                            </tr>
                          )
                        } else if (valueNodeIDWorkOrderPM.length !== 0 && document.node_id) {
                          return (
                            <tr key={index} id={index}>
                              <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                              </td>
                              <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                  Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                              }</td>
                              <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                            </tr>
                          )
                        } else if (valueDivisionID.length !== 0) {
                          let work_order_division = valueDivisionID.find(division => `${division.district_id}` === `${track_document_show.work_order_district_id}`);
                          let ss101_division = valueDivisionID.find(division => `${division.district_id}` === `${track_document_show.ss101_district_id}`);
                          let equipment_installation_division = valueDivisionID.find(division => `${division.district_id}` === `${track_document_show.equipment_installation_district_id}`);
                          let selector_pm_plan_division = valueDivisionID.find(division => `${division.district_id}` === `${track_document_show.selector_pm_plan_district_id}`);
                          if (track_document_show.work_order_node_id && work_order_division) {
                            // console.log("DIVISION")
                            return (
                              <tr key={index} id={index}>
                                <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                  <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                                </td>
                                <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                  track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                    Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                                }</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                              </tr>
                            )
                          } else if (track_document_show.ss101_node_id && ss101_division) {
                            // console.log("DIVISION")
                            return (
                              <tr key={index} id={index}>
                                <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                  <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                                </td>
                                <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                  track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                    Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                                }</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                              </tr>
                            )
                          } else if (track_document_show.equipment_installation_district_id && equipment_installation_division) {
                            // console.log("DIVISION")
                            return (
                              <tr key={index} id={index}>
                                <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                  <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                                </td>
                                <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                  track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                    Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                                }</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                              </tr>
                            )
                          } else if (track_document_show.selector_pm_plan_district_id && selector_pm_plan_division) {
                            // console.log("DIVISION")
                            return (
                              <tr key={index} id={index}>
                                <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                  <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                                </td>
                                <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                  track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                    Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                                }</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                              </tr>
                            )
                          } else if (track_document_show.selector_pm_plan_district_id && selector_pm_plan_division) {
                            // console.log("DIVISION")
                            return (
                              <tr key={index} id={index}>
                                <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                  <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                                </td>
                                <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                  track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                    Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                                }</td>
                                <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                              </tr>
                            )
                          } else if (valueNodeIDFormDistrictWorkOrderPM.length !== 0 && track_document_show.node_id) {
                            let node = valueNodeIDFormDistrictWorkOrderPM.find(node => `${node.node_id}` === `${track_document_show.node_id}`);
                            if (node) {
                              return (
                                <tr key={index} id={index}>
                                  <td className="edit-padding" style={{ paddingLeft: "5px", maxWidth: "150px" }}>{formatDate(track_document_show.created_on)}</td>
                                  <td className="edit-padding" style={{ maxWidth: "150px" }}>
                                    <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                                  </td>
                                  <td className="edit-padding" style={{ maxWidth: "350px" }}>{track_document_show.document_type_name} </td>
                                  <td className="edit-padding" style={{ maxWidth: "150px" }}>{
                                    track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                                      Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                                  }</td>
                                  <td className="edit-padding" style={{ maxWidth: "150px" }}>{track_document_show.document_status_en}</td>
                                </tr>
                              )
                            }
                          }
                        }
                      }
                    }
                  })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  track_document_show: state.track_doc.track_document_show,

  //fact
  FACT_USERS: state.api.fact[FACTS.USERS].items,
  FACT_DOCUMENT_STATUS: state.api.fact[FACTS.DOCUMENT_STATUS].items,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);