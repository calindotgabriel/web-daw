import React, { Component } from 'react';

let log = console.log;

class Box extends Component {
    constructor(props) {
        super(props);
        // this.state = {hit: false, viewing: false}; 
        // this.props.active   
        this.onToggle = this.onToggle.bind(this);
        // this.index = this.i
    } 
    render() {  // onToggle
        log('box ', this.props.i, 'active: ', this.props.active)
        const hitBox = <div onClick={this.onToggle} className="cell hit">
            {this.props.i + 1}</div>;
        const unhitBox = <div onClick={this.onToggle} className="cell"></div>;
        return this.props.active ? hitBox : unhitBox
               
    }
    onToggle(e) {
        this.props.onToggle(this.props.i);
        // this.setState({hit: !this.state.hit});
    }
}
 
export default Box;