import React, { Component } from 'react'
import Cell from './Cell'

import { sequence } from './../constants'

import { drums } from "./StepSequencer";

let log = console.log;

function drumByName(name) {
    return drums.find(d => d.name == name)
}

export class Drum extends Component {
    constructor(props) {
        super(props);        
        this.onToggleCell = this.onToggleCell.bind(this);
    }

  render() {
    return (
      <div className="row">
          <div className="col-lg-1 drum-label">
              {this.props.name}
        </div>
        <div className="col-lg-11 boxes">
        {sequence.map((step, j) => { 
            return <Cell i={j} key={j} onToggle={this.onToggleCell}></Cell>
            })}
        </div>
      </div>
    )
  }


  onToggleCell(rowIndex) {
      this.props.onHit(this.props.i, rowIndex)
    }
}

export default Drum
