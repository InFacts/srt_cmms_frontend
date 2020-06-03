import React, { useEffect } from 'react';
import TopContent from './top-content';

import { connect } from 'react-redux'

const MainModule = (props) => {

    return (
        <>
            <TopContent />
        </>
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainModule);