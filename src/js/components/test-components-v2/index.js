import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import AppTest from './app-test';

import Toolbar from './nav-toolbar';
import InputSearch from './input-search';
import ComponentObject from './input';
import Tabs from './tabs';



const store = createStore(reducers)

class Test extends React.Component {
    render() {

        var menu =[
            {
                title:"ทั่วไป"
            },
            {
                title:"สถานที่ติดตั้ง"
            }


        ]
        return (
            <Provider store={store}>
                
                <Toolbar />
                <div className="container_12 clearfix">
                    <div className="grid_12">
                        <InputSearch iconType="search" modalType="เลขที่เอกสาร"/>
                    </div>
                </div>

                <div className="container_12 clearfix">
                    <div className="grid_12">
                        <ComponentObject type="text" title="test1"/>
                    </div>
                    <div className="grid_12">
                        <ComponentObject type="text" title="test2"/>
                    </div>
                    <div className="grid_12">
                        <ComponentObject type="textarea" title="test3"/>
                    </div>
                    <div className="grid_12">
                        <ComponentObject type="text" title="test4"/>
                    </div>

                    <Tabs menu={menu}/>


                    <div id="ทั่วไป" className="tabcontent">



                    </div>

                    <div id="สถานที่ติดตั้ง" className="tabcontent">


                    </div>
                </div>
                
            </Provider>
        )
    };
}

export default Test;
