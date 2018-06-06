import React, { Component } from 'react'
 
import { sequence } from './../constants'

import Drum from './Drum'

import Tone from 'tone';

let log = console.log;

const kickDrum = {
    name: "Kick",
    path: "./res/kick.wav",
    pattern: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
export const drums = [ kickDrum, ]

const drumPaths = drums.reduce(function(map, d) {
    map[d.name] = d.path;
    return map;
  }, {});
  
const keys = new Tone.Players(drumPaths, {
    "volume" : -10,
    "fadeOut" : "64n",
    }).toMaster();

var loop = new Tone.Sequence(function(time, col){
    // console.log("loop:", time, col);
    if (drums[0].pattern[col])
      keys.get('Kick').start(time, 0, "4n");
  }, sequence, "16n");


 export default class StepSequencer extends Component {
    constructor(props) {
        super(props);        
        // this.onClickCell = this.onClickCell.bind(this);
    }
   render() {
     return (
       <div>
          <div className="container containerBox"> 
          <div className="row controls">
              <i onClick={() => { this.startPlay()}} className="material-icons">play_arrow</i>
              <i onClick={() => { this.stopPlay()}} className="material-icons">stop</i>
          </div>
          <div className="sequencer">
            <Drum name="Kick"/>
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
 