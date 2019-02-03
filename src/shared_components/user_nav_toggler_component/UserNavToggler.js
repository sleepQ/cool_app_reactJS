
import React, { Component } from 'react';
import { urlTo, navUserName } from '../../utils/helper_functions';
import defaultUser from '../../css/images/default-user.svg';

class UserNavToggler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserOptions: false,
        };
        this.userOptionsRef = React.createRef();

        this.toggleUserNav = this.toggleUserNav.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside(e) {
        const clickedOutside = this.userOptionsRef.current && !this.userOptionsRef.current.contains(e.target);

        if (clickedOutside && this.state.showUserOptions) {
            this.toggleUserNav();
        }
    }

    toggleUserNav() {
        this.setState(prevState => ({ showUserOptions: !prevState.showUserOptions }));
    }

    render() {
        const { showUserOptions } = this.state;
        const { logOut, history, user = {} } = this.props;

        const userProfile = (<div className="nav-link">Profile</div>);
        const userMovies = (<div className="nav-link">Movies</div>);
        const userLogout = (<div className="nav-link">Logout</div>);

        return (
            <ul className="navbar-nav ml-auto" ref={this.userOptionsRef}>
                <li className="nav-item">
                    <button className="nav-link navbar-brand d-flex w-180p border-0" onClick={this.toggleUserNav}>
                        <img className="default-user" src={defaultUser} alt="User" />
                        <span className="text-white ml-2">{navUserName(user.username)}</span>
                    </button>

                    {showUserOptions && <div className="user-dropdown-menu">
                        <button
                            className="dropdown-item nav-hover"
                            onClick={() => {
                                history.push(urlTo('profile'));
                                this.toggleUserNav();
                            }}>{userProfile}</button>

                        <button
                            className="dropdown-item nav-hover"
                            onClick={() => {
                                history.push(urlTo('movies'));
                                this.toggleUserNav();
                            }}>{userMovies}</button>

                        <button className="dropdown-item nav-hover" onClick={logOut}>{userLogout}</button>
                    </div>}
                </li>
            </ul>
        );
    }
}

export default UserNavToggler;
