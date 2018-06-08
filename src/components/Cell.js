import React, { Component } from 'react';

let styleToggled = {
    // backgroundColor: 'red'
}
let styleUntoggled = {
    // backgroundColor: 'grey'
}
let log = console.log;

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {marked: false};
        this.onToggle = this.onToggle.bind(this);
    } 
    render() {  // onToggle
        const markedCell = <div onClick={this.onToggle} className="cell hit" 
            style={styleToggled}>{this.props.i + 1}</div>;
        const unmarkedCell = <div onClick={this.onToggle} className="cell" 
            style={styleUntoggled}></div>;
        return this.state.marked ? markedCell : unmarkedCell
               
    }
    onToggle(e) {
        this.props.onToggle(this.props.i);
        this.setState({marked: !this.state.marked});
    }
}
 
export default Cell;