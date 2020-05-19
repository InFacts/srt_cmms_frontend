import React from 'react';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

class WrapForm extends React.Component {

    render() {
        return (
            <form>
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