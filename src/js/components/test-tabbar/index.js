import React, {useState} from 'react';

import NavTopbar from '../nav/nav-top';
import Toolbar from '../common/nav-toolbar';
import TabBar, {TAB_BAR_ACTIVE} from '../common/tab-bar';
import ListContent from '../test-tabbar/content';

import TopContent from './top-content';

const TestTabbar = () => {
    const [tabNames, setTabNames] = useState([
        {id:"attachment", name:"แนบไฟล์", is_active: TAB_BAR_ACTIVE.INACTIVE},
        {id:"listReport", name:"รายการ", is_active: TAB_BAR_ACTIVE.ACTIVE}
    ]);
    const [initialTabbar, setInitialTabbar] = useState(true);

    return (
        <>
            <NavTopbar />
            <Toolbar />
            <TopContent />
            <TabBar tabNames={tabNames} initialTabbar={initialTabbar} setInitialTabbar={setInitialTabbar}>
                <ListContent />
            </TabBar>
        </>
    )
}

export default TestTabbar;