import React from 'react';
import { connect } from 'react-redux'
class Counter extends React.Component {
    render() {
        return (
            <div>
            <p>Counter: {this.props.countNum}</p>
            <input value={this.props.text} onChange={(e) => this.props.handleChangeText(e)} />
            <input value={this.props.text2} onChange={(e) => this.props.handleChangeText2(e)} />
            <button onClick={() => this.props.handleIncrement()}>Increment</button>
            <button onClick={() => this.props.handleDecrement()}>Decrement</button>
        </div>
        )
    };
}

const mapStateToProps = (state) => ({
    countNum: state.count,
    text: state.text,
    text2: state.text2
})

const mapDispatchToProps = (dispatch) => ({
    handleIncrement: () => dispatch(increment()),
    handleDecrement: () => dispatch(decrement()),
    handleChangeText: (e) => dispatch(changeText(e)),
    handleChangeText2: (e) => dispatch(changeText2(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

// ACtion Creator
export const increment = () => {
    return {
        type: "INCREMENT"
    }
}

export const decrement = () => {
    return {
        type: "DECREMENT"
    }
}

export const changeText = (e) => {
    // console.log(e.target.value)
    return {
        type: "TEXT",
        value: e.target.value
    }
}

export const changeText2 = (e) => {
    console.log(e.target.value)
    return {
        type: "TEXT2",
        value: e.target.value
    }
}