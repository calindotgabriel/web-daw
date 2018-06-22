import React, { Component } from 'react'
 
import Note from './Note'

import DrumBox from './DrumBox'

import Tone from 'tone';

import classNames from 'classnames';

let log = console.log;

const BPM = 120;
Tone.Transport.bpm.value = BPM;

const majorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

const kick = {
  name: "Kick",
  path: "./res/kick.wav",
  color: 'red'
}
const clap = {
  name: "Clap",
  path: "./res/clap2.wav",
  color: 'orange'
}
const hhat = {
  name: "CHat",
  path: "./res/chhat.wav",
  color: 'green'
}
const ohat = {
  name: "OHat",
  path: "./res/ohhat.wav",
  color: 'blueviolet'
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
const drumKeys = new Tone.Players(drumPaths, () => { log('loaded drums') })
drumKeys.connect(gain)
gain.toMaster();

const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8,9 , 10 , 11, 12 , 13 , 14, 15]

export default class StepSequencer extends Component {
  constructor(props) {
      super(props);        
      this.state = { bpm: BPM, playing: false, 
        drumsPatterns: Array(drums.length).fill(0).map(() => Array(sequence.length).fill(0))}

      this.loop = new Tone.Sequence((time, col) => {
        for (let i = 0 ; i < drums.length ; i ++) {
            if (this.state.drumsPatterns[i][col]) {
              drumKeys.get(drums[i].name).start(time, 0, "16n")
            }
        }
        this.setState({pbCol: col})
        log('pbcol: ', col)
        }, sequence, "16n");
      
    this.onChangeBpm = this.onChangeBpm.bind(this);
    this.onHit = this.onHit.bind(this);

  }

  render() {
    let playingClass = this.state.playing ? "viewing" : "";
    return (
      <div id="sequencer" className="container-fluid">
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
                
              <DrumBox drums={drums} pbCol={this.state.pbCol} onHit={this.onHit}
                drumsPatterns={this.state.drumsPatterns}/>
              {/* {this.state.playing ? "playing" : "not playing"} */}

              </div>
              <div className="tab pane fade" id="bass" role="tabpanel" aria-labelledby="bass">
                
                {majorScale.map((n, i) => {
                  return <Note note={n} key={i}/>
                })}

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
    // this.logDrumPatterns(dp);
    this.setState({drumsPatterns: dp})
  }


  onChangeBpm(e) {
    log('bpm: ', e.target.value)
    this.setBpm(e.target.value)
  }

  setBpm(bpm) {
    this.setState({bpm: bpm})
    if (bpm < 5 || bpm > 200) {
      this.setState({bpmError: true})
      return;
    }
    this.setState({bpmError: false})
    Tone.Transport.bpm.value = bpm;
  }

  logDrumPatterns(a) {
    // let a = this.state.drumsPatterns;
    for (let i = 0 ; i < a.length ; i ++) {
        for (let j = 0 ; j < a[0].length ; j ++) {
            if (a[i][j]) log("hit at ", i, " ", j)
        }
    }
  }

  startPlay() {
  this.loop.start()
  Tone.Transport.start()
  this.setState({playing: true})
  }

  stopPlay() {
  this.loop.stop()
  this.setState({pbCol: -1})
  this.setState({playing: false})
  }

}
