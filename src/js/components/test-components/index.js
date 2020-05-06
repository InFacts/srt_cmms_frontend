import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import NavBottom from '../nav/nav-bottom.js';


import AddDocument from '../../../images/toolbar/add-document.svg'
import CopyDocument from '../../../images/toolbar/copy-document.svg'
import EditDocument from '../../../images/toolbar/edit.svg'
import SaveDocument from '../../../images/toolbar/save.svg'
import RetryDocument from '../../../images/toolbar/retry.svg'
import BackDocument from '../../../images/toolbar/back.svg'
import ForwardDocument from '../../../images/toolbar/forward.svg'
import PdfDocument from '../../../images/toolbar/pdf.svg'

import ToolBar from './nav-toolbar.js';
import TopContent from './top-content.js';
import BottomContent from './bottom-content.js';


class Test2 extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            diabled:false,
            action:'search',
            data:[],
        };
        this.document = this.document.bind(this);
    }


    document=(alt)=>{
        if(alt === "EditDocument"){
            this.setState({
                diabled:false,
                action:"edit",
                data:[],
            });
        }
        if(alt === "AddDocument"){
            this.setState({
                diabled:false,
                action:"add",
                data:[],
            });
        }
        if(alt === "CopyDocument"){
            this.setState({
                diabled:true,
                action:"search",
                data:[],
            });
        }
    }

    handleInputSearch=(data)=>{
        this.setState({
            data:['Test'],
        });
    }
    
    

    render() {
        const type = 'Test2';
        var menu = [
            {
                alt: "EditDocument",
                src : EditDocument,
                callback: this.document
            },
            {
                alt: "AddDocument",
                src : AddDocument,
                callback: this.document
            },
            {
                alt: "CopyDocument",
                src : CopyDocument,
                callback: this.document
            },
            {
                alt: "SaveDocument",
                src : SaveDocument,
                callback: this.document
            },
            {
                alt: "RetryDocument",
                src : RetryDocument,
                callback: this.document
            },
            {
                alt: "BackDocument",
                src : BackDocument,
                callback: this.document
            },
            {
                alt: "ForwardDocument",
                src : ForwardDocument,
                callback: this.document
            },
            {
                alt: "PdfDocument",
                src : PdfDocument,
                callback: this.document
            },
        ];


        return (
            <div>
                <NavTopbar />

                <ToolBar menu={menu} />
                <TopContent callback={this.handleInputSearch}/>
                <BottomContent disabled={this.state.diabled} action={this.state.action} data={this.state.data}/>


                <NavBottom type={type} />
            </div>
        )
    };
}

export default Test2;
