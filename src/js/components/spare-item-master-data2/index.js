import React, {useState} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import NavTopbar from '../nav/nav-top.js';
import Toolbar from '../common/nav-toolbar';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';
import { composeWithDevTools } from 'redux-devtools-extension';
// import TabDocument from '../common/tab-bar.js';
// const store = createStore(reducers, composeWithDevTools())

const TestBottomContent = () => {
    const [count1, setCount1] = useState(0);
    const [count, setCount] = useState(0);
    return (
        <>
            <div className="tabcontent" id="listReport_content" >
                <h3>London</h3>
                <p>London is the capital city of England.</p>
                <p>You clicked {count1} times</p>
                <button onClick={() => setCount1(count1 + 1)}>
                    Click me
                </button>
            </div>
            <div className="tabcontent" id="attachment_content" >
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>
        </>
    )
}
const ItemMasterData2 = () => {
    const [tabNames, setTabNames] = useState([
        {id:"attachment", name:"แนบไฟล์"},
        {id:"listReport", name:"รายการ"}
    ]);
        return (
            <>
                <NavTopbar />
                <Toolbar />
                
                <form>
                    <TopContent />
                    {/* <TabDocument tabNames={tabNames}>
                    <TestBottomContent />
                    </TabDocument> */}
                </form>
            </>
            // <Provider store={store}>
            //     <NavTopbar />
            //     <Toolbar />
            //     <form>
            //         <TopContent />
            //         <BottomContent />
            //         <Footer />
            //     </form>
            // </Provider>
        )

}

export default ItemMasterData2;