import React from 'react';

import '../../../css/style.css'

class BottomContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileUploadState: "",
      file_show: [
      ],
      number: 0,
    }
    this.fileUploadButton = this.fileUploadButton.bind(this);

  }

  fileUploadButton = () => {
    document.getElementById('fileButton').click();
    document.getElementById('fileButton').onchange = () => {
      this.setState({ fileUploadState: document.getElementById('fileButton').value });
      this.setState({ number: this.state.number + 1 });

      var myArray = this.state.file_show;
      myArray.push(
        {
          "des": this.state.fileUploadState
        }
      )
      this.setState({ file_show: myArray });

    }
  }

  render() {
    return (
      <>
        <div id="อาการเสีย" class="tabcontent">
          <h4 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h4>
          <form class="p-form">
            <div class="row justify-content-md-center">

              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">เดินทางโดย:</label>
                </div>
                <div class="col-3 col-small-1 col-medium-2">
                  <select name="exampleSelect" id="exampleSelect" class="is-dense">
                    <option value="">Select an option</option>
                    <option value="1">Cosmic Cuttlefish</option>
                    <option value="2">Bionic Beaver</option>
                    <option value="3">Xenial Xerus</option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">ระบบตรวจซ่อม:</label>
                </div>
                <div class="col-3 col-small-1 col-medium-2">
                  <select name="exampleSelect" id="exampleSelect" class="is-dense">
                    <option value="">Select an option</option>
                    <option value="1">Cosmic Cuttlefish</option>
                    <option value="2">Bionic Beaver</option>
                    <option value="3">Xenial Xerus</option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">รายการที่ซ่อม:</label>
                </div>
                <div class="col-9 col-small-1 col-medium-2">
                  <input type="text" id="full-name-stacked" required="" />
                </div>
              </div>

              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม:</label>
                </div>
                <div class="col-9 col-small-1 col-medium-2">
                  <input type="text" id="full-name-stacked" required="" />
                </div>
              </div>


              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">ชื่ออุปกรณ์ที่ทำการบำรุงรักษา:</label>
                </div>
                <div class="col-9 col-small-1 col-medium-2">
                  <input type="text" id="full-name-stacked" required="" />
                </div>
              </div>


              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">สาเหตุและอาการเสียโดยสรุป:</label>
                </div>
                <div class="col-9 col-small-1 col-medium-2">
                  <input type="text" id="full-name-stacked" required="" />
                </div>
              </div>


              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">ขบวนรถที่:</label>
                </div>
                <div class="col-3 col-small-1 col-medium-2">
                  <input type="text" id="full-name-stacked" required="" />
                </div>
              </div>

              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">เสียเวลาเพราะเหตุนี้:</label>
                </div>
                <div class="col-3 col-small-1 col-medium-2">
                  <input type="text" id="full-name-stacked" required="" />
                </div>
              </div>


              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">สรุปการแก้ไขและการซ่อมแซม:</label>
                </div>
                <div class="col-9 col-small-1 col-medium-2">
                  <input type="text" id="full-name-stacked" required="" />
                </div>
              </div>


              <div class="row">
                <div class="col-3 col-small-2 col-medium-3">
                  <label for="input" class="p-form__label">ยังไม่ได้จัดการแก้ไขเพราะ:</label>
                </div>
                <div class="col-9 col-small-1 col-medium-2">
                  <input type="text" id="full-name-stacked" required="" />
                </div>
              </div>

            </div>
          </form>
        </div>

        <div id="ผู้ที่เกี่ยวข้อง" class="tabcontent">
          <div>
            <h4 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h4>
            <form class="p-form">
              <div class="row justify-content-md-center">
                <div class="row">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-2 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label">ผู้ควบคุมทดสอบชื่อ:</label>
                      </div>
                      <div class="col-4 col-small-1 col-medium-2">
                        <input type="text" id="full-name-stacked" required="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-1 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label">ตำแหน่ง:</label>
                      </div>
                      <div class="col-3 col-small-1 col-medium-2">
                        <select name="exampleSelect" id="exampleSelect" class="is-dense">
                          <option value="">Select an option</option>
                          <option value="1">Cosmic Cuttlefish</option>
                          <option value="2">Bionic Beaver</option>
                          <option value="3">Xenial Xerus</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-2 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label">ดำเนินการแก้ไข:</label>
                      </div>
                      <div class="col-4 col-small-1 col-medium-2">
                        <input type="text" id="full-name-stacked" required="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-1 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label"> </label>
                      </div>
                      <div class="col-3 col-small-1 col-medium-2">
                        <select name="exampleSelect" id="exampleSelect" class="is-dense">
                          <option value="">Select an option</option>
                          <option value="1">Cosmic Cuttlefish</option>
                          <option value="2">Bionic Beaver</option>
                          <option value="3">Xenial Xerus</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-2 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label">รายชื่อเพื่อนร่วมงาน:</label>
                      </div>
                      <div class="col-4 col-small-1 col-medium-2">
                        <input type="text" id="full-name-stacked" required="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-1 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label">ตำแหน่ง:</label>
                      </div>
                      <div class="col-3 col-small-1 col-medium-2">
                        <select name="exampleSelect" id="exampleSelect" class="is-dense">
                          <option value="">Select an option</option>
                          <option value="1">Cosmic Cuttlefish</option>
                          <option value="2">Bionic Beaver</option>
                          <option value="3">Xenial Xerus</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-2 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label">รายชื่อเพื่อนร่วมงาน:</label>
                      </div>
                      <div class="col-4 col-small-1 col-medium-2">
                        <input type="text" id="full-name-stacked" required="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-1 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label">ตำแหน่ง:</label>
                      </div>
                      <div class="col-3 col-small-1 col-medium-2">
                        <select name="exampleSelect" id="exampleSelect" class="is-dense">
                          <option value="">Select an option</option>
                          <option value="1">Cosmic Cuttlefish</option>
                          <option value="2">Bionic Beaver</option>
                          <option value="3">Xenial Xerus</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>



                <div class="row">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-2 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label">รายชื่อเพื่อนร่วมงาน:</label>
                      </div>
                      <div class="col-4 col-small-1 col-medium-2">
                        <input type="text" id="full-name-stacked" required="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-1 col-small-2 col-medium-3">
                        <label for="input" class="p-form__label">ตำแหน่ง:</label>
                      </div>
                      <div class="col-3 col-small-1 col-medium-2">
                        <select name="exampleSelect" id="exampleSelect" class="is-dense">
                          <option value="">Select an option</option>
                          <option value="1">Cosmic Cuttlefish</option>
                          <option value="2">Bionic Beaver</option>
                          <option value="3">Xenial Xerus</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div id="รายการค่าเสียหาย" class="tabcontent">
          <h4 className="head-title-bottom mt-2">ข้อมูลรายการค่าเสียหาย</h4>
          <table className="p-table-expanding mt-3 " role="grid">
            <thead className="blackground-gray-for-head-table">
              <tr role="row">
                <th id="t-name" aria-sort="none">#</th>
                <th id="t-users" aria-sort="none">รายการ</th>
                <th id="t-units" aria-sort="none">จำนวน</th>
                <th id="t-units" aria-sort="none">จำนวนเงิน</th>
                <th id="t-units" aria-sort="none">เลขที่อุปกรณ์</th>
                <th id="t-units" aria-sort="none">หมายเหตุ</th>
                <th className="u-hide">
                </th>
              </tr>
            </thead>
            <tbody className="blackground-white-for-table">
              <tr role="row">
                <td role="rowheader" aria-label="Name">1</td>
                <td role="gridcell" aria-label="Users">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control width-one border-none" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                  </div>

                </td>
                <td role="gridcell" aria-label="Units">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control width-one border-none" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                  </div>
                </td>
                <td role="gridcell" aria-label="Units">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control width-one border-none" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                  </div>
                </td>
                <td role="gridcell" aria-label="Units">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control width-one border-none" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                  </div>
                </td>
                <td role="gridcell" aria-label="Units">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control width-one border-none" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="แนบไฟล์" class="tabcontent">
          <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
          <div class="u-clearfix">
            <div class="u-float-left">
              <label for="input" class="p-form__label" ><span>ไฟล์เอกสาร {this.state.number} </span></label>
            </div>
            <div class=" u-float-right">
              <input id="fileButton" type="file" hidden />
              <label onClick={this.fileUploadButton} ><span>แนบไฟล์ +</span></label>
            </div>
          </div>
          <div class="dropZone" >

            <img  src="http://i.imgur.com/Hw1dyoP.png" alt="Generic placeholder thumbnail" height="100px" />
            <br></br>
                ไม่พบไฟล์เอกสาร
                <br></br>
                คลิกที่ "+" ในการแนบเอกสาร
                {this.state.file_show.map((file_show, index) => (
              <div class="ui item segment p-form">
                <div class="row">
                  <div class="col-3 col-small-1 col-medium-1">
                    <img alt='some value1' src="http://semantic-ui.com/images/wireframe/image.png" width="90" height="90" />
                  </div>
                  <div class="col-3 col-small-1 col-medium-1">
                    <h5 class="header">{file_show.des}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  };
}

export default BottomContent;
