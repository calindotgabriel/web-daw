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
      <div className="columns is-mobile">
          <div className="column is-2">
              {this.props.note}
        </div>
        <div className="column is-10">
        {Array(16).fill(0).map((j, i) => { 
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
