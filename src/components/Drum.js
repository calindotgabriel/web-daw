import React, { Component } from 'react'
import Box from './Box'

let log = console.log;

export class Drum extends Component {
    constructor(props) {
        super(props);        
        this.onToggleBox = this.onToggleBox.bind(this);
    }

  render() {
    return (
      <div className="drum columns is-mobile">
          <div className="drum-label column is-1">
              <span>{this.props.name}</span>
        </div>
        <div className="boxes column">
        {Array(16).fill(0).map((j, i) => { 
            return <Box i={i} key={i} 
                      onToggle={this.onToggleBox} 
                      hit={this.props.pattern[i]} 
                      color={this.props.color}
                      pbCol={this.props.pbCol}>
                    </Box>
            })}
        </div>
      </div>
    )
  }

  onToggleBox(rowIndex) {
      this.props.onHit(this.props.i, rowIndex)
  }
}

export default Drum
