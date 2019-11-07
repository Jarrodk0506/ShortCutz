import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Navbar extends Component {

    state = {
        display : 0 
    }

   showDiv = e => {
    e.preventDefault();


   }

    render() {
        return (
            <div className="navbar-fixed navbar">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link to="/" className="col s5 brand-logo center black-text" style={{ fontFamily: "monospace" }}>
                              ShortCutz 8&lt;
                        </Link>
                        <Link to="/register" className="btn btn-large right btn-flat waves-effect white black-text regbtn">
                                Register
                        </Link>

                        <div onClick={this.showDiv} className="btn btn-large right btn-flat waves-effect white black-text loginbtn">
                                Login
                            
                        

                    </div>
                    </div>
                    <div className="loginDD">
                        <div className="row">
                            <div className="col s6 userlogin"><Link to="/login">Login as User</Link> </div>
                            <div className="col s6 barberlogin"><Link to="/loginb">Login as Barber</Link> </div>

                        </div>
                        </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;