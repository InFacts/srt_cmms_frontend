import React from 'react';
import { Router } from 'react-router-dom';
import FrontEnd from './js/route.js';

import NavTopbar from './js/components/common/nav-top2';
import Toolbar from './js/components/common/nav-toolbar';
import Footer from './js/components/common/footer';
import NavBottomStatus from './js/components/common/nav-bottom';
import history from './js/history'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <NavTopbar />
        <Toolbar />
        <FrontEnd />
        <Footer />
        <NavBottomStatus />
      </Router>
    </div>
  );
}

export default App;
