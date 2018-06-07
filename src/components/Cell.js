import React, { Component } from 'react';

let styleToggled = {
    backgroundColor: 'red'
}
let styleUntoggled = {
    backgroundColor: 'grey'
}
let log = console.log;

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {marked: false};
        this.onClick = this.onClick.bind(this);
        this.style = {backgroundColor: 'grey'}
        log('ctor Cell ', this.props.i)
        // if (this.props.i % 4) {
        //     styleToggled.marginLeft = '2em'
        //     styleUntoggled.marginLeft = '2em'
        // }
    } 
    componentWillMount() {
        log('compWillMount Cell')
        
    }
    render() {  // onToggle
        const markedCell = <div onClick={this.onClick} className="cell" 
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