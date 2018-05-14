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
        return <div onClick={this.onClick} className="cell"
                style={this.state.marked ? colorMarked : colorUnmarked}></div>
    }
    onClick(e) {
        this.props.onClick(this.props.i);
        this.setState({marked: !this.state.marked});
    }
}
 
export default Cell;