import React, { Component } from 'react'

import Note from './Note'

let log = console.log;

export const majorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

export default class LeadBox extends Component {
   
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div>
          {majorScale.map((n, i) => {
                  return <Note note={n} key={i} i={i}
                               pbCol={this.props.pbCol}
                               onNote={this.props.onNote}
                               pattern={this.props.notesPatterns[i]}
                  />
                })}
      </div>
    )
  }




}
