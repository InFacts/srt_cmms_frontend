import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from './reducers';

import Login from './forgot.js';

import { toModeInvisible } from '../../redux/modules/toolbar';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import useTokenInitializer from '../../hooks/token-initializer';

const store = createStore(reducers, applyMiddleware(thunk))

const ForgetPass = (props) => {
    const dispatch = useDispatch();
    useTokenInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn);  // Check if Login, if yes the Redirect to /main

    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    useEffect(() => {
        dispatch(toModeInvisible());
    }, []);

    return (
        <Provider store={store}>
            <Login />
        </Provider>
    )
}

export default ForgetPass;