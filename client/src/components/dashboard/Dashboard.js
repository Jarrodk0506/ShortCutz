import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import API from "../../utils/API"
import Footer from "../layout/Footer"
import { List, ListItem } from "../List";
import './style.css';

class Dashboard extends Component {
    state = {
        foundUsers: [],
        online: false,
        barber: false
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    componentDidMount() {
        this.setState({
            barber: this.props.location.state.barber
        });
        this.getUser();
    };

    getUser = () => {
        API.getUsers()
            .then(data => {
                this.setState({
                    foundUsers: data.data
                })
            })
    }

    render() {
        const { user } = this.props.auth;

        return (
            <div>
            {!this.state.barber ? (
            <div className="container valign-wrapper textdiv" style={{ height: "75vh" }}>
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        <b>Welcome,</b> {user.name.split(" ")[0]}
                        {/* <p className="flow-text grey-text text-darken-1">
                           {this.state.barber ? "Go online?" : "Barbers Near You"}
                        </p> */}
                        
                        <List>
                            {this.state.foundUsers.map(user => (
                                <ListItem key={user._id}>
                                    <strong>
                                        {user.name} {" "} <span style={{ fontFamily: "monospace" }}>is online</span> 
                                    </strong>
                                </ListItem>
                            ))}
                        </List>
                    </h4>
                    <button className="btn btn-large waves-effect waves-light hoverable" style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        backgroundColor: "#6E3A2E"
                    }} onClick={this.onLogoutClick}>
                        Logout
                    </button>
                </div>
            </div>
        </div>) : (    
        <div className="barberDiv">
            <div className="container">
                <div className="row">
                    <div className="col s4 profileDiv">
                    <b className="profileName">Welcome,</b> {user.name.split(" ")[0]}
                    <br/>
                    <img className="profileImg" src="http://tdi.auk.org/wp-content/uploads/2018/08/no-photo-man.png" alt="profile picture"></img>
                    <p className="profileAbout"><b>About Me:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p> 
                    <p className="profileAbout"><b>Styles &amp; Preferences:</b> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                    <button className="btn btn-small waves-effect waves-light hoverable" style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        backgroundColor: "#6E3A2E",
                        marginBottom: "20px",
                        
                    }} onClick={this.onLogoutClick}>
                        Logout
                    </button> 
                         </div>
                          <div className="col s2"></div>
                    <div className="col s5 portfolioDiv">
                    <b className="portfolioName">My Portfolio:</b>
                    <br/>
                    <img className="portfolioImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Y7nYgQz1fLTf2Hk7ErczVATZsyhoqt_4NDGVLjYXjSbNqw5qXg&s" alt="profile picture"></img>
                    <img className="portfolioImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRed_WZVXkDONi0Q5X8tPEFR2LURZJlqLm2ky6wlBYHWQkgTfdOgg&s" alt="profile picture"></img>
                    <img className="portfolioImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qcJkr_1VRs0Z2dQPZh3sGzrwutYS6Zftydcsorcf-prQp3DNXg&s" alt="profile picture"></img>
                    <img className="portfolioImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YeiUrsN4L4hHci4cNiYDUbjsawb6k0tL88oomOna5EtNaFi9&s" alt="profile picture"></img>
                    <img className="portfolioImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5fEALZExRyQw8ZirYhnN8lDIBbXEbmSsIu4D6vOcY7PeOqmw_KA&s" alt="profile picture"></img>
                    <img className="portfolioImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyj3Ox4QgoKA2QmretK9Vjz4hUP_u9qr5oSeE45cwvU54Mtk_B&s"></img>

                    </div>
                    </div>
                <div className="row">
                    <div className="col s12">
                     <Footer>    
                    </Footer>
                    </div>
                </div>
            </div>
            </div>
            )}
                
            
        
             </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logoutUser })(Dashboard);