import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import NavTopbar from '../nav/nav-top.js';
import TopContent from './top-content';



const store = createStore(reducers)
class Register extends React.Component {
    render() {
        const type = 'Register';
        return (
            <Provider store={store}>
                <NavTopbar />
                <form>
                    <TopContent />
                </form>
            </Provider>
        )
    };
}

export default Register;
