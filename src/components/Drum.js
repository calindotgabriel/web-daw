import React, { Component } from 'react'
import Cell from './Cell'

let log = console.log;


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
        {Array(16).fill(0).map((step, j) => { 
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
