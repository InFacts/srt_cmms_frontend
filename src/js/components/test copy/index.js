import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducers)

class Test extends React.Component {
    render() {
        return (
            <Provider store={store}>
                hello
            </Provider>
        )
    };
}

export default Test;
