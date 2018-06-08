import React, { Component } from 'react'
import Cell from './Cell'

let log = console.log;


export class Drum extends Component {
    constructor(props) {
        super(props);        
        this.onToggleCell = this.onToggleCell.bind(this);
        this.onViewing = () => { }
    }

  render() {
    return (
      <div className="row">
          <div className="col-lg-1 drum-label">
              {this.props.name}
        </div>
        <div className="col-lg-11 boxes">
        {Array(16).fill(0).map((j, step) => { 
            // debugger;
            return <Cell i={step} key={step} onToggle={this.onToggleCell} onViewing={this.onViewing}></Cell>
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
