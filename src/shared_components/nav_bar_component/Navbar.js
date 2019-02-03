import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { urlTo } from '../../utils/helper_functions';
import UserNavToggler from '../user_nav_toggler_component/UserNavToggler';
import { isUserLoggedIn } from '../RouteUtil';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    logOut(e) {
        // e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }

    render() {

        const loginRegLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink to={urlTo('login')} className="nav-link navbar-brand nav-hover">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={urlTo('register')} className="nav-link navbar-brand nav-hover">
                        Register
                    </NavLink>
                </li>
            </ul>
        );

        const user = isUserLoggedIn();

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                ><span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link navbar-brand nav-hover">
                                Home
                            </NavLink>
                        </li>
                    </ul>

                    {user.isLoggedIn
                        ? <UserNavToggler user={user} logOut={this.logOut} {...this.props} />
                        : loginRegLink
                    }

                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);