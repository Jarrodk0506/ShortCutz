import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';
import './style.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            barber: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                barber: this.props.location.state.barber
            });
        }
        if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.auth.isAuthenticated) this.props.history.push("/dashboard");
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        // console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container textdiv">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                {this.state.barber ? "Barber" : "User"} <b>Register</b>
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login" style={{ color: "#6E3A2E" }}>Login</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.name} error={errors.name} name="name" type="text" className={classnames("", { invalid: errors.name })} />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.email} error={errors.email} name="email" type="email" className={classnames("", { invalid: errors.email })} />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.password} error={errors.password} name="password" type="password" className={classnames("", { invalid: errors.password })} />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.password2} error={errors.password2} name="password2" type="password" className={classnames("", { invalid: errors.password2 })} />
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{errors.password2}</span>
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
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));