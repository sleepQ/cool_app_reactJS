import React, { Component } from 'react';

class Profile extends Component {

    render () {
        const { username, email } = this.props.user || {};

        return (
            <div className="container">
                <div className="jumbotron">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>

                    <div className="col-md-6 mx-auto">
                        {username && <div>Username: <span className="text-info h6">{username}</span></div>}

                        {email && <div>Email: <span className="text-info h6">{email}</span></div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;
