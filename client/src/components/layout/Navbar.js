import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Navbar extends Component {

    state = {
        display : false 
    }

   showLoginDiv = e => {
    e.preventDefault();
    console.log("clicked");
    this.setState({ display: true });


   }

   showRegDiv = e => {
    e.preventDefault();
    this.setState({ display: true });


   }

    render() {
        return (
            <div className="navbar-fixed navbar">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link to="/" className="col s5 brand-logo center black-text" style={{ fontFamily: "monospace" }}>
                              ShortCutz 8&lt;
                        </Link>
                        <div onClick={this.showRegDiv} className="btn btn-large right btn-flat waves-effect regbtn">
                                Register
                        </div>

                        <div onClick={this.showLoginDiv} className="btn btn-large right btn-flat waves-effect loginbtn">
                                Login
                            
                        

                    </div>
                    </div>
                    <div className={this.state.display ? "loginDD": "hidediv loginDD"}>
                    <div className="row">
                        <div className="col s12"><p className={this.state.display ? "xbtn": "hidediv xbtn"}>&#10006;</p></div>


                    </div>
                        <div className="row">
                            <div className="col s6 userlogin"><Link to={{
                                pathname:"/login",
                                state: {barber:false} }}>Login as User    &rarr;</Link><p className="ulp">Browse a list of barber near you for a quick haircut or plan a future appointment.</p> </div>
                            <div className="col s6 barberlogin"><Link to={{
                                pathname:"/login",
                                state: {barber:true} }}> &#9986; Login as Barber     &rarr;</Link><p className="blp">Manage your schedule, portfolio and preferences on your personnal profile page.</p> </div>

                        </div>
                        </div>
                    <div className="registerDD">
                        <div className="row">
                            <div className="col s6 userreg"><Link to="/register">Register as User    &rarr;</Link><p className="urp">Browse a list of barber near you for a quick haircut or plan a future appointment.</p> </div>
                            <div className="col s6 barberreg"><Link to="/registerb">Register as Barber     &rarr;</Link><p className="brp">Manage your schedule, portfolio and preferences on your personnal profile page.</p> </div>

                        </div>
                        </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;