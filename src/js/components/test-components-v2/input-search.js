import React from 'react';
import '../../../css/style.css'
import '../../../css/grid12.css';
import { connect } from 'react-redux'

class PopUpType1 extends React.Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
    }

    handleData=(data)=> {
        var title = {
            Topic :"Topic",
            Text : "Test",
        };
        var { callback } = this.props;
        callback(title);
    }

    render() {
        
        return (
            <div className="modal" id="เลขที่เอกสาร" style={{ display: "none" }}>
                <div className="gray-board">
                    <p className="head-title-modal edit">ค้นหาเอกสารอ้างอิง / ใบสั่งงาน</p>
                    <div className="container_12 edit-padding">

                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                            <div className="grid_8 pull_0">
                                <input type="text" className="cancel-default grid_3" />
                            </div>
                        </div>

                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">สถานที่ แขวง:</p></div>
                            <div className="grid_8 pull_0">
                                <select className="edit-select-top grid_3 " >
                                    <option defaultValue="0"></option>
                                    <option defaultValue="1">Cosmic Cuttlefish</option>
                                    <option defaultValue="2">Bionic Beaver</option>
                                    <option defaultValue="3">Xenial Xerus</option>
                                </select>
                                <select className="edit-select-top grid_3 float-right" >
                                    <option defaultValue="0"></option>
                                    <option defaultValue="1">Cosmic Cuttlefish</option>
                                    <option defaultValue="2">Bionic Beaver</option>
                                    <option defaultValue="3">Xenial Xerus</option>
                                </select>
                                <p className="cancel-default grid_2 float-right">สถานที่ ตอน:</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">วันที่เริ่มต้น:</p></div>
                            <div className="grid_8 pull_0">
                                <input type="date" className="cancel-default grid_3 "></input>
                                <input type="date" className="cancel-default grid_3 float-right"></input>
                                <p className="cancel-default grid_2 float-right">วันที่สิ้นสุด:</p>
                            </div>
                            <button className="button-blue edit grid_1 float-right mr-5" type="button">ค้นหา</button>
                        </div>



                        <div className="grid_12">
                            <button onClick={this.handleData} className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="เลขที่เอกสาร" id="aria-controls">กลับ</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}




class InputSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
        }
    }
    
    render() {
        const { iconType, modalType } = this.props;
        var icon;
        if (iconType) {
            if (iconType === "search") {
                icon = "p-icon--external-link";
            }
        }else{
            icon = "p-icon--external-link";
        }
        return (
            <div>
                <div className="grid_2"><p className="top-text">{modalType}</p></div>
                <div className="p-search-box cancel-margin grid_3  pull_0">
                    <input type="search" className="p-search-box__input cancel-default " value={this.state.title} />
                    <button className="p-search-box__button cancel-padding" ><i className={icon} id="showModal" aria-controls={modalType}></i></button>
                </div>
                <PopUpType1 callback={(title) =>{
                    this.setState({
                        title: title.Topic,
                    });
                    this.props.handleData(title.Text);
                }}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    data: state.data,
})
const mapDispatchToProps = (dispatch) => ({
    handleData: (value) => dispatch(data(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(InputSearch);
export const data = (value) => {
    return {
        type: "DATA",
        value: value
    }
}
