import React, { Component } from 'react';
import './App.css';

import StepSequencer from './components/StepSequencer'

let log = console.log;


// 16 * 16 sixteen notes = 1 measure
// 2 * 8 eighteen notes = 2 measures ( pace slowed ) 

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="hero is-info is-fullheight">
        <div className="hero-head">
          <div className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <div className="navbar-item">
                  Rhytmicinnø
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-body">
          <StepSequencer/>
        </div>
      </section>
    );
  }
}

export default App;
