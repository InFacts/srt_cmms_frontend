import React, {useEffect} from 'react';
import { connect } from 'react-redux'

import NavTopbar from '../nav/nav-top.js';
import Toolbar from '../common/nav-toolbar';
import Footer from '../common/footer';
import TopContent from './top-content';
import { TOOLBAR_ACTIONS, handleClickHomeToSpareMain, toModeSearch } from '../../redux/modules/toolbar.js';

const ItemMasterDataComponent = (props) => {
    
    // Run only once with checking nothing []
    // 1. Change Toolbar to Mode Search
    useEffect(()=>{
        props.toModeSearch();
    }, []);

    // Handle home button, only re-subscribe if requiresHandleClick of HOME changes
    useEffect(()=> {
        if (props.toolbar.requiresHandleClick[TOOLBAR_ACTIONS.HOME]){
            props.handleClickHomeToSpareMain();
        }
    }, [props.toolbar.requiresHandleClick[TOOLBAR_ACTIONS.HOME]]);
    
    return (
    <>
        <NavTopbar />
        <Toolbar />   
        
        <form>
            <TopContent />
            {/* <TabDocument tabNames={tabNames}>
            <TestBottomContent />
            </TabDocument> */}
            <Footer />
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
    // </Provider> this is test
)}

const mapStateToProps = (state) => ({
    toolbar: state.toolbar
})

const mapDispatchToProps = {
    handleClickHomeToSpareMain, toModeSearch
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemMasterDataComponent);