import React from 'react';
import NavTopbar from '../nav/nav-top.js';
import Toolbar from '../common/nav-toolbar';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';
const Track = () => {
    return (
        <>
            <NavTopbar />
            <Toolbar />
            <form>
                <TopContent />
                <BottomContent  />
                <Footer />
            </form>
        </>
    )
}

export default Track;
