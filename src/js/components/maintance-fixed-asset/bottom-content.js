import React from 'react';
import { connect } from 'react-redux'
import Document from '../../../images/document.svg'

import '../../../css/style.css'

class BottomContent extends React.Component {




  checkActionMode = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <div className="grid_12 mt-3">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">กลุ่มของการบำรุงรักษา </p>
            </div>
            <div className="grid_5">
              <input type="text" className="cancel-default" disabled="disabled" defaultValue={this.props.document_show.group_asset}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ชนิดของกรบำรุงรักษา  </p>
            </div>
            <div className="grid_5">
              <input type="text" className="cancel-default" disabled="disabled" defaultValue={this.props.document_show.type_asset}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">หน่วย </p>
            </div>
            <div className="grid_5">
              <input type="text" className="cancel-default" disabled="disabled" defaultValue={this.props.document_show.unit_asset}></input>
            </div>

          </div>

          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ความถี่การซ่อมบำรุง </p>
            </div>
            <div className="grid_2">
              <input type="text" className="cancel-default" disabled="disabled" defaultValue={this.props.document_show.freq_asset}></input>
            </div>
            <div className="grid_1  ">
              <p className="cancel-default">ครั้งต่อ </p>
            </div>
            <div className="grid_2">
              <input type="text" className="cancel-default" disabled="disabled" defaultValue={this.props.document_show.per_asset}></input>
            </div>
          </div>


          <div className="grid_12 mt-5 mb-1">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_10">
              <textarea className="edit" name="Text1" cols="40" rows="2" ></textarea>
            </div>
          </div>


          <div className="grid_12">
            <div className="p-search-box cancel-margin grid_3  float-right">
              <select className="edit-select-top" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.freq_asset === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">สถานะการดำเนินการ</p></div>
          </div>

          <div className="grid_12">
            <div className="p-search-box cancel-margin grid_3  float-right">
              <select className="edit-select-top" disabled="disabled">
                {current.props.list_status_asset1.map(function (list_status_asset1, index) {
                  if (current.props.document_show.per_asset === list_status_asset1.status) {
                    return <option defaultValue={list_status_asset1.id} key={index} selected> {list_status_asset1.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">สถานะสินทรัพย์</p></div>
          </div>

        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <div className="grid_12 mt-3">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">กลุ่มของการบำรุงรักษา </p>
            </div>
            <div className="grid_5">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show.group_asset} onChange={(e) => this.props.onChangeGroupAsset(e)}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ชนิดของกรบำรุงรักษา  </p>
            </div>
            <div className="grid_5">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show.type_asset} onChange={(e) => this.props.onChangeTypeAsset(e)}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">หน่วย </p>
            </div>
            <div className="grid_5">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show.unit_asset} onChange={(e) => this.props.onChangeUnitAsset(e)}></input>
            </div>

          </div>

          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ความถี่การซ่อมบำรุง </p>
            </div>
            <div className="grid_2">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show.freq_asset} onChange={(e) => this.props.onChangeFreqAsset(e)}></input>
            </div>
            <div className="grid_1  ">
              <p className="cancel-default">ครั้งต่อ </p>
            </div>
            <div className="grid_2">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show.per_asset} onChange={(e) => this.props.onChangePerAsset(e)}></input>
            </div>
          </div>


          <div className="grid_12 mt-5 mb-1">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_10">
              <textarea className="edit" name="Text1" cols="40" rows="2" ></textarea>
            </div>
          </div>


          <div className="grid_12">
            <div className="p-search-box cancel-margin grid_3  float-right">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeStatusAsset1(e)} >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.freq_asset === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
            </div>
            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">สถานะการดำเนินการ</p></div>
          </div>

          <div className="grid_12">
            <div className="p-search-box cancel-margin grid_3  float-right">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeStatusAsset2(e)}>
                {current.props.list_status_asset1.map(function (list_status_asset1, index) {
                  if (current.props.document_show.per_asset === list_status_asset1.status) {
                    return <option defaultValue={list_status_asset1.id} key={index} selected> {list_status_asset1.status} </option>
                  }
                  else {
                    return <option value={list_status_asset1.status} key={index}> {list_status_asset1.status} </option>
                  }
                })}
              </select>
            </div>
            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">สถานะสินทรัพย์</p></div>
          </div>

        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12 mt-3">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">กลุ่มของการบำรุงรักษา </p>
            </div>
            <div className="grid_5">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show_mode_add.group_asset} onChange={(e) => this.props.onChangeGroupAssetAdd(e)}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ชนิดของกรบำรุงรักษา  </p>
            </div>
            <div className="grid_5">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show_mode_add.type_asset} onChange={(e) => this.props.onChangeTypeAssetAdd(e)}></input>
            </div>
            <div className="grid_1 ml-0">
              <button class="p-button--neutral edit">...</button>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">หน่วย </p>
            </div>
            <div className="grid_5">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show_mode_add.unit_asset} onChange={(e) => this.props.onChangeUnitAssetAdd(e)}></input>
            </div>

          </div>

          <div className="grid_12">
            <div className="grid_2 cancel-default">
              <p className="cancel-default">ความถี่การซ่อมบำรุง </p>
            </div>
            <div className="grid_2">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show_mode_add.freq_asset} onChange={(e) => this.props.onChangeFreqAssetAdd(e)}></input>
            </div>
            <div className="grid_1  ">
              <p className="cancel-default">ครั้งต่อ </p>
            </div>
            <div className="grid_2">
              <input type="text" className="cancel-default" defaultValue={this.props.document_show_mode_add.per_asset} onChange={(e) => this.props.onChangePerAssetAdd(e)}></input>
            </div>
          </div>


          <div className="grid_12 mt-5 mb-1">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_10">
              <textarea className="edit" name="Text1" cols="40" rows="2" ></textarea>
            </div>
          </div>


          <div className="grid_12">
            <div className="p-search-box cancel-margin grid_3  float-right">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeStatusAsset1Add(e)} >
                {current.props.list_job.map(function (list_job, index) {

                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>

                })}
              </select>
            </div>
            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">สถานะการดำเนินการ</p></div>
          </div>

          <div className="grid_12">
            <div className="p-search-box cancel-margin grid_3  float-right">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeStatusAsset2Add(e)}>
                {current.props.list_status_asset1.map(function (list_status_asset1, index) {

                  return <option defaultValue={list_status_asset1.id} key={index} selected> {list_status_asset1.status} </option>

                })}
              </select>
            </div>
            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">สถานะสินทรัพย์</p></div>
          </div>

        </>
      )
    }
  }

  checkActionMode2 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้ควบคุมตรวจสอบชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name1}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job1 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ดำเนินการแก้ไขชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name2}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled" >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job2 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0" >
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name3}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job3 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name4}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job4 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name5}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled" >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job5 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name6}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job6 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

        </>

      )
    }
    if (mode === "edit") {
      return (
        <>
          <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้ควบคุมตรวจสอบชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name1} onChange={(e) => this.props.onChangeName1(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob1(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job1 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ดำเนินการแก้ไขชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name2} onChange={(e) => this.props.onChangeName2(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob2(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job2 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0" >
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name3} onChange={(e) => this.props.onChangeName3(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob3(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job3 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name4} onChange={(e) => this.props.onChangeName4(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob4(e)} >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job4 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name5} onChange={(e) => this.props.onChangeName5(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob5(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job5 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name6} onChange={(e) => this.props.onChangeName6(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob6(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job6 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
        </>)
    }
    if (mode === "add") {
      return (
        <>
          <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้ควบคุมตรวจสอบชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show_mode_add.name1} onChange={(e) => this.props.onChangeName1Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob1Add(e)}>
                {current.props.list_job.map(function (list_job, index) {

                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>

                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ดำเนินการแก้ไขชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name2} onChange={(e) => this.props.onChangeName2Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob2Add(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0" >
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name3} onChange={(e) => this.props.onChangeName3Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob3Add(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job3 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name4} onChange={(e) => this.props.onChangeName4Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob4Add(e)} >
                {current.props.list_job.map(function (list_job, index) {
                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name5} onChange={(e) => this.props.onChangeName5Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob5Add(e)}>
                {current.props.list_job.map(function (list_job, index) {

                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>

                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name6} onChange={(e) => this.props.onChangeName6Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob6Add(e)}>
                {current.props.list_job.map(function (list_job, index) {

                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>

                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
        </>)
    }
  }

  checkActionMode3 = (mode) => {
    const current = this;
    if (mode === "search") {

      return (
        <>
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>

              {this.props.list_show.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>{list_show.no_part}</td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table" disabled="disabled">
                        <option defaultValue="1">{list_show.unit}</option>
                      </select>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      {list_show.quility}
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}> {list_show.note}</td>
                  </tr>)
              })}
            </tbody>
          </table>

        </>

      )

    }
    if (mode === "edit") {
      return (
        <>
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>

              {this.props.list_show.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRow(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table" onChange={(e) => current.props.onChangeUnitEachRow(e)}>
                        {current.props.list_unit.map(function (list_unit, index) {
                          if (list_show.unit === list_unit.status) {
                            return <option defaultValue={list_unit.id} key={index} selected> {list_unit.status} </option>
                          }
                          else {
                            return null
                          }
                        })}
                      </select>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRow(e)}></input>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRow(e)}></input>
                    </td>
                  </tr>)
              })}
            </tbody>
          </table>


          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPart" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(e)}>ค้นหา</button>
                  </div>
                </div>
                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.props.no_part_show.map(function (no_part_show, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show.no_part} </td>
                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPart(e)} aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>
                </div>

              </div>
            </div>
          </div>

        </>

      )
    }
    if (mode === "add") {

      return (
        <>
        <div className="grid_12 mt-2">
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>

              {this.props.list_show_mode_add.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPartModeAdd" aria-controls="modalNoPartModeAdd" onChange={(e) => current.props.onClickNoPartEachRowModeAdd(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table" onChange={(e) => current.props.onChangeUnitEachRowAdd(e)}>
                        {current.props.list_unit.map(function (list_unit, index) {
                          if (list_show.unit === list_unit.status) {
                            return <option defaultValue={list_unit.id} key={index} selected> {list_unit.status} </option>
                          }
                          else {
                            return null
                          }
                        })}
                      </select>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRowAdd(e)}></input>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRowAdd(e)}></input>
                    </td>
                  </tr>)
              })}
            </tbody>
          </table>
          </div>

          
           {/* PopUp เลขที่อะไหล่ */}
           <div className="modal" id="modalNoPartModeAdd" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add} onChange={(e) => this.props.onChangeNoPartModeAdd(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartModeAdd(e)}>ค้นหา</button>
                  </div>
                </div>

                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show_mode_add.map(function (no_part_show_mode_add, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show_mode_add.no_part} </td>

                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartModeAdd(e)} aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart">กลับ</button>
                </div>
              </div>
            </div>
          </div>

        </>
      )

    }
  }

  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">
              <div id="ข้อมูลการทำวาระ" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode(this.props.actionMode)}
              </div>
              <div id="ระบุผู้ปฎิบัติงาน" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode2(this.props.actionMode)}
              </div>
              <div id="อุปกรณ์ที่ต้องนำไปปฎิบัติงาน" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode3(this.props.actionMode)}
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  };
}
const mapStateToProps = (state) => ({
  actionMode: state.action,
  document_show: state.document_show,
  list_show: state.list_show,

  list_unit: state.list_unit,

  list_no_part: state.list_no_part,
  no_part_show: state.no_part_show,
  no_part_show_mode_add: state.no_part_show_mode_add,
  list_show_mode_add: state.list_show_mode_add,

  list_job: state.list_job,
  list_status_asset1: state.list_status_asset1,

  document_show_mode_add: state.document_show_mode_add
})

const mapDispatchToProps = (dispatch) => ({

  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onChangeNoPartEachRow: (e) => dispatch(onChangeNoPartEachRow(e)),
  onClickNoPartEachRow: (e) => dispatch(onClickNoPartEachRow(e)),
  onClickSearchPopUpNoPart: (e) => dispatch(onClickSearchPopUpNoPart(e)),
  onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),

  onChangeQuilityEachRow: (e) => dispatch(onChangeQuilityEachRow(e)),
  onChangeNoteEachRow: (e) => dispatch(onChangeNoteEachRow(e)),
  onChangeUnitEachRow: (e) => dispatch(onChangeUnitEachRow(e)),

  onChangeQuilityEachRowAdd: (e) => dispatch(onChangeQuilityEachRowAdd(e)),
  onChangeNoteEachRowAdd: (e) => dispatch(onChangeNoteEachRowAdd(e)),
  onChangeUnitEachRowAdd: (e) => dispatch(onChangeUnitEachRowAdd(e)),


  onChangeNoPartEachRowModeAdd: (e) => dispatch(onChangeNoPartEachRowModeAdd(e)),
  onClickNoPartEachRowModeAdd: (e) => dispatch(onClickNoPartEachRowModeAdd(e)),
  onClickSearchPopUpNoPartModeAdd: (e) => dispatch(onClickSearchPopUpNoPartModeAdd(e)),
  onClickSelectPopUpNoPartModeAdd: (e) => dispatch(onClickSelectPopUpNoPartModeAdd(e)),
  onChangeNoPartModeAdd: (e) => dispatch(onChangeNoPartModeAdd(e)),

  onChangeName1: (e) => dispatch(onChangeName1(e)),
  onChangeName1Add: (e) => dispatch(onChangeName1Add(e)),
  onChangeJob1: (e) => dispatch(onChangeJob1(e)),
  onChangeJob1Add: (e) => dispatch(onChangeJob1Add(e)),
  onChangeName2: (e) => dispatch(onChangeName2(e)),
  onChangeName2Add: (e) => dispatch(onChangeName2Add(e)),
  onChangeJob2: (e) => dispatch(onChangeJob2(e)),
  onChangeJob2Add: (e) => dispatch(onChangeJob2Add(e)),
  onChangeName3: (e) => dispatch(onChangeName3(e)),
  onChangeName3Add: (e) => dispatch(onChangeName3Add(e)),
  onChangeJob3: (e) => dispatch(onChangeJob3(e)),
  onChangeJob3Add: (e) => dispatch(onChangeJob3Add(e)),
  onChangeName4: (e) => dispatch(onChangeName4(e)),
  onChangeName4Add: (e) => dispatch(onChangeName4Add(e)),
  onChangeJob5: (e) => dispatch(onChangeJob5(e)),
  onChangeJob5Add: (e) => dispatch(onChangeJob5Add(e)),
  onChangeName6: (e) => dispatch(onChangeName6(e)),
  onChangeName6Add: (e) => dispatch(onChangeName6Add(e)),
  onChangeJob6: (e) => dispatch(onChangeJob6(e)),
  onChangeJob6Add: (e) => dispatch(onChangeJob6Add(e)),



  onChangeStatusAsset1: (e) => dispatch(onChangeStatusAsset1(e)),
  onChangeStatusAsset1Add: (e) => dispatch(onChangeStatusAsset1Add(e)),
  onChangeStatusAsset2: (e) => dispatch(onChangeStatusAsset2(e)),
  onChangeStatusAsset2Add: (e) => dispatch(onChangeStatusAsset2Add(e)),
  onChangePerAsset: (e) => dispatch(onChangePerAsset(e)),
  onChangePerAssetAdd: (e) => dispatch(onChangePerAssetAdd(e)),
  onChangeFreqAsset: (e) => dispatch(onChangeFreqAsset(e)),
  onChangeFreqAssetAdd: (e) => dispatch(onChangeFreqAssetAdd(e)),
  onChangeUnitAsset: (e) => dispatch(onChangeUnitAsset(e)),
  onChangeUnitAssetAdd: (e) => dispatch(onChangeUnitAssetAdd(e)),
  onChangeTypeAsset: (e) => dispatch(onChangeTypeAsset(e)),
  onChangeTypeAssetAdd: (e) => dispatch(onChangeTypeAssetAdd(e)),
  onChangeGroupAsset: (e) => dispatch(onChangeGroupAsset(e)),
  onChangeGroupAssetAdd: (e) => dispatch(onChangeGroupAssetAdd(e)),

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);




export const onChangeQuilityEachRow = (e) => {
  
  return {
    type: "ON CHANGE QUILITY EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoteEachRow = (e) => {
  return {
    type: "ON CHANGE NOTE EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeUnitEachRow = (e) => {
  return {
    type: "ON CHANGE UNIT EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}


export const onChangeQuilityEachRowAdd = (e) => {
  
  return {
    type: "ON CHANGE QUILITY EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoteEachRowAdd = (e) => {
  return {
    type: "ON CHANGE NOTE EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeUnitEachRowAdd = (e) => {
  return {
    type: "ON CHANGE UNIT EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}


export const onClickSearchPopUpNoPart = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART",
  }
}
export const onChangeNoPart = (e) => {
  return {
    type: "ON CHANGE NO PART",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPart = (e) => {

  return {
    type: "ON CLICK SELECT POPUP NO PART",
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoPartEachRow = (e) => {

  return {
    type: "ON CHANGE NO PART EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartEachRow = (e) => {

  return {
    type: "ON CLICK NO PART EACH ROW",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}




export const onChangeNoPartEachRowModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode.parentNode.id)
  return {
    type: "ON CHANGE NO PART EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartEachRowModeAdd = (e) => {
  // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  console.log(e.target.parentNode.parentNode.parentNode.parentNode.id)
  return {
    type: "ON CLICK NO PART EACH ROW MODE ADD",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}
export const onClickSearchPopUpNoPartModeAdd = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART ADD MODE",
  }
}
export const onChangeNoPartModeAdd = (e) => {
  return {
    type: "ON CHANGE NO PART MODE ADD",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode.id)
  return {
    type: "ON CLICK SELECT POPUP NO PART MODE ADD",
    rowIndex: e.target.parentNode.parentNode.id
  }
}




export const onChangeName1 = (e) => {
  return {
    type: "CHANGE NAME1",
    value: e.target.value
  }
}
export const onChangeName1Add = (e) => {
  return {
    type: "CHANGE NAME1 ADD",
    value: e.target.value
  }
}

export const onChangeName2 = (e) => {
  return {
    type: "CHANGE NAME2",
    value: e.target.value
  }
}
export const onChangeName2Add = (e) => {
  return {
    type: "CHANGE NAME2 ADD",
    value: e.target.value
  }
}

export const onChangeName3 = (e) => {
  return {
    type: "CHANGE NAME3",
    value: e.target.value
  }
}
export const onChangeName3Add = (e) => {
  return {
    type: "CHANGE NAME3 ADD",
    value: e.target.value
  }
}

export const onChangeName4 = (e) => {
  return {
    type: "CHANGE NAME4",
    value: e.target.value
  }
}
export const onChangeName4Add = (e) => {
  return {
    type: "CHANGE NAME4 ADD",
    value: e.target.value
  }
}

export const onChangeName5 = (e) => {
  return {
    type: "CHANGE NAME5",
    value: e.target.value
  }
}
export const onChangeName5Add = (e) => {
  return {
    type: "CHANGE NAME5 ADD",
    value: e.target.value
  }
}

export const onChangeName6 = (e) => {
  return {
    type: "CHANGE NAME6",
    value: e.target.value
  }
}
export const onChangeName6Add = (e) => {
  return {
    type: "CHANGE NAME6 ADD",
    value: e.target.value
  }
}


export const onChangeJob1 = (e) => {
  return {
    type: "CHANGE JOB1",
    value: e.target.value
  }
}
export const onChangeJob1Add = (e) => {
  return {
    type: "CHANGE JOB1 ADD",
    value: e.target.value
  }
}

export const onChangeJob2 = (e) => {
  return {
    type: "CHANGE JOB2",
    value: e.target.value
  }
}
export const onChangeJob2Add = (e) => {
  return {
    type: "CHANGE JOB2 ADD",
    value: e.target.value
  }
}

export const onChangeJob3 = (e) => {
  return {
    type: "CHANGE JOB3",
    value: e.target.value
  }
}
export const onChangeJob3Add = (e) => {
  return {
    type: "CHANGE JOB3 ADD",
    value: e.target.value
  }
}

export const onChangeJob4 = (e) => {
  return {
    type: "CHANGE JOB4",
    value: e.target.value
  }
}
export const onChangeJob4Add = (e) => {
  return {
    type: "CHANGE JOB4 ADD",
    value: e.target.value
  }
}

export const onChangeJob5 = (e) => {
  return {
    type: "CHANGE JOB5",
    value: e.target.value
  }
}
export const onChangeJob5Add = (e) => {
  return {
    type: "CHANGE JOB5 ADD",
    value: e.target.value
  }
}

export const onChangeJob6 = (e) => {
  return {
    type: "CHANGE JOB6",
    value: e.target.value
  }
}
export const onChangeJob6Add = (e) => {
  return {
    type: "CHANGE JOB6 ADD",
    value: e.target.value
  }
}


export const onChangeGroupAsset = (e) => {
  return {
    type: "CHANGE GROUP ASSET",
    value: e.target.value
  }
}
export const onChangeGroupAssetAdd = (e) => {
  return {
    type: "CHANGE GROUP ASSET ADD",
    value: e.target.value
  }
}

export const onChangeStatusAsset2 = (e) => {
  return {
    type: "CHANGE STATUS ASSET2",
    value: e.target.value
  }
}
export const onChangeStatusAsset2Add = (e) => {
  return {
    type: "CHANGE STATUS ASSET2 ADD",
    value: e.target.value
  }
}

export const onChangeStatusAsset1 = (e) => {
  return {
    type: "CHANGE STATUS ASSET1",
    value: e.target.value
  }
}
export const onChangeStatusAsset1Add = (e) => {
  return {
    type: "CHANGE STATUS ASSET1 ADD",
    value: e.target.value
  }
}

export const onChangePerAsset = (e) => {
  return {
    type: "CHANGE PER ASSET",
    value: e.target.value
  }
}
export const onChangePerAssetAdd = (e) => {
  return {
    type: "CHANGE PER ASSET ADD",
    value: e.target.value
  }
}

export const onChangeTypeAsset = (e) => {
  return {
    type: "CHANGE TYPE ASSET",
    value: e.target.value
  }
}
export const onChangeTypeAssetAdd = (e) => {
  return {
    type: "CHANGE TYPE ASSET ADD",
    value: e.target.value
  }
}

export const onChangeUnitAsset = (e) => {
  return {
    type: "CHANGE UNIT ASSET",
    value: e.target.value
  }
}
export const onChangeUnitAssetAdd = (e) => {
  return {
    type: "CHANGE UNIT ASSET ADD",
    value: e.target.value
  }
}

export const onChangeFreqAsset = (e) => {
  return {
    type: "CHANGE FREQ ASSET",
    value: e.target.value
  }
}
export const onChangeFreqAssetAdd = (e) => {
  return {
    type: "CHANGE FREQ ASSET ADD",
    value: e.target.value
  }
}