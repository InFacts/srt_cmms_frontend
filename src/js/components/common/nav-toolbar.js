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
        var {id,alt ,src,select,callback} = this.props;
        return(
            
            (select === id)
            ?   
                <li className="nav-li" ><Link to="#" className="toolbar"><div class="selecting"><img alt={alt} src={src} onClick={()=>{callback(0)}}  className="img-toolbar "  /></div></Link></li>
            :
                <li className="nav-li" ><Link to="#" className="toolbar"><img  alt={alt} src={src} onClick={()=>{callback(id)}} className="img-toolbar" /></Link></li>  
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
        var menu, items;
        menu = [
            {
                id:1,
                alt: "home",
                src : HomeDocument,
            },
            {
                id:2,
                alt: "search",
                src : SearchDocument,
            },
            {
                id:3,
                alt: "edit",
                src : EditDocument,
            },
            {
                id:4,
                alt: "add",
                src : AddDocument,
            },
            {
                id:5,
                alt: "copy",
                src : CopyDocument,
            },
            {
                id:6,
                alt: "save",
                src : SaveDocument,
            },
            {
                id:7,
                alt: "retry",
                src : RetryDocument,
            },
            {
                id:8,
                alt: "back",
                src : BackDocument,
            },
            {
                id:9,
                alt: "forward",
                src : ForwardDocument,
            },
            {
                id:10,
                alt: "pdf",
                src : PdfDocument,
            },
        ]



        items = menu.map((item , index) =>
            <ToolbarItem  key={item.id} id={item.id} alt={item.alt} src={item.src} select={this.state.id} callback={(idx) => {
                this.setState({
                    id:idx,
                })
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