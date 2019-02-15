import React, { Component } from 'react';
import { register } from './register_endpoints';
import { urlTo } from '../../utils/helper_functions';
import ErrorMessage from '../../shared_components/ErrorMessage';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            showPass: false,
            clickedRegister: false,
            error: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showPassword = this.showPassword.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    showPassword() {
        this.setState(prevState => ({ showPass: !prevState.showPass }));
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState(() => ({ clickedRegister: true }));

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        register(user).then(res => {
            if (res.ok) {
                this.setState(() => ({ error: '', clickedRegister: false }));
                this.props.history.push(urlTo('login'));
            } else {
                const { message } = res.error || {};
                this.setState(() => ({ error: message, clickedRegister: false }));
            }
        });
    }

    render() {
        const { username, email, password, showPass, error, clickedRegister } = this.state;

        return (
            <div className="container">
                <div className="jumbotron row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Create a new account</h1>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="control-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        className="form-control"
                                        name="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                    <span className="input-group-text btn" name="showPass" onClick={this.showPassword}>
                                        {showPass
                                            ? <i className="eye-slash" />
                                            : <i className="eye" />
                                        }
                                    </span>
                                </div>
                            </div>

                            <ErrorMessage error={error} />

                            <button disabled={clickedRegister} type="submit" className="btn btn-lg btn-primary btn-block">
                                Register {clickedRegister && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
