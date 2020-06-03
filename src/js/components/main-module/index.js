import React, { useEffect } from 'react';
import TopContent from './top-content';

import { toModeNone } from '../../redux/modules/toolbar.js';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'

const MainModule = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(toModeNone());
    }, []);

    useEffect(()=>{
        dispatch(footerToModeInvisible());
    }, []);

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