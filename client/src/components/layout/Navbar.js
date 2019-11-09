import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Navbar extends Component {

    state = {
        displayLogin : false,
        displayRegister : false  
    }

   showLoginDiv = e => {
    e.preventDefault();
    console.log("clicked");
    this.setState({ displayLogin: true, displayRegister : false });


   }
   hideLoginDiv = e => {
       e.preventDefault();
       console.log("clicked");
       this.setState({ displayLogin: false,  displayRegister: false });

   }

   showRegDiv = e => {
    e.preventDefault();
    this.setState({ displayRegister: true, displayLogin : false });


   }
   hideRegDiv = e => {
    e.preventDefault();
    console.log("clicked");
    this.setState({ displayRegister: false,  displayLogin: false });

}

    render() {
        return (
            <div className="navbar-fixed navbar">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link to="/" onClick={this.hideRegDiv} className="col s5 brand-logo center black-text" style={{ fontFamily: "monospace" }}>
                              ShortCutz 8&lt;
                        </Link>
                        <div onClick={this.showRegDiv} className="btn btn-large right btn-flat waves-effect regbtn">
                                Register
                        </div>

                        <div onClick={this.showLoginDiv} className="btn btn-large right btn-flat waves-effect loginbtn">
                                Login
                            
                        

                    </div>
                    </div>
                    <div className={this.state.displayLogin ? "loginDD": "hidediv loginDD"}>
                    <div className="row">
                        <div className="col s12"><p onClick={this.hideLoginDiv} className={this.state.displayLogin ? "xbtn": "hidediv xbtn"}>&#10006;</p></div>
                    </div>
                        <div className="row">
                            <div onClick={this.hideLoginDiv} className="col s6 userlogin"><Link to="/login"><i className='fas fa-user' style={{fontSize:"24px"}}></i> Login as User    &rarr;</Link><p className="ulp">Browse a list of barber near you for a quick haircut or plan a future appointment.</p> </div>
                            <div onClick={this.hideLoginDiv} className="col s6 barberlogin"><Link to="/loginb"> &#9986; Login as Barber     &rarr;</Link><p className="blp">Manage your schedule, portfolio and preferences on your personnal profile page.</p> </div>

                        </div>
                        </div>
                    <div className={this.state.displayRegister ? "registerDD": "hidediv registerDD"}>
                    <div className="row">
                        <div className="col s12"><p onClick={this.hideRegDiv} className={this.state.displayRegister ? "xbtn": "hidediv xbtn"}>&#10006;</p></div>
                    </div>
                        <div className="row">
                            <div onClick={this.hideRegDiv} className="col s6 userreg"><Link to="/register"><i className='fas fa-user' style={{fontSize:"24px"}}></i> Register as User    &rarr;</Link><p className="urp">Browse a list of barber near you for a quick haircut or plan a future appointment.</p> </div>
                            <div onClick={this.hideRegDiv} className="col s6 barberreg"><Link to="/registerb">&#9986; Register as Barber     &rarr;</Link><p className="brp">Manage your schedule, portfolio and preferences on your personnal profile page.</p> </div>

                        </div>
                        </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;