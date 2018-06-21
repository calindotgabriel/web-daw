import React, { Component } from 'react'

import Tone from 'tone';

import Drum from './Drum'

let log = console.log;



export default class DrumBox extends Component {
   
  constructor(props) {
      super(props);
      
  }

  render() {
    log('drumbox render!!')
    
    return (
      <div>
           {this.props.drums.map((d,i) => {
                return <Drum key={d.name} i={i} name={d.name} 
                  onHit={this.props.onHit} color={d.color} pattern={this.props.drumsPatterns[i]} pbCol={this.props.pbCol}/>
              })}
      </div>
    )
  }



}
