import React from 'react';
import { connect } from 'react-redux'
const axios = require("axios");
// import { API_PORT_DATABASE } from '../../config_port.js';
// import { API_URL_DATABASE } from '../../config_url.js';
class Counter extends React.Component {

    constructor(props) {

        super(props);
    
        this.state = {
    
          file: null
    
        };
    
        this.onFormSubmit = this.onFormSubmit.bind(this);
    
        this.onChange = this.onChange.bind(this);
    
      }
      onFormSubmit(e) {

        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append('file', this.state.file);
        formData.append('file', this.state.file);
        formData.append('file', this.state.file);
    
        console.log(this.state.file);
    
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
    
        axios.post(`http://43.229.79.36:60013/attachment/1`, formData, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
          .then((response) => {
            console.log(response)
            alert(response);
          }).catch((error) => {
            console.log(error)
            alert(error);
          });
      }
    
      onChange(e) {
        this.setState({ file: e.target.files[0] });
      }


    render() {
        // console.log("test render",this.props.countNum)
        return (
        //     <div>
        //     <p>Counter: {this.props.countNum}</p>
        //     <input value={this.props.text} onChange={(e) => this.props.handleChangeText(e)} />
        //     <input value={this.props.text2} onChange={(e) => this.props.handleChangeText2(e)} />
        //     <button onClick={() => this.props.handleIncrement()}>Increment</button>
        //     <button onClick={() => this.props.handleDecrement()}>Decrement</button>
        // </div>
        <div >

        <form onSubmit={this.onFormSubmit}>

          <h1>File Upload</h1>

          <input type="file" name="myImage" onChange={this.onChange} />

          <button type="submit">Upload</button>

        </form>

      </div>
        )
    };
}
export default Counter;
// const mapStateToProps = (state) => ({
//     countNum: state.count,
//     text: state.text,
//     text2: state.text2
// })

// const mapDispatchToProps = (dispatch) => ({
//     handleIncrement: () => dispatch(increment()),
//     handleDecrement: () => dispatch(decrement()),
//     handleChangeText: (e) => dispatch(changeText(e)),
//     handleChangeText2: (e) => dispatch(changeText2(e))
// })
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);

// // ACtion Creator
// export const increment = () => {
//     return {
//         type: "INCREMENT"
//     }
// }

// export const decrement = () => {
//     return {
//         type: "DECREMENT"
//     }
// }

// export const changeText = (e) => {
//     // console.log(e.target.value)
//     return {
//         type: "TEXT",
//         value: e.target.value
//     }
// }

// export const changeText2 = (e) => {
//     console.log(e.target.value)
//     return {
//         type: "TEXT2",
//         value: e.target.value
//     }
// }