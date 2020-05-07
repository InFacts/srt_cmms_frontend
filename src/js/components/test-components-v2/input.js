import React from 'react';
import '../../../css/style.css'
import { connect } from 'react-redux'

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
        }
    }

    handleInputChange =(e)=>{
        const {name,value} = e.target;
        this.setState({
            value:value,
        });
    }

    render(){
        var { type,disabled , data} = this.props;
        return(
            <input type={type} className="cancel-default mt-1" disabled ={disabled}  value={this.state.value} onChange={this.handleInputChange} ></input>
        );
    }
}

class Select extends React.Component {
    render(){
        var { disabled , data} = this.props;
        return(
            <select className="edit-select" disabled ={disabled}></select>
        );
    }
}

class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
        }
    }

    handleInputChange =(e)=>{
        const {name,value} = e.target;
        this.setState({
            value:value,
        });
    }
    render(){
        var { disabled , data} = this.props;
        return(
            <textarea className="edit" name="Text1" cols="40" rows="2" disabled ={disabled} value={this.state.value} onChange={this.handleInputChange} ></textarea>
        );
    }
}


class ComponentObject extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        var item,disabled,data;
        const { type , title } = this.props;

        // this.props.action;
        // this.props.data;

        if(this.props.action === "edit"){
            disabled = false;
            data = "";
        }
        if(this.props.action === "add"){
            disabled = false;
            data = "";
        }
        if(this.props.action === "copy"){
            disabled = true;
            data = "";
        }

        

        if(type){
            if(type === "text"){
                item = <Input type="text" disabled={disabled} data={this.props.data}/>
            }
            if (type === "date") {
                item = <Input type="date" disabled={disabled}/>
            }
            if (type === "textarea") {
                item = <TextArea disabled={disabled} data={data}/>
            }
            if (type === "select") {
                item = <Select disabled={disabled}/>
            }
        }


        return(

            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">{title}</p></div>
                <div className="grid_7 ">
                    {item}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    action: state.action,
    data: state.data,
})

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ComponentObject);


