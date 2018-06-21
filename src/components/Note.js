import React, { Component } from 'react'
import Box from './Box'

let log = console.log;


export class Note extends Component {
    constructor(props) {
        super(props);        
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
            return <Box i={i}></Box>
            })}
        </div>
      </div>
    )
  }
}

export default Note
