import React, { Component } from 'react';

const colorMarked = {
    backgroundColor: 'red'
}
const colorUnmarked = {
    backgroundColor: 'grey'
}


class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {marked: false};
        this.onClick = this.onClick.bind(this);

    } 
    render() { 
        const markedDiv = <div onClick={this.onClick} className="cell" style={colorMarked}>{this.props.i + 1}</div>;
        const unmarkedDiv = <div onClick={this.onClick} className="cell" style={colorUnmarked}></div>;
        
        return this.state.marked ? markedDiv : unmarkedDiv;
               
    }
    onClick(e) {
        this.props.onClick(this.props.i);
        this.setState({marked: !this.state.marked});
    }
}
 
export default Cell;