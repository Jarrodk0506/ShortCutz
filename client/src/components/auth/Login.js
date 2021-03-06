import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import './style.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            barber: "",
            online: false,
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                barber: this.props.location.state.barber
            });
        }
        if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard"); //update history.push to include state thats barber status
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.auth.user);
        if (nextProps.auth.isAuthenticated && nextProps.auth.user.barber) {
            this.props.history.push({
                pathname: "/dashboard",
                state: {
                    barber: true
                }
            });
        } else if (nextProps.auth.isAuthenticated && !nextProps.auth.user.barber) {
            this.props.history.push({
                pathname: "/dashboard",
                state: {
                    barber: false
                }
            });
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
            barber: this.state.barber
        };

        // console.log(userData);
        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container textdiv">
                <div className="row" style={{ marginTop: "4rem" }}>
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                {this.state.barber ? "Barber" : "User"} <b>Login</b>
                            </h4>
                            <p className="text-darken-1">
                                Don't have an account? <Link to="/register" style={{ color: "#6E3A2E" }}>Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.email} error={errors.email} name="email" type="email" className={classnames("", { invalid: errors.email || errors.emailnotfound })} />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.password} error={errors.password} name="password" type="password" className={classnames("", { invalid: errors.password || errors.passwordincorrect })} />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button className="btn btn-large waves-effect waves-light hoverable" style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    marginBottom: "1rem",
                                    backgroundColor: "#6E3A2E"
                                }} type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);