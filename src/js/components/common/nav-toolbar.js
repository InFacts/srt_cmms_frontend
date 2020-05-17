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
        var { id, alt, src, pointer, select, callback } = this.props;
        return (

            (select === id)
                ?
                <li className="nav-li" ><Link className="toolbar" style={{ pointerEvents: pointer }}><div className="selecting"><img alt={alt} src={src} onClick={() => { callback(0) }} className="img-toolbar" /></div></Link></li>
                :
                <li className="nav-li" ><Link className="toolbar" style={{ pointerEvents: pointer }}><img alt={alt} src={src} onClick={() => { callback(id) }} className="img-toolbar" /></Link></li>
        );
    }
}

class Toolbar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: 0,
        }
    }

    render() {
        const current = this;
        var menu, items;
        menu = [
            {
                id: 1,
                alt: "home",
                src: HomeDocument,
                pointer: "auto"
            },
            {
                id: 2,
                alt: "search",
                src: SearchDocument,
                pointer: "auto"
            },
            {
                id: 3,
                alt: "edit",
                src: EditDocument,
                pointer: "auto"
            },
            {
                id: 4,
                alt: "add",
                src: AddDocument,
                pointer: "auto"
            },
            {
                id: 5,
                alt: "copy",
                src: CopyDocument,
                pointer: "none"
            },
            {
                id: 6,
                alt: "save",
                src: SaveDocument,
                pointer: "none"
            },
            {
                id: 7,
                alt: "retry",
                src: RetryDocument,
                pointer: "none"
            },
            {
                id: 8,
                alt: "back",
                src: BackDocument,
                pointer: "none"
            },
            {
                id: 9,
                alt: "forward",
                src: ForwardDocument,
                pointer: "none"
            },
            {
                id: 10,
                alt: "pdf",
                src: PdfDocument,
                pointer: "none"
            },
        ]

        items = menu.map(function (item, index) {
            return (
                <ToolbarItem key={item.id} id={item.id} alt={item.alt} src={item.src} pointer={item.pointer} select={current.state.id} callback={(idx) => {
                    current.setState({
                        id: idx,
                    })
                    current.props.handleAction(item.alt);
                }} />
            )
        });

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
})
const mapDispatchToProps = (dispatch) => ({
    handleAction: (value) => dispatch(action(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export const action = (value) => {
    if (value === "add") {
        return function (dispatch) {
            return axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/new/0`).then((res) => {
                // console.log("add document", res)
              // dispatch
              dispatch({
                type: "POST DOCUMENT",
                value: value,
                resPost: res.data
              });
            });
          };
    }
    else {
        console.log("anything")
        return {
            type: "ACTION",
            value: value
        }
    }
}