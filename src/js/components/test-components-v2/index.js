import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import Toolbar from '../common/nav-toolbar';
import Files from '../common/files'



const store = createStore(reducers)

class Test extends React.Component {
    
    render() {


        return (
            <Provider store={store}>
                
                <Toolbar />


                <div className="container_12 clearfix">
                  <Files />
                </div>
                
            </Provider>
        )
    };
}

export default Test;
