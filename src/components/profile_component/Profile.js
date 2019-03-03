import React, { Component } from 'react';
import defaultUser from '../../css/images/default-user.svg';

class Profile extends Component {

    render() {
        const { username, email } = this.props.user || {};

        return (
            <div className="container">
                <div className="jumbotron col">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>

                    <div className="col-sm-8 mx-auto">
                        <img className="default-profile-user" src={defaultUser} alt="User" />
                    </div>
                    <div className="col-sm-8 mx-auto">
                        {username && <div>Username: <span className="text-primary h6">{username}</span></div>}

                        {email && <div>Email: <span className="text-primary h6">{email}</span></div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;
