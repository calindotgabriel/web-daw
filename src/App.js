import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Tone from 'tone';

var synth = new Tone.Synth().toMaster();
var loop = new Tone.Loop(function(time) {
      synth.triggerAttackRelease("C4", "4n");
    }, "2n");

var seq = new Tone.Sequence(function(time, note){
      console.log(note, ", ", time, "  ");
      synth.triggerAttackRelease(note, "4n")
    //straight quater notes
    }, ["C4", "E4", "G4", "A4"], "4n")
    .start(0);

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
