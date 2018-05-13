import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Cell from './components/Cell'

import Tone from 'tone';


Tone.Transport.bpm.value = 122;
const sequence = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

// var synth = new Tone.Synth().toMaster();
// var loop = new Tone.Loop(function(time) {
//       synth.triggerAttackRelease("C4", "4n");
//     }, "2n");

var loop = new Tone.Sequence(function(time, col){
  // var column = matrix1.matrix[col];
  // for (var i = 0; i < 4; i++){
  //   if (column[i] === 1){
  //     //slightly randomized velocities
  //     // var vel = Math.random() * 0.5 + 0.5;
  //     var vel = 1;
  //     keys.get(noteNames[i]).start(time, 0, "32n", 0, vel);
  //   }
  // }
  console.log("loop:", time, col);
  if (col % 4 == 0) {
    keys.get('Kick').start(time);
  }
}, sequence, "16n");

var seq = new Tone.Sequence(function(time, note){
      // console.log(note, ", ", time, "  "); 
      // synth.triggerAttackRelease(note, "4n")
    //straight quater notes
  }, ["C1", "C1", "F2", "C4", "f2", "c3"], "8n")
// .start(0);

const drums = {
   "Kick": "./res/kick.wav",
  //  "Clap": "./res/clap.wav"
}


//setup a polyphonic sampler
var keys = new Tone.Players(drums, {
    "volume" : -10,
    "fadeOut" : "64n",
  }).toMaster();


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
        </header>
        {/* <button onClick={() => { this.startPlay() }}>Play</button>
        <button onClick={() => { this.stopPlay() }}>Stop</button> */}
        <div className="container containerBox"> 
          <div className="row controls">
              <i onClick={() => { this.startPlay()}} className="material-icons">play_arrow</i>
              <i onClick={() => { this.stopPlay()}} className="material-icons">stop</i>
          </div>
          <div className="row sequencer">
            <div className="col-md-2">
              Kick
            </div>
            <div className="col-md-10">
            {sequence.map((step, i) => { 
              return <Cell i={i} onClick={this.onClickCell}></Cell>
            })}
            </div> 
          </div>
        <div/>

        </div> 
        
      </div>
    );
  }

  onClickCell(e) {
  }

  startPlay() {
    Tone.Transport.start()
    loop.start()
  }

  stopPlay() {
    Tone.Transport.stop() 
    loop.stop()
  }

}

export default App;
