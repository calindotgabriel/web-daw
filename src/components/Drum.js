import React, { Component } from 'react'
import Cell from './Cell'

import { sequence } from './../constants'

import { drums } from "./StepSequencer";

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
            return <Cell i={i}  onClick={this.onClickCell}></Cell>
            })}
        </div>
      </div>
    )
  }


  onClickCell(colIndex) {
    // log("colndex:", colIndex)
    // debugger;
    let kick = drums[0].pattern;
    kick[colIndex] = !kick[colIndex];
    // log(kick)
}
}

export default Drum
