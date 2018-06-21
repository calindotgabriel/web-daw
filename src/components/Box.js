import React, { Component } from 'react';

let log = console.log;

let colorStyle = (color) => {
    if (!color) return {}
    return { 'backgroundColor': color };
}

class Box extends Component {
    constructor(props) {
        super(props);
        this.onToggle = this.onToggle.bind(this);
    } 
    render() {  // onToggle
        // log('box ', this.props.i, 'active: ', this.props.active)
        let pbClass = this.props.pbCol == this.props.i ? 'viewing' : '';
        let hitClass = `cell hit ${pbClass}`
        let unhitClass = `cell ${pbClass}`
        const hitBox = <div onClick={this.onToggle} style={colorStyle(this.props.color)} className={hitClass}>
            {this.props.i + 1}</div>;
        const unhitBox = <div onClick={this.onToggle} className={unhitClass}></div>;
        return this.props.active ? hitBox : unhitBox
               
    }
    onToggle(e) {
        this.props.onToggle(this.props.i);
    }
}
 
export default Box;