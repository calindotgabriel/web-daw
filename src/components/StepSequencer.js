import React, { Component } from 'react'
 
import { sequence } from './../constants'

import Drum from './Drum'

import Tone from 'tone';

let log = console.log;

const kick = {
    name: "Kick",
    path: "./res/kick.wav",
    pattern: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
const clap = {
    name: "Clap",
    path: "./res/clap2.wav",
    pattern: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
const hhat = {
    name: "CHat",
    path: "./res/chhat.wav",
    pattern: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
const snare = {
    name: "Snare",
    path: "./res/snare.wav",
    pattern: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
export const drums = [ kick, clap, hhat, snare ]

const drumPaths = drums.reduce((map, d) => {
    map[d.name] = d.path;
    return map;
  }, {});

const gain = new Tone.Gain(0.3)  
const drumSampler = new Tone.Players(drumPaths, () => { log('loaded drums!') })
drumSampler.connect(gain)
gain.toMaster();


 export default class StepSequencer extends Component {
    constructor(props) {
        super(props);        
        this.state = { drumsPatterns: Array(drums.length).fill().map(() => Array(sequence.length).fill(0))}
        this.loop = new Tone.Sequence((time, col) => {
          for (let i = 0 ; i < drums.length ; i ++) {
             if (this.state.drumsPatterns[i][col]) {
                drumSampler.get(drums[i].name).start(time, 0, "16n")
             }
          }
      }, sequence, "16n");
      this.onHit = this.onHit.bind(this);
    }
   render() {
     return (
       <div className="container-fluid">
          <div className="containerBox"> 
            <div className="row controls">
                <i onClick={() => { this.startPlay()}} className="material-icons">play_arrow</i>
                <i onClick={() => { this.stopPlay()}} className="material-icons">stop</i>
            </div>
            <div className="sequencer">
              {drums.map((d,i) => {
                return <Drum i={i} key={d.name} name={d.name} onHit={this.onHit}/>
              })}
            </div> 
          </div>
        <div/>
       </div>
     )
   }

   onHit(l, c) {
     log('onHit: ', l, ' ', c)
     let dp = this.state.drumsPatterns;
     dp[l][c] = !dp[l][c]
     this.setState(dp)
   }

   startPlay() {
    Tone.Transport.start()
    this.loop.start()
    }

  stopPlay() {
    // Tone.Transport.stop() 
    this.loop.stop()
    }

 }
 