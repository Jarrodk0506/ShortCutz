import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed navbar">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link to="/" className="col s5 brand-logo center black-text" style={{ fontFamily: "monospace" }}>
                            <i className="material-icons">code</i> ShortCutz
                        </Link>
                        <Link to="/register" className="btn btn-large right btn-flat waves-effect white black-text">
                                Register
                        </Link>
                        <Link to="/login" className="btn btn-large right btn-flat waves-effect white black-text">
                                Login
                            </Link>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;