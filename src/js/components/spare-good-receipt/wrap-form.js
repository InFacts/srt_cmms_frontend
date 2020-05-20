import React from 'react';
import { connect } from 'react-redux'

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

class WrapForm extends React.Component {

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            "name": "nuk"
            // "description": this.state.description
        };
        console.log("data", data)

        axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/tester/reflecting-mirror`, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then(res => {
                // console.log(res);
                this.setState({ isFinish: true });
            }).catch(function (err) {
                console.log(err);
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TopContent />
                <BottomContent />
                <Footer />
            </form>
        )
    };
}

const mapStateToProps = (state) => ({
    actionMode: state.action,
})
export default connect(mapStateToProps)(WrapForm);