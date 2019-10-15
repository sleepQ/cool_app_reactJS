import React from 'react';
import FileUpload from '../../shared_components/file_upload_component/FileUpload';
import { uploadUserImage, fetchStranger } from './profile_endpoints';
import defaultUser from '../../css/images/default-user.svg';

class Stranger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stranger: {},
            error: ''
        };

        this.getStranger = this.getStranger.bind(this);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        const { username } = this.props;
        this.getStranger(username);
    }

    getStranger(username) {
        fetchStranger(username).then(res => {
            if (this.mounted) {
                if (res.ok) {
                    this.setState(() => ({ stranger: res.stranger, error: '' }));
                } else {
                    const { message } = res.error || {};
                    this.setState(() => ({ stranger: {}, error: message }));
                }
            }
        });
    }

    render() {
        const { stranger, error } = this.state;
        const userImg = stranger.imageUrl || defaultUser;

        if (!stranger.username) {
            return <h1 className="text-center">{error}</h1>
        }

        return (
            <div className="container">
                <div className="jumbotron col">
                    <h1 className="text-center">STRANGER</h1>
                    <div className="col-sm-8 mx-auto">
                        <img
                            className="default-profile-user"
                            src={userImg}
                            alt=""
                            onError={e => {
                                e.target.onerror = null;
                                e.target.src = defaultUser;
                            }}
                        />

                        <div>Username: <span className="text-primary h6">{stranger.username}</span></div>
                    </div>

                    <div className="row-sm-8 mx-auto">
                        <button type="button">Message</button>
                    </div>

                </div>
            </div>
        );
    }
};

const MyProfile = ({ user, setUser }) => {
    const { username, email, imageUrl } = user || {};
    const userImg = imageUrl || defaultUser;

    if (!username) {
        return null;
    }

    return (
        <div className="container">
            <div className="jumbotron col">
                <h1 className="text-center">PROFILE</h1>
                <div className="col-sm-8 mx-auto">
                    <img
                        className="default-profile-user"
                        src={userImg}
                        alt=""
                        onError={e => {
                            e.target.onerror = null;
                            e.target.src = defaultUser;
                        }}
                    />

                    <div>Username: <span className="text-primary h6">{username}</span></div>
                    <div>Email: <span className="text-primary h6">{email}</span></div>
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
    );
};

class Profile extends React.Component {

    render() {
        const { setUser, user } = this.props;
        const { params } = this.props.match;

        if (user.username !== params.username) {
            return (<Stranger username={params.username} />);
        }

        return (<MyProfile setUser={setUser} user={user} />);
    }
}

export default Profile;
