import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux'

import { useState, useEffect } from 'react';

import Login from './login.js';
import { toModeInvisible } from '../../redux/modules/toolbar';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import useTokenInitializer from '../../hooks/token-initializer';

const Home = (props) => {
    const dispatch = useDispatch();
    useTokenInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn);  // Check if Login, if yes the Redirect to /main

    useEffect(()=>{
        dispatch(footerToModeInvisible());
    }, []);

    useEffect(()=>{
        dispatch(toModeInvisible());
    }, []);

    return (
        <>
            {loggedIn ? <Redirect to="/main" /> : null}
            <Login />
        </>
    )
}

export default Home;
