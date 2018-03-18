import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Cell from './components/Cell'

import Tone from 'tone';

var synth = new Tone.Synth().toMaster();
var loop = new Tone.Loop(function(time) {
      synth.triggerAttackRelease("C4", "4n");
    }, "2n");

var seq = new Tone.Sequence(function(time, note){
      console.log(note, ", ", time, "  ");
      synth.triggerAttackRelease(note, "4n")
    //straight quater notes
    }, ["C4", "D4", "G4", "A4"], "2n")
    .start(0);

  const drums = [ 'kick', 'clap', 'snare' ]; 

const sequence = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const sequenceStyle = {
}

class App extends Component {
  constructor(props) {
    super(props);
    this.onClickCell = this.onClickCell.bind(this);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Web Daw!</h1>
        </header>
        <p className="App-intro">
          Tone Test
        </p>
        <button onClick={() => { Tone.Transport.start() }}>Play</button>
        <button onClick={() => { Tone.Transport.stop() }}>Stop</button>
        <div className="sequence">
          <span className="label">Kick</span>
          {sequence.map((step, i) => { 
            return <Cell i={i} onClick={this.onClickCell}></Cell>
          })}
        </div>
      </div>
    );
  }

  onClickCell(e) {
  }

}

export default App;
