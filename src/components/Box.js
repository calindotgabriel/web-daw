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
    render() {  // onToggle
        // log('box ', this.props.i, 'active: ', this.props.active)
        // let pbClass = this.props.pbCol == this.props.i ? 'viewing' : '';
        // let hitClass = `cell hit ${pbClass}`
        // let unhitClass = `cell ${pbClass}`
        // const hitBox = <div onClick={this.onToggle} style={colorStyle(this.props.color)} className={hitClass}>
        //     {this.props.i + 1}</div>;
        // const unhitBox = <div onClick={this.onToggle} className={unhitClass}></div>;
        // return this.props.active ? hitBox : unhitBox

        // let cell = <div className="cell"></div>;
        let cell = <div onClick={this.onToggle}
            className={classNames('cell', 
            {'hit' : this.props.hit},
            {'viewing' : this.props.pbCol == this.props.i}
            )}
            style={colorStyle(this.props.color, this.props.hit)}>
            {this.props.hit ? this.props.i + 1 : ''}
            </div>;
        return cell;
               
    }
    onToggle(e) {
        this.props.onToggle(this.props.i);
    }
    shouldComponentUpdate() {
        // if (this.props.hit) return true;
        // return false;
        return true;
    }
}
 
export default Box;