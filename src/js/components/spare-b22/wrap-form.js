import React from 'react';
import { connect } from 'react-redux'

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import jwt_decode from 'jwt-decode';

class WrapForm extends React.Component {




    async componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        // var token_auth = localStorage.getItem('token_auth');
        // console.log(jwt_decode(token_auth))
        // this.props.onProfile(jwt_decode(token_auth).id)
    }

    render() {
        return (
            <div>
                <form >
                    <TopContent />
                    <BottomContent />
                </form>
            </div>
        )
    };
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    // onProfile: (e) => dispatch(onProfile(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WrapForm);


export const onProfile = (user_id) => {
    return function (dispatch) {
        return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
            return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?created_by_user_id==${user_id}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then((resDoc) => {
                dispatch({
                    type: "PROFILE",
                    value: res.data,
                    resDoc: resDoc.data,
                });
            })
        });
    };
}
