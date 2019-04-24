import React, { Component } from 'react';
import './App.css';

import StepSequencer from './components/StepSequencer'

import Tone from 'tone';

let log = console.log;


// 16 * 16 sixteen notes = 1 measure
// 2 * 8 eighteen notes = 2 measures ( pace slowed ) 


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2 className="title">Shiko Sound Machine</h2>
        </header>
        <StepSequencer/>
      </div>
    );
  }
}

export default App;
