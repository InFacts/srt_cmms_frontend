import React, {useEffect} from 'react';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';

import {TOOLBAR_MODE } from '../../redux/modules/toolbar.js';

import {fetchDocuments } from '../../redux/modules/track_doc.js';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useToolbarInitializer from '../../hooks/toolbar-initializer';

const Track = (props) => {

    useFactInitializer();
    useToolbarInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    // Initial Fetch
    useEffect(() => {
        dispatch(fetchDocuments());
    }, []);

    // Footer invisible
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(footerToModeInvisible());
    }, []);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form>
                <TopContent />
                <BottomContent  />
            </form>
        </>
    )
}

export default Track;
