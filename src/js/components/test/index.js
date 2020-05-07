import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import AppTest from './app-test';

const store = createStore(reducers)

class Test extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppTest />
            </Provider>
        )
    };
}

export default Test;
