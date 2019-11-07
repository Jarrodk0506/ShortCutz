import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import API from "../../utils/API"
import { List, ListItem } from "../List";
import './style.css';

class Dashboard extends Component {
    state = {
        foundUsers: []
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    componentDidMount() {
        this.getUser();
    };

    getUser = () => {
        API.getUsers()
            .then(data => {
                console.log(data);
                this.setState({
                    foundUsers: data.data
                })
            })
    }

    render() {
        const { user } = this.props.auth;

        return (
            <div className="container valign-wrapper textdiv" style={{ height: "75vh" }}>
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Welcome,</b> {user.name.split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                You are logged into a full-stack{" "} <span style={{ fontFamily: "monospace" }}>MERN</span> app
                            </p>
                            <List>
                                {this.state.foundUsers.map(user => (
                                    <ListItem key={user._id}>
                                        <strong>
                                            {user.name} 
                                        </strong>
                                    </ListItem>
                                ))}
                            </List>
                        </h4>
                        <button className="btn btn-large waves-effect waves-light hoverable blue accent-3" style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }} onClick={this.onLogoutClick}>
                            Logout
                        </button>
                    </div>
                </div>
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