import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Landing extends Component {
    render() {
        return (
            <div className="container valign-wrapper" style={{ height: "75vh" }}>
                <div className="row">
                    <div className="col s12 center-align textdiv">
                        <h4>
                           Welcome to ShortCutz 
                        </h4>
                        <p className="flow-text grey-text text-darken-1">
                           hair cut appointments the simple way
                        </p>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;