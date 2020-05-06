import React from 'react';
import '../../../css/style.css'

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

    render() {
        var item;

        const {type,disabled,data,action} = this.props;

        if(type){
            if (type === "text") {
                if(action=== "search"){
                    item = <input type="text" className="cancel-default mt-1" disabled ={disabled} value={data} ></input>;
                }
                if(action=== "add"){
                    item = <input type="text" className="cancel-default mt-1" disabled ={disabled} value={this.state.value} onChange={this.handleInputChange}></input>;
                }
                if(action=== "edit"){
                    item = <input type="text" className="cancel-default mt-1" disabled ={disabled} value={this.state.value} onChange={this.handleInputChange}></input>;
                }
            }
            if (type === "date") {
                item = <input type="date" className="cancel-default mt-1" disabled ={disabled} value={data}></input>;
            }
            if (type === "textarea") {
                item = <textarea className="edit" name="Text1" cols="40" rows="2" disabled ={disabled} value={data}></textarea>;
            }
            if (type === "select") {
                item = <select className="edit-select" disabled ={disabled}></select>;
            }
        }

        return(
            <div>{item}</div>
        );

    }



}

export default Input;