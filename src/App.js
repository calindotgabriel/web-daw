import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StepSequencer from './components/StepSequencer'

import Tone from 'tone';

import { sequence } from "./constants";


let log = console.log;

Tone.Transport.bpm.value = 122;
// 16 * 16 sixteen notes = 1 measure
// 2 * 8 eighteen notes = 2 measures ( pace slowed ) 


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>
        <StepSequencer></StepSequencer>
      </div>
    );
  }

  

  drumByName() {

  }

  

}

export default App;
