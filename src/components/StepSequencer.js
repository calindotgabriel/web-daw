import React, { Component } from 'react'
 
import { sequence } from './../constants'

import Drum from './Drum'

import Tone from 'tone';

import classNames from 'classnames';

let log = console.log;

const BPM = 120;
Tone.Transport.bpm.value = BPM;

const kick = {
    name: "Kick",
    path: "./res/kick.wav",
}
const clap = {
    name: "Clap",
    path: "./res/clap2.wav",
}
const hhat = {
    name: "CHat",
    path: "./res/chhat.wav",
}
const ohat = {
    name: "OHat",
    path: "./res/ohhat.wav",
}
const snare = {
    name: "Snare",
    path: "./res/snare2.wav",
}
// export const drums = [ kick ]
export const drums = [ kick, clap, hhat, ohat, snare ]

const drumPaths = drums.reduce((map, d) => {
    map[d.name] = d.path;
    return map;
  }, {});

const gain = new Tone.Gain(0.35)  
const drumSampler = new Tone.Players(drumPaths, () => { log('loaded drums!') })
drumSampler.connect(gain)
gain.toMaster();

export default class StepSequencer extends Component {
  constructor(props) {
      super(props);        
      this.state = { bpm: BPM, drumsPatterns: Array(drums.length).fill(0).map(() => Array(sequence.length).fill(0))}
      this.loop = new Tone.Sequence((time, col) => {
        for (let i = 0 ; i < drums.length ; i ++) {
            if (this.state.drumsPatterns[i][col]) {
              drumSampler.get(drums[i].name).start(time, 0, "16n")
            }
        }
        log('col: ', col)
        this.setState({pbCol: col})
    }, sequence, "16n");
    this.onHit = this.onHit.bind(this);
    this.onChangeBpm = this.onChangeBpm.bind(this);
  }

  render() {
    let playingClass = this.state.playing ? "viewing" : "";
    return (
      <div className="container-fluid">
        <div className="containerBox"> 
          <div className="row controls">
              <div className="col-10">
              <div className={playingClass}>
                <i onClick={() => { this.startPlay()}} className="material-icons">play_arrow</i>
                <i onClick={() => { this.stopPlay()}} className="material-icons">stop</i>
              </div>
              </div>
              <div className="col-2">
                <div className="form-group">
                  <label> BPM: </label>
                  <input value={this.state.bpm} className={classNames('form-control', {'bpm-err' : this.state.bpmError})} onChange={this.onChangeBpm}/>
                </div>
              </div>
          </div>
          
          
          <div className="row sequencer">
            <ul className="nav nav-pills container instruments" role="tablist">
              <li className="nav-item"><a data-toggle="pill"
                href="#drums" className="nav-link active" aria-selected="true">DRUMS</a></li>
              <li className="nav-item"><a data-toggle="pill"
                href="#bass" className="nav-link" aria-selected="false">BASS</a></li>
              <li className="nav-item"><a data-toggle="pill" 
                href="#lead" className="nav-link" aria-selected="false">LEAD</a></li>
            </ul>
            <div className="tab-content">
              <div className="tab pane fade show active" id="drums" role="tabpanel" aria-labelledby="drums">
                {drums.map((d,i) => {
                return <Drum key={d.name} i={i} name={d.name} 
                  onHit={this.onHit} pattern={this.state.drumsPatterns[i]} pbCol={this.state.pbCol}/>
              })}
              </div>
              <div className="tab pane fade" id="bass" role="tabpanel" aria-labelledby="bass">
                bass
              </div>
              <div className="tab pane fade" id="lead" role="tabpanel" aria-labelledby="lead">
                lead
              </div>

            </div>
            
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
    this.logDrumPatterns();
    this.setState(dp)
  }

  onChangeBpm(e) {
    log('bpm: ', e.target.value)
    this.setBpm(e.target.value)
  }

  setBpm(bpm) {
    this.setState({bpm: bpm})
    if (bpm < 40 || bpm > 200) {
      this.setState({bpmError: true})
      return;
    }
    this.setState({bpmError: false})
    Tone.Transport.bpm.value = bpm;
  }

  logDrumPatterns() {
    let a = this.state.drumsPatterns;
    for (let i = 0 ; i < a.length ; i ++) {
        for (let j = 0 ; j < a[0].length ; j ++) {
            if (a[i][j]) log("hit at ", i, " ", j)
        }
    }
  }

  startPlay() {
  Tone.Transport.start()
  this.loop.start()
  this.setState({playing: true})
  }

  stopPlay() {
  // Tone.Transport.stop() 
  this.loop.stop()
  this.setState({pbCol: -1})
  this.setState({playing: false})
  }

}
