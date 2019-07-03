import React, { Component } from 'react'
 
import DrumBox from './DrumBox'
import BassBox from './BassBox'
import LeadBox from './LeadBox'

import Tone from 'tone';

import classNames from 'classnames';

import fileDownload from 'js-file-download';
import MidiWriter from 'midi-writer-js';

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
export const DRUMS = [ kick, clap, hhat, ohat, snare ]

const drumPaths = DRUMS.reduce((map, d) => {
  map[d.name] = d.path;
  return map;
}, {});

const gain = new Tone.Gain(0.35)  
const drumKeys = new Tone.Players(drumPaths, () => { log('loaded DRUMS') })
drumKeys.connect(gain)
gain.toMaster();

const PULSES = [0, 1, 2, 3, 4, 5, 6, 7, 8,9 , 10 , 11, 12 , 13 , 14, 15]

const synth = new Tone.Synth().toMaster();
const leadSynth = new Tone.FMSynth({
  "envelope" : {
    "attack" : 0.8,
    "decay" : 0.7
  },
  "modulation" : {
    "type" : "square"
  },
  "modulationEnvelope" : {
    "attack" : 0.2,
    "decay" : 0.01
  }
}).toMaster();


const EMPTY_DRUM_PATTERN = () => Array(DRUMS.length).fill(0).map(() => Array(PULSES.length).fill(0))
const MAJOR_SCALE = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const EMPTY_SYNTH_PATTERN = () => MAJOR_SCALE.map(() => Array(PULSES.length).fill(0));
const TAB_DRUMS = "DRUMS";
const TAB_BASS = "BASS";
const TAB_LEAD = "LEAD";

export default class StepSequencer extends Component {
  constructor(props) {
      super(props);        
      this.state = { bpm: BPM, playing: false, 
        drumsPatterns: EMPTY_DRUM_PATTERN(),
        bassNPatterns: EMPTY_SYNTH_PATTERN(),
        leadNPatterns: EMPTY_SYNTH_PATTERN(),
        activeTab: TAB_DRUMS
      }
      this.loop = new Tone.Sequence((time, col) => {
        for (let i = 0 ; i < DRUMS.length ; i ++) {
            if (this.state.drumsPatterns[i][col]) {
              drumKeys.get(DRUMS[i].name).start(time, 0, "16n")
            }
        }
        for (let i = 0 ; i < MAJOR_SCALE.length; i ++) {
          if (this.state.bassNPatterns[i][col]) {
            // log('i,col: ', i, ' ', col)
            const note = MAJOR_SCALE[i];
            const noteAndOctave = note + '2';
            // log('nAOc: ', noteAndOctave)
            synth.triggerAttackRelease(noteAndOctave, "16n")
          }
          if (this.state.leadNPatterns[i][col]) {
            const note = MAJOR_SCALE[i];
            const noteAndOctave = note + '4';
            // leadSynth.triggerAttackRelease(noteAndOctave, "8n")
            leadSynth.triggerAttackRelease(noteAndOctave, "16n")
          }
        }
        this.setState({pbCol: col})
        // log('pbcol: ', col)
        }, PULSES, "16n");
      
    this.onChangeBpm = this.onChangeBpm.bind(this);
    this.onHit = this.onHit.bind(this);
    this.onBassNote = this.onBassNote.bind(this);
    this.onLeadNote = this.onLeadNote.bind(this);
    this.onExport = this.onExport.bind(this);
    this.onClear = this.onClear.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }
  handleTab(tab) {
    console.log("handleTab!!", tab);
    // if (tab === TAB_DRUMS) {
    this.setState({ activeTab: tab})
    // }
  }

  render() {
    let playingClass = this.state.playing ? "viewing" : "";
    const drumsTabActive = this.state.activeTab === TAB_DRUMS;
    const bassTabActive = this.state.activeTab === TAB_BASS;
    const leadTabActive = this.state.activeTab === TAB_LEAD;
    return (
      <div id="sequencer" className="container is-fluid">
          <div className="controls">
              <div className={`${playingClass} columns is-mobile`}>
                {/* <div className="column is-one-fifth-mobile is-one-third-tablet"> */}
                <div className="column is-2">
                  <i onClick={() => { this.startPlay()}} className="material-icons">play_arrow</i>
                  <i onClick={() => { this.stopPlay()}} className="material-icons">stop</i>
                </div>
                <div className="form-group column is-10">
                  <div className="is-pulled-right columns is-mobile">
                    <label className="bpm-label tag is-black column is-3 is-offset-3 ">BPM</label>
                    <input value={this.state.bpm} type="text" placeholder="120" className=
                    {classNames('input column is-3', {'bpm-err' : this.state.bpmError})} onChange={this.onChangeBpm}/>
                  </div>
                </div>
              </div>
          </div>
          <div className="sequencer">
            <ul className="tabs is-boxed columns is-mobile" role="tablist">
              <li className="tab column is-one-fifth is-black"><a data-toggle="pill"
                onClick={() => this.handleTab(TAB_DRUMS)} className="nav-link active" aria-selected="true">DRUMS</a></li>
              <li className="nav-item column is-one-fifth"><a data-toggle="pill"
                onClick={() => this.handleTab(TAB_BASS)} className="nav-link" aria-selected="false">BASS</a></li>
              <li className="nav-item column is-one-fifth"><a data-toggle="pill" 
                onClick={() => this.handleTab(TAB_LEAD)} className="nav-link" aria-selected="false">LEAD</a></li>
            </ul>
            <div className="tab-content">
              {drumsTabActive && (
                <div className={classNames("tab")} id="DRUMS" role="tabpanel" aria-labelledby="DRUMS">
                  <DrumBox drums={DRUMS} pbCol={this.state.pbCol} onHit={this.onHit}
                    drumsPatterns={this.state.drumsPatterns}/>
                </div>
              )}
              {bassTabActive && (
                <div className="tab" id="bass" role="tabpanel" aria-labelledby="bass">
                  <BassBox notesPatterns={this.state.bassNPatterns} pbCol={this.state.pbCol}
                    onNote={this.onBassNote} />
                </div>
              )}
              {leadTabActive && (
                <div className="tab" id="lead" role="tabpanel" aria-labelledby="lead">
                <LeadBox 
                  notesPatterns = {this.state.leadNPatterns}
                  pbCol={this.state.pbCol}
                  onNote={this.onLeadNote} />
              </div>
              )}
            </div>
           </div> 

           <div className="columns">
            <div className="column is-12"> 
              <span className="button is-pulled-right" onClick={this.onExport}>Export to MIDI</span> 
              <button id="btn-clear" className="button is-pulled-right" onClick={this.onClear}>Clear</button>
            </div>
           </div>
        </div>
    )
  }

  onHit(l, c) {
    const dp = this.state.drumsPatterns;
    dp[l][c] = !dp[l][c]
    this.setState({drumsPatterns: dp})
  }

  onClear() {
    this.setState({
      drumsPatterns: EMPTY_DRUM_PATTERN(),
      bassNPatterns: EMPTY_SYNTH_PATTERN(),
      leadNPatterns: EMPTY_SYNTH_PATTERN()
    })  
  }

  onExport() {
    const track = new MidiWriter.Track();
    let events = [];
    for (let col = 0 ; col <= 8 ; col ++) {
      let pitches = []
      for (let i = 0 ; i < MAJOR_SCALE.length; i ++) {
        if (this.state.bassNPatterns[i][col]) {
          // log('i,col: ', i, ' ', col)
          const note = MAJOR_SCALE[i];
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
    const bpm = e.target.value;
    if (bpm < 5 || bpm > 200) {
      this.setState({bpm, bpmError: true})
      return;
    }
    this.setState({bpm, bpmError: false})
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
