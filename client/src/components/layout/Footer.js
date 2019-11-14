import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Footer extends Component {
    state = {
        online: false,
        bgColor: ""
    }

    goOnline = e =>{
        if(!this.state.online){
            this.setState({
                online: true,
                bgColor: "green"
            });
        } else {
            this.setState({
                online: false,
                bgColor: "white"
            });
        }
    }
    render(){
        return(
            <div className="goDiv btn-flat waves-effect" style={{backgroundColor: this.state.bgColor}} onClick={this.goOnline}>
                {this.state.online ? "Go Offline" : "Go Online"}
            </div>
        );
    }
}

export default Footer;