import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import IncidentDisplayComponent from './components/IncidentDisplayComponent';

require('dotenv').config();

function App() {

  return (
    <div className="App">
      <header>
        <nav className="nav-bar-main">
        </nav>
      </header>
      <div id="main">
        <article>
          <div>
            <Switch>
              <Route exact path="/">
                <div className="home-banner">
                  <h1>Prominent Edge Assignment</h1>
                </div>
                <div className="panel-grid-container">
                  <div className="panel-grid">
                    <IncidentDisplayComponent />
                  </div>
                </div>
              </Route>
              <Route>
                <div className="home-banner">
                  <h1>Page Not Found</h1>
                </div>
              </Route>
            </Switch>
          </div>
        </article>
        <nav>
        </nav>
        <aside>
        </aside>
      </div>
      <footer className="page-footer">
      </footer>
    </div>
  );
}

export default App;
