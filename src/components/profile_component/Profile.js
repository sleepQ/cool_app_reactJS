import React, { Component } from 'react';
import FileUpload from '../../shared_components/file_upload_component/FileUpload';
import { uploadUserImage } from './profile_endpoints';
import defaultUser from '../../css/images/default-user.svg';

class Profile extends Component {

    render() {
        const { setUser } = this.props;
        const { username, email, imageUrl } = this.props.user || {};
        const userImg = imageUrl || defaultUser;

        return (
            <div className="container">
                <div className="jumbotron col">
                    <h1 className="text-center">PROFILE</h1>
                    <div className="col-sm-8 mx-auto">
                        <img
                            className="default-profile-user"
                            src={userImg}
                            onError={e => {
                                e.target.onerror = null;
                                e.target.src = defaultUser;
                            }}
                        />

                        {username && <div>Username: <span className="text-primary h6">{username}</span></div>}
                        {email && <div>Email: <span className="text-primary h6">{email}</span></div>}
                    </div>

                    <div className="col-sm-8 mx-auto">
                        <FileUpload
                            id="user-image"
                            upload={uploadUserImage}
                            setUser={setUser}
                            label="Upload image"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;
