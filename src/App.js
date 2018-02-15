import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Tone from 'tone';

var synth = new Tone.Synth().toMaster();
var loop = new Tone.Loop(function(time) {
      synth.triggerAttackRelease("C4", "8n");
    }, "8n").start(0);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Web Daw!</h1>
        </header>
        <p className="App-intro">
          Here sounds will be played.
        </p>
        <button onClick={() => { Tone.Transport.start() }}>Play</button>
        <button onClick={() => { Tone.Transport.stop() }}>Stop</button>
      </div>
    );
  }


}

export default App;
