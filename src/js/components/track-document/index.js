import React, {useEffect} from 'react';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import { connect } from 'react-redux'
import {FACTS, fetchFact} from '../../redux/modules/api/fact.js'
import {TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeSearch, toModeAdd, toModeNoneHome,handleClickHomeToSpareMain } from '../../redux/modules/toolbar.js';

import {fetchDocuments } from '../../redux/modules/track_doc.js';

const Track = (props) => {

    // Fetch all Facts
    useEffect(() => {
        for (let factName in FACTS){
            props.fetchFact(FACTS[factName]);
        }
    }, []);

    // Change toolbar to Mode NoneHome
    useEffect(() => {
        props.toModeNoneHome();
    }, []);

    // Initial Fetch
    useEffect(() => {
        props.fetchDocuments();
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
                <BottomContent  />
            </form>
        </>
    )
}

const mapStateToProps = (state) => ({
    toolbar: state.toolbar
});

const mapDispatchToProps = {
    fetchFact, toModeNoneHome, handleClickHomeToSpareMain, fetchDocuments
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
