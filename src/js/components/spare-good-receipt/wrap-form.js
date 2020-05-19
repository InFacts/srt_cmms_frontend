import React from 'react';
import { connect } from 'react-redux'

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

class WrapForm extends React.Component {

    handleSubmit = event => {
        event.preventDefault();

        // const editCategory = {
        //     "name": this.state.name,
        //     "description": this.state.description
        // };
        // console.log("editCategory", editCategory)

        // axios.put(`http://vanilla-erp.com:${API_URL_DATABASE}/api/v1/product_categories/${this.props.match.params.product_category_id}`, editCategory, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        //     .then(res => {
        //         // console.log(res);
        //         this.setState({ isFinish: true });
        //     }).catch(function (err) {
        //         console.log(err);
        //     })

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