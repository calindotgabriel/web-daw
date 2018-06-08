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
        this.state = {hit: false, viewing: false};
        this.onToggle = this.onToggle.bind(this);
        // this.index = this.i
    } 
    render() {  // onToggle
        const hitCell = <div onClick={this.onToggle} className="cell hit" 
            style={styleToggled}>{this.props.i + 1}</div>;
        const unhitCell = <div onClick={this.onToggle} className="cell" 
            style={styleUntoggled}></div>;
        return this.state.hit ? hitCell : unhitCell
               
    }
    onToggle(e) {
        this.props.onToggle(this.props.i);
        this.setState({hit: !this.state.hit});
    }
}
 
export default Cell;