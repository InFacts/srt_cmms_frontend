import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useFormikContext } from 'formik';
import { changeTheam } from '../../helper.js';

import '../../../css/table.css';

const BottomContent = (props) => {

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    let headTable = [];
    let checkListNameUnique = [];
    let workOrderPmParent = [];
    values.line_items.map((first_list) => {
      headTable.push({ node_th: first_list.node_th });
      first_list.selector_checklist.map((secondary_list) => {
        let checkUnique = checkListNameUnique.find(checkListNameUnique => `${checkListNameUnique.checklist_name}` === `${secondary_list.checklist_name}`)
        // console.log("checkUnique", checkUnique)
        if (checkUnique) {
          console.log("Dulplicate")
        } else {
          checkListNameUnique.push({
            checklist_name: secondary_list.checklist_name,
            group_checklist: []
          })
        }
      })
      // console.log("checkListNameUnique", checkListNameUnique)
      let workOrderPmChild = [];
      first_list.work_order_pm[0].checklist.map((thrice) => {
        workOrderPmChild.push(thrice)
      })
      workOrderPmParent.push(workOrderPmChild)
      console.log("workOrderPmParent", workOrderPmParent)
    })

    checkListNameUnique.map((four, indexCheckListNameUnique) => {
      workOrderPmParent.map((parent, indexParent) => {
        // console.log("parent", parent)
        parent.map((child, indexChild) => {
          // console.log("child", child)
          if (child.checklist_name === four.checklist_name) {
            checkListNameUnique[indexCheckListNameUnique][indexParent] = child
            // console.log("checkListNameUnique[indexCheckListNameUnique][indexParent]", checkListNameUnique[indexCheckListNameUnique][indexParent])
          } else {
            // checkListNameUnique[indexCheckListNameUnique][indexParent] = { checklist_count: 0, completed_count: 0 }
          }
        })
      })
    })

    console.log("checkListNameUnique", checkListNameUnique)

    setFieldValue("head_table", headTable, false);
    setFieldValue("checklist_name_unique", checkListNameUnique, false);
    setFieldValue("work_order_pm", workOrderPmParent, false);
  }, [values.line_items])

  const ListChecklist = (props) => {
    var codeBlock
    for (let number = 0; number < props.numNode; number++) {
      codeBlock = <>{codeBlock} <td className="edit-padding text-center">{props.checklist_name[number] ? props.checklist_name[number].checklist_count : 0}</td>
      <td className="edit-padding text-center">{props.checklist_name[number] ? props.checklist_name[number].completed_count : 0}</td></>
    }
    return codeBlock;
  }
  return (
    <div id={changeTheam() === true ? "" : "blackground-gray"}>
      <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

        <div className="grid_12 ">
          <table className="table-many-column mt-1" style={{ padding: "10px" }}>
            <thead>
              <tr>
                <th className="font text-center" rowspan="3" style={{ minWidth: "30px", verticalAlign: 'middle' }}>ลำดับ</th>
                <th className="font text-center" rowspan="3" style={{ minWidth: "300px", verticalAlign: 'middle' }}>รายละเอียด</th>
                <th className="font text-center" rowspan="3" style={{ minWidth: "80px", verticalAlign: 'middle' }}>หน่วย</th>

                <th className="font text-center" colSpan={values.line_items.length * 2}>การดำเนินการ</th>
                <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>สรุปรวม</th>

                <th className="font text-center" rowspan="3" style={{ minWidth: "300px", verticalAlign: 'middle' }}>หมายเหตุ</th>

              </tr>
              <tr>
                {values.head_table.map(({ node_th }) => (
                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>{node_th}</th>
                ))}

                <th className="font text-center" colSpan="2" style={{ minWidth: "80px", verticalAlign: 'middle' }}>แขวง</th>
              </tr>
              <tr>
                {values.line_items.map((node) => (
                  <>
                    <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>
                  </>
                ))}
                <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>
              </tr>
            </thead>
            <tbody>
              {values.checklist_name_unique.map((checklist_name, index) => {
                // console.log("checklist_name", checklist_name)

                return (
                  <tr>
                    <th className="edit-padding text-center">{index + 1}</th>
                    <td className="edit-padding">{checklist_name.checklist_name}</td>
                    <td className="edit-padding text-center">สถานี</td>

                    {/* <td className="edit-padding text-center">{checklist_name[0] ? checklist_name[0].checklist_count : 0}</td>
                    <td className="edit-padding text-center">{checklist_name[0] ? checklist_name[0].completed_count : 0}</td> */}
                    <ListChecklist checklist_name={checklist_name} numNode={values.line_items.length}/>

                    <td className="edit-padding text-center">49</td>
                    <td className="edit-padding text-center">49</td>

                    <td className="edit-padding text-center"></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
};

const mapStateToProps = (state) => ({
  fact: state.api.fact,
  actionMode: state.toolbar.mode,

  list_show: state.list_show
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);