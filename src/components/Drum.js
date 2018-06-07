import React, { Component } from 'react'
import Cell from './Cell'

import { sequence } from './../constants'

import { drums } from "./StepSequencer";

function drumByName(name) {
    return drums.find(d => d.name == name)
}

export class Drum extends Component {
    constructor(props) {
        super(props);        
        this.onClickCell = this.onClickCell.bind(this);
    }

  render() {
    return (
      <div className="row">
          <div className="col-lg-2">
              {this.props.name}
        </div>
        <div className="col-lg-10 boxes">
        {sequence.map((step, i) => { 
            return <Cell i={i} key={i} onClick={this.onClickCell}></Cell>
            })}
        </div>
      </div>
    )
  }


  onClickCell(colIndex) {
    // log("colndex:", colIndex)
    // debugger;
    let drum = drumByName(this.props.name).pattern;
    drum[colIndex] = !drum[colIndex];
    // log(kick)
}
}

export default Drum
