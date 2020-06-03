import React from 'react';
import { Router } from 'react-router-dom';
import FrontEnd from './js/route.js';

import NavTopbar from './js/components/common/nav-top2';
import Toolbar from './js/components/common/nav-toolbar';
import history from './js/history'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <NavTopbar />
        <Toolbar />
        <FrontEnd />
      </Router>
    </div>
  );
}

export default App;
