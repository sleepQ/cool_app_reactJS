import React, { Component } from 'react';
import { login } from './login_endpoints';
import { urlTo } from '../../utils/helper_functions';
import ErrorMessage from '../../shared_components/ErrorMessage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange (e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSubmit (e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res.ok) {
                this.props.history.push(urlTo('profile'));
            } else {
                const { message } = res.error || {};
                this.setState(() => ({ error: message }));
            }
        })
    }

    render () {
        const { email, password, error } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={this.onChange}
                                />
                            </div>

                            <ErrorMessage error={error} />

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
