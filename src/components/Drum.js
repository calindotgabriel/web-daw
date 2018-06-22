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
      <div className="row">
          <div className="col-lg-1 drum-label">
              {this.props.name}
        </div>
        <div className="col-lg-11 boxes">
        {Array(16).fill(0).map((j, i) => { 
            return <Box i={i} key={i} onToggle={this.onToggleBox} 
                        hit={this.props.pattern[i]} 
                        color={this.props.color}
                        pbCol={this.props.pbCol}></Box>
            })}
        </div>
      </div>
    )
  }

  onToggleBox(rowIndex) {
      this.props.onHit(this.props.i, rowIndex)
    }

    shouldComponentUpdate() {
      // if (this.props.pbCol == this.props.i) return true;
      // if (this.props.hit) return true;
      // return false;
      return true;
  }
}

export default Drum
