import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
// import reducers from './reducers';

import { useState, useEffect } from 'react';

import Login from './login.js';
import { toModeInvisible } from '../../redux/modules/toolbar';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux'
import { connect } from 'react-redux'

const Home = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(footerToModeInvisible());
    }, []);

    useEffect(()=>{
        dispatch(toModeInvisible());
    }, []);
    return (
        <>
            <Login />
        </>
    )
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
