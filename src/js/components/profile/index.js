import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from "redux-thunk";
import NavTopbar from '../nav/nav-top.js';
// import TopContent from './top-content';
// import BottomContent from './bottom-content';
import WrapForm from './wrap-form';

const store = createStore(reducers, applyMiddleware(thunk))
class Profile extends React.Component {
    render() {
        const type = 'Profile';
        return (
            <Provider store={store}>
                <NavTopbar />
                
                <WrapForm />
            </Provider>
        )
    };
}

export default Profile;
