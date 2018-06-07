import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StepSequencer from './components/StepSequencer'

import Tone from 'tone';

import { sequence } from "./constants";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

let log = console.log;

Tone.Transport.bpm.value = 122;
// 16 * 16 sixteen notes = 1 measure
// 2 * 8 eighteen notes = 2 measures ( pace slowed ) 


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2 className="title">Rhytmicinno SoundBox</h2>
        </header>
        <StepSequencer/>

        <Tabs className="nav">
          <TabList>
            <Tab className="nav-item">Drums</Tab>
            <Tab className="nav-item">Bass</Tab>
          </TabList>

          <TabPanel>
            <h2>Drums here</h2>
          </TabPanel>
          <TabPanel>
            <h2>BASS here</h2>
          </TabPanel>
        </Tabs>
      </div>
    );
  }

  

  drumByName() {

  }

  

}

export default App;
