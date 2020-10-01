import React, { Component } from 'react'
 
import DrumBox from './DrumBox'
import BassBox from './BassBox'
import LeadBox from './LeadBox'

import Tone from 'tone';

import classNames from 'classnames';

var fileDownload = require('js-file-download');

var MidiWriter = require('midi-writer-js');
// var fs = require('browserify-fs');


const majorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

let log = console.log;

const BPM = 120;
Tone.Transport.bpm.value = BPM;


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

const synth = new Tone.Synth().toMaster();
const leadSynth = new Tone.AMSynth().toMaster();

export default class StepSequencer extends Component {
  constructor(props) {
      super(props);        
      this.state = { bpm: BPM, playing: false, 
        drumsPatterns: Array(drums.length).fill(0).map(() => Array(sequence.length).fill(0)),
        bassNPatterns: majorScale.map(() => Array(sequence.length).fill(0)),
        leadNPatterns: majorScale.map(() => Array(sequence.length).fill(0)),
      }
      this.loop = new Tone.Sequence((time, col) => {
        for (let i = 0 ; i < drums.length ; i ++) {
            if (this.state.drumsPatterns[i][col]) {
              drumKeys.get(drums[i].name).start(time, 0, "16n")
            }
        }
        for (let i = 0 ; i < majorScale.length; i ++) {
          if (this.state.bassNPatterns[i][col]) {
            // log('i,col: ', i, ' ', col)
            const note = majorScale[i];
            const noteAndOctave = note + '2';
            // log('nAOc: ', noteAndOctave)
            synth.triggerAttackRelease(noteAndOctave, "16n")
          }
          if (this.state.leadNPatterns[i][col]) {
            const note = majorScale[i];
            const noteAndOctave = note + '4';
            // leadSynth.triggerAttackRelease(noteAndOctave, "8n")
            leadSynth.triggerAttackRelease(noteAndOctave, "16n")
          }
        }
        this.setState({pbCol: col})
        // log('pbcol: ', col)
        }, sequence, "16n");
      
    this.onChangeBpm = this.onChangeBpm.bind(this);
    this.onHit = this.onHit.bind(this);
    this.onBassNote = this.onBassNote.bind(this);
    this.onLeadNote = this.onLeadNote.bind(this);
    this.onExport = this.onExport.bind(this);
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
                href="#drums" className="nav-link active">DRUMS</a></li>
              <li className="nav-item"><a data-toggle="pill"
                href="#bass" className="nav-link" >BASS</a></li>
              <li className="nav-item"><a data-toggle="pill" 
                href="#lead" className="nav-link">LEAD</a></li>
            </ul>
            <div className="tab-content">
              <div className="tab pane fade show active" id="drums" role="tabpanel" aria-labelledby="drums">
                
              <DrumBox drums={drums} pbCol={this.state.pbCol} onHit={this.onHit}
                drumsPatterns={this.state.drumsPatterns}/>
              {/* {this.state.playing ? "playing" : "not playing"} */}

              </div>
              <div className="tab pane fade" id="bass" role="tabpanel" aria-labelledby="bass">
                
                <BassBox notesPatterns={this.state.bassNPatterns} pbCol={this.state.pbCol}
                  onNote={this.onBassNote} />

              </div>
              <div className="tab pane fade" id="lead" role="tabpanel" aria-labelledby="lead">
                <LeadBox 
                  notesPatterns = {this.state.leadNPatterns}
                  pbCol={this.state.pbCol}
                  onNote={this.onLeadNote} />
              </div>

            </div>
           </div> 

           <div className="row midi">
            <div className="float-right"> <span onClick={this.onExport}>Export to MIDI</span> </div>
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

  onExport() {
    // log('Should export to midi!')
    
    const track = new MidiWriter.Track();
    let events = [];
    for (let col = 0 ; col <= 8 ; col ++) {
      let pitches = []
      for (let i = 0 ; i < majorScale.length; i ++) {
        if (this.state.bassNPatterns[i][col]) {
          // log('i,col: ', i, ' ', col)
          const note = majorScale[i];
          const noteAndOctave = note + '2';
          pitches.push(noteAndOctave)
        }
      }
      events.push(new MidiWriter.NoteEvent({pitch: pitches, duration: '8'}) )
    }

      track.addEvent(events, 
        function(event, index) {
        // Sets the sequential property to true for all events
        return {sequential:true};
        } 
      );
      track.setTempo(this.state.bpm)

      const write = new MidiWriter.Writer([track]);
      // write.saveMIDI('file')
      // log(write.dataUri())
      let data = write.buildFile();
      fileDownload(data, 'file.mid');
  }

  onBassNote(l, c) {
     let bp = this.state.bassNPatterns
     bp[l][c] = !bp[l][c]
     this.setState({notesPatterns: bp})
  }

  onLeadNote(l, c) {
    log('leadnote: ', l , ' ', c);
    let lp = this.state.leadNPatterns;
    lp[l][c] = !lp[l][c];
    this.setState({leadNPatterns: lp})
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
