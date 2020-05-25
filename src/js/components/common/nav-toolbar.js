import React from 'react';

import { connect } from 'react-redux'

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import { Link } from 'react-router-dom';
import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'

import AddDocument from '../../../images/toolbar/add-document.svg'
import CopyDocument from '../../../images/toolbar/copy-document.svg'
import EditDocument from '../../../images/toolbar/edit.svg'
import SaveDocument from '../../../images/toolbar/save.svg'
import RetryDocument from '../../../images/toolbar/retry.svg'
import BackDocument from '../../../images/toolbar/back.svg'
import ForwardDocument from '../../../images/toolbar/forward.svg'
import PdfDocument from '../../../images/toolbar/pdf.svg'
import HomeDocument from '../../../images/toolbar/home.svg'
import SearchDocument from '../../../images/toolbar/search.svg'


class ToolbarItem extends React.Component {

    render() {
        var { id, alt, src, pointer, select, disable, callback } = this.props;
        return (

            (select === id)
                ?
                <li className="nav-li" ><Link className="toolbar" style={{ pointerEvents: pointer }}><div className="selecting"><img alt={alt} src={src} className="img-toolbar" /></div></Link></li>
                :
                ((disable === true)
                    ?
                    <li className="nav-li"  ><Link className="toolbar" style={{ pointerEvents: pointer }}><img alt={alt} src={src} onClick={() => { callback(id) }} className="img-toolbar filter-green" /></Link></li>
                    :
                    <li className="nav-li"  ><Link className="toolbar" style={{ pointerEvents: pointer }}><img alt={alt} src={src} onClick={() => { callback(id) }} className="img-toolbar" /></Link></li>
                )

        );
    }
}

class Toolbar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: 2,
        }
        this.props.handleAction("search");
    }

    render() {
        var items, menu;

        if (this.props.tool_mode === true) {

            if (this.props.actionMode === "search" && this.props.fill_data === true || this.props.actionMode === "edit") {
                menu = [
                    {
                        id: 1,
                        alt: "home",
                        src: HomeDocument,
                        pointer: "auto",
                        disable: false
                    },
                    {
                        id: 2,
                        alt: "search",
                        src: SearchDocument,
                        pointer: "auto",
                        disable: false
                    },
                    // {
                    //     id: 3,
                    //     alt: "edit",
                    //     src: EditDocument,
                    //     pointer: "auto",
                    //     disable: false
                    // },
                    {
                        id: 4,
                        alt: "add",
                        src: AddDocument,
                        pointer: "auto",
                        disable: false
                    },
                    {
                        id: 5,
                        alt: "copy",
                        src: CopyDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 6,
                        alt: "save",
                        src: SaveDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 7,
                        alt: "retry",
                        src: RetryDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 8,
                        alt: "back",
                        src: BackDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 9,
                        alt: "forward",
                        src: ForwardDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 10,
                        alt: "pdf",
                        src: PdfDocument,
                        pointer: "none",
                        disable: true
                    },
                ]
            }
            if (this.props.actionMode === "search" && this.props.fill_data === false) {
                menu = [
                    {
                        id: 1,
                        alt: "home",
                        src: HomeDocument,
                        pointer: "auto",
                        disable: false
                    },
                    {
                        id: 2,
                        alt: "search",
                        src: SearchDocument,
                        pointer: "auto",
                        disable: false
                    },
                    // {
                    //     id: 3,
                    //     alt: "edit",
                    //     src: EditDocument,
                    //     pointer: "none",
                    //     disable: true
                    // },
                    {
                        id: 4,
                        alt: "add",
                        src: AddDocument,
                        pointer: "auto",
                        disable: false
                    },
                    {
                        id: 5,
                        alt: "copy",
                        src: CopyDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 6,
                        alt: "save",
                        src: SaveDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 7,
                        alt: "retry",
                        src: RetryDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 8,
                        alt: "back",
                        src: BackDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 9,
                        alt: "forward",
                        src: ForwardDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 10,
                        alt: "pdf",
                        src: PdfDocument,
                        pointer: "none",
                        disable: true
                    },
                ]
            }
            if (this.props.actionMode === "add" || this.props.actionMode === "home") {
                menu = [
                    {
                        id: 1,
                        alt: "home",
                        src: HomeDocument,
                        pointer: "auto",
                        disable: false
                    },
                    {
                        id: 2,
                        alt: "search",
                        src: SearchDocument,
                        pointer: "auto",
                        disable: false
                    },
                    // {
                    //     id: 3,
                    //     alt: "edit",
                    //     src: EditDocument,
                    //     pointer: "none",
                    //     disable: true
                    // },
                    {
                        id: 4,
                        alt: "add",
                        src: AddDocument,
                        pointer: "auto",
                        disable: false
                    },
                    {
                        id: 5,
                        alt: "copy",
                        src: CopyDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 6,
                        alt: "save",
                        src: SaveDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 7,
                        alt: "retry",
                        src: RetryDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 8,
                        alt: "back",
                        src: BackDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 9,
                        alt: "forward",
                        src: ForwardDocument,
                        pointer: "none",
                        disable: true
                    },
                    {
                        id: 10,
                        alt: "pdf",
                        src: PdfDocument,
                        pointer: "none",
                        disable: true
                    },
                ]
            }
        }
        if (this.props.tool_mode === false) {
            menu = [
                {
                    id: 1,
                    alt: "home",
                    src: HomeDocument,
                    pointer: "auto",
                    disable: false
                },
                {
                    id: 2,
                    alt: "search",
                    src: SearchDocument,
                    pointer: "auto",
                    disable: false
                },
                // {
                //     id: 3,
                //     alt: "edit",
                //     src: EditDocument,
                //     pointer: "none",
                //     disable: true
                // },
                {
                    id: 4,
                    alt: "add",
                    src: AddDocument,
                    pointer: "none",
                    disable: true
                },
                {
                    id: 5,
                    alt: "copy",
                    src: CopyDocument,
                    pointer: "none",
                    disable: true
                },
                {
                    id: 6,
                    alt: "save",
                    src: SaveDocument,
                    pointer: "none",
                    disable: true
                },
                {
                    id: 7,
                    alt: "retry",
                    src: RetryDocument,
                    pointer: "none",
                    disable: true
                },
                {
                    id: 8,
                    alt: "back",
                    src: BackDocument,
                    pointer: "none",
                    disable: true
                },
                {
                    id: 9,
                    alt: "forward",
                    src: ForwardDocument,
                    pointer: "none",
                    disable: true
                },
                {
                    id: 10,
                    alt: "pdf",
                    src: PdfDocument,
                    pointer: "none",
                    disable: true
                },
            ]
        }

        items = menu.map((item, index) =>
            <ToolbarItem key={item.id} id={item.id} alt={item.alt} src={item.src} pointer={item.pointer} select={this.state.id} disable={item.disable} callback={(idx) => {
                this.setState({
                    id: idx,
                })
                this.props.handleAction(item.alt);
            }} />
        );

        return (
            <div>
                <div id="toolbar">
                    <div className="container_12 clearfix" style={{ marginTop: "3px" }}>
                        <ul className="grid_12 nav-ul ">
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        )
    };
}


const mapStateToProps = (state) => ({
    actionMode: state.action,
    fill_data: state.fill_data,
    tool_mode: state.tool_mode,
})
const mapDispatchToProps = (dispatch) => ({
    handleAction: (value) => dispatch(action(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export const action = (value) => {
    // console.log("toolBar", value)
    if (value === "add") {
        return function (dispatch) {
            return axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/new/0`, "dataEmtry", { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
                console.log(res)
                return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((resUser) => {
                    console.log("resUser",resUser)
                    dispatch({
                        type: "POST DOCUMENT",
                        value: value,
                        resPost: res.data,
                        decoded: resUser.data
                    });
                }).catch(function (err) {
                    console.log(err)
                })
            }).catch(function (err) {
                console.log(err)
            })
        };
    }
    else {
        // console.log("anything")
        return {
            type: "ACTION",
            value: value
        }
    }
}