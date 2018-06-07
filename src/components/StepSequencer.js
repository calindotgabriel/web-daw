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

const drumPaths = drums.reduce(function(map, d) {
    map[d.name] = d.path;
    return map;
  }, {});

const gain = new Tone.Gain(0.3)  
const drumSampler = new Tone.Players(drumPaths, () => {
  log('loaded drums!')
})
drumSampler.connect(gain)
gain.toMaster();


var loop = new Tone.Sequence(function(time, col){
    // console.log("loop:", time, col);
    drums.forEach(d => {
        if (d.pattern[col]) drumSampler.get(d.name).start(time, 0, "8n")
    })
    // for (let i = 0 ; i < drums.length ; i ++) {
    //    if (drums[i]) keys[i].start(time, 0, "4n")
    // }
    // if (drums[0].pattern[col])
    //   keys.get('Kick').start(time, 0, "4n");
  }, sequence, "16n");


 export default class StepSequencer extends Component {
    constructor(props) {
        super(props);        
        // this.onClickCell = this.onClickCell.bind(this);
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
                return <Drum key={d.name} name={d.name} pattern={d.pattern}/>
              })}
            </div> 
          </div>
        <div/>
       </div>
     )
   }

   startPlay() {
    Tone.Transport.start()
    loop.start()
    }

  stopPlay() {
    // Tone.Transport.stop() 
    loop.stop()
    }

 }
 