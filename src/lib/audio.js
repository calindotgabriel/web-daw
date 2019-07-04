import Tone from 'tone';

export const TAB_DRUMS = "DRUMS";
export const TAB_BASS = "BASS";
export const TAB_LEAD = "LEAD";
export const BPM = 120;

export const TIMELINE = [0, 1, 2, 3, 4, 5, 6, 7, 8,9 , 10 , 11, 12 , 13 , 14, 15]

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
export const drumKeys = new Tone.Players(drumPaths,
  () => { console.log('Loaded drum file data.') })
Tone.Transport.bpm.value = BPM;
drumKeys.connect(gain);
gain.toMaster();

export const synth = new Tone.Synth().toMaster();
export const leadSynth = new Tone.FMSynth({
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