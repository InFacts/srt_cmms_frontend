import React from 'react';
import { connect } from 'react-redux'



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


class ToolbarItem extends React.Component{

    render(){
        var {alt ,src,callback} = this.props;
        return(
            <li className="nav-li" ><Link to="#" className="toolbar"><img alt={alt} src={src} onClick={callback} className="img-toolbar" /></Link></li>
        );
    }
}

class Toolbar extends React.Component {
    render() {
        var menu, items;
        menu = [
            {
                alt: "home",
                src : HomeDocument,
            },
            {
                alt: "search",
                src : SearchDocument,
            },
            {
                alt: "edit",
                src : EditDocument,
            },
            {
                alt: "add",
                src : AddDocument,
            },
            {
                alt: "copy",
                src : CopyDocument,
            },
            {
                alt: "save",
                src : SaveDocument,
            },
            {
                alt: "retry",
                src : RetryDocument,
            },
            {
                alt: "back",
                src : BackDocument,
            },
            {
                alt: "forward",
                src : ForwardDocument,
            },
            {
                alt: "pdf",
                src : PdfDocument,
            },
        ]



        items = menu.map((item , index) =>
            <ToolbarItem key={index} alt={item.alt} src={item.src} callback={() => {
                this.props.handleAction(item.alt);
            }}/>
        );
       
        return(
            <div>
                <div id="toolbar">
                    <div className="container_12 clearfix" style={{ marginTop: "3px"}}>
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

    return {
        type: "ACTION",
        value: value
    }
}