import React, { Component } from 'react';
import { login } from './login_endpoints';
import ErrorMessage from '../../shared_components/ErrorMessage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            clickedLogin: false,
            error: ''
        };
        this.controller = new AbortController();

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillUnmount() {
        this.controller.abort();
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState(() => ({ clickedLogin: true }));

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user, this.controller.signal).then(res => {
            if (res.ok) {
                this.props.getUser();
            } else {
                const { message, name } = res.error || {};
                if (name === 'AbortError') return;
                this.setState(() => ({ error: message, clickedLogin: false }));
            }
        })
    }

    render() {
        const { email, password, error, clickedLogin } = this.state;

        return (
            <div className="container">
                <div className="jumbotron row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    disabled={clickedLogin}
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    disabled={clickedLogin}
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={this.onChange}
                                />
                            </div>

                            <ErrorMessage error={error} />

                            <button disabled={clickedLogin} type="submit" className="btn btn-lg btn-primary btn-block">
                                Sign in {clickedLogin && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
