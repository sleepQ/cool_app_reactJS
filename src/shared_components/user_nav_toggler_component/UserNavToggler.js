
import React, { Component } from 'react';
import { urlTo, shortenUsername } from '../../utils/helper_functions';
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
        const userImg = user.imageUrl || defaultUser;

        const userIcon = showUserOptions ? <i className="fa fa-angle-up" /> : <i className="fa fa-angle-down" />;

        return (
            <ul className="navbar-nav ml-auto" ref={this.userOptionsRef}>
                <li>
                    <button type="button" className="navbar-brand d-flex w-200 border-0 bg-secondary cursor-pointer" onClick={this.toggleUserNav}>
                        <img
                            className="default-user"
                            src={userImg}
                            alt=""
                            onError={e => {
                                e.target.onerror = null;
                                e.target.src = defaultUser;
                            }}
                        />
                        <span className="text-white ml-2">{shortenUsername(user.username)}</span>
                        <span className="ml-auto">{userIcon}</span>
                    </button>

                    {showUserOptions && <div className="user-dropdown-menu bg-secondary w-200">
                        <button
                            type="button"
                            className="dropdown-item nav-hover py-3"
                            onClick={() => {
                                history.push(urlTo('users', { username: user.username }));
                                this.toggleUserNav();
                            }}
                        >
                            <span className="ml-auto"><i className="fa fa-address-book-o" /></span>
                            <span className="text-white px-2">Profile</span>
                        </button>

                        <button
                            type="button"
                            className="dropdown-item nav-hover py-3"
                            onClick={() => {
                                history.push(urlTo('movies'));
                                this.toggleUserNav();
                            }}
                        >
                            <span className="ml-auto"><i className="fa fa-film" /></span>
                            <span className="text-white px-2">Movies</span>
                        </button>

                        <button
                            type="button"
                            className="dropdown-item nav-hover py-3"
                            onClick={() => {
                                logOut();
                                this.toggleUserNav();
                            }}
                        >
                            <span className="ml-auto"><i className="fa fa-sign-out" /></span>
                            <span className="text-white px-2">Logout</span>
                        </button>
                    </div>}
                </li>
            </ul>
        );
    }
}

export default UserNavToggler;
