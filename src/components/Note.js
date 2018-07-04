import React, { Component } from 'react'
import Box from './Box'

let log = console.log;


export class Note extends Component {
    constructor(props) {
        super(props);        
        this.onToggleBox = this.onToggleBox.bind(this);
    }

  render() {
    return (
      <div className="row">
          <div className="col-lg-1 ">
              {this.props.note}
        </div>
        <div className="col-lg-11 boxes">
        {Array(8).fill(0).map((j, i) => { 
            // return <
            return <Box i={i} onToggle={this.onToggleBox} 
              pbCol={this.props.pbCol}
              hit={this.props.pattern[i]} 
              ></Box>
            })}
        </div>
      </div>
    )
  }

  onToggleBox(rowIndex) {
    this.props.onNote(this.props.i, rowIndex)
  }

}

export default Note
