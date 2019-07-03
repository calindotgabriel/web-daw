import React, { Component } from 'react';

import classNames from "classnames";

let log = console.log;

let colorStyle = (color, hit) => {
    if (!color) return {}
    if (hit) return { 'backgroundColor': color };
    return {}
}

class Box extends Component  {
    constructor(props) {
        super(props);
        this.onToggle = this.onToggle.bind(this);
    } 
    render() {
        return (
        <div onClick={this.onToggle} 
        className={classNames('cell is-pulled-left', 
          { 'hit' : this.props.hit },
          { 'viewing' : this.props.pbCol == this.props.i, 
          'underlined': this.props.i % 4 == 0  })}
            style={colorStyle(this.props.color, this.props.hit)}>
            {this.props.hit ? this.props.i + 1 : ''}
        </div>)
        ;
               
    }
    onToggle() {
        this.props.onToggle(this.props.i);
    }
}
 
export default Box;