import React, {useEffect} from 'react';
import { connect } from 'react-redux'

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
        <form>
            <TopContent />
            <Footer />
        </form>
    </>
)}

const mapStateToProps = (state) => ({
    toolbar: state.toolbar
})

const mapDispatchToProps = {
    handleClickHomeToSpareMain, toModeSearch
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemMasterDataComponent);