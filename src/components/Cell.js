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
        this.onClick = this.onClick.bind(this);
    } 
    render() {  // onToggle
        const markedCell = <div onClick={this.onClick} className="cell active" 
            style={styleToggled}>{this.props.i + 1}</div>;
        const unmarkedCell = <div onClick={this.onClick} className="cell" 
            style={styleUntoggled}></div>;
        return this.state.marked ? markedCell : unmarkedCell
               
    }
    onClick(e) {
        log('onclick Cell')
        this.props.onClick(this.props.i);
        this.setState({marked: !this.state.marked});
    }
}
 
export default Cell;