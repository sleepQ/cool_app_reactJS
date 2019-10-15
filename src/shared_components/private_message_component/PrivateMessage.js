import React from 'react';
import { isUserLoggedIn } from '../../utils/helper_functions';
import { socketEvent } from '../../utils/helper_variables';
import ChatBox from './ChatBox';

class PrivateMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessages: {},
            allOnlineUsers: [],
            chatBoxes: [],
            showChat: false,
        };

        this.newMessageRef = React.createRef();

        // this.onChange = this.onChange.bind(this);
        // this.keyPress = this.keyPress.bind(this);
        // this.sendMessage = this.sendMessage.bind(this);
        // this.scrollToBottom = this.scrollToBottom.bind(this);
        this.openChatBox = this.openChatBox.bind(this);
        this.closeChatBox = this.closeChatBox.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        const { socket } = this.props;
        const { username } = isUserLoggedIn();

        // socket.on('connect', () => {

        socket.emit(socketEvent.ONLINE, { username });

        socket.on(socketEvent.ONLINE, (data) => {
            console.log('receiving online users', data)

            if (this.mounted) {
                this.setState(() => ({
                    allOnlineUsers: data.allOnlineUsers
                }));
            }
        });

        socket.on(socketEvent.PRIVATE_MESSAGE, (data) => {
            const { message, username, stranger } = data || {};

            if (this.mounted) {
                this.setState((prevState) => ({
                    userMessages: {
                        ...prevState.userMessages,
                        [stranger]: (prevState.userMessages[stranger] || []).concat({ message, username })
                    }
                }));
            }
        });

        // });
    }

    openChatBox(e, user) {
        e.stopPropagation();
        const { chatBoxes } = this.state;

        if (chatBoxes.length > 2 || chatBoxes.indexOf(user) !== -1) return;

        this.setState(prevState => ({
            chatBoxes: prevState.chatBoxes.concat(user)
        }));
    }

    closeChatBox(e) {
        e.stopPropagation();
        const { value } = e.currentTarget;

        this.setState(prevState => ({
            chatBoxes: prevState.chatBoxes.filter(user => user !== value)
        }));
    }

    toggleChat() {
        this.setState(prevState => ({ showChat: !prevState.showChat }));
    }

    render() {
        const { allOnlineUsers = [], chatBoxes, userMessages, showChat } = this.state;
        const { socket } = this.props;
        const { username } = isUserLoggedIn();

        const chatIcon = showChat ? <i className="fa fa-angle-down" /> : <i className="fa fa-angle-up" />;
        const noChatters = allOnlineUsers.length < 1;

        return (
            <React.Fragment>
                <div className="chat-list-pos">
                    <div className={`chat-list-wrapper ${showChat ? 'h-75' : ''}`}>
                        <div
                            className="text-white text-center py-2 cursor-pointer"
                            onClick={this.toggleChat}
                        >
                            Public Chat {chatIcon}
                        </div>
                        {showChat && <ul className="chat-list">
                            {noChatters
                                ? <li className="text-white text-center">Everyone is offline</li>
                                : allOnlineUsers.map(user => {
                                    if (user === username) {
                                        return null;
                                    }
                                    return (
                                        <li key={user} className="chat-list-item">
                                            <div onClick={e => this.openChatBox(e, user)}>
                                                <div className="text-white pl-2">
                                                    {user}
                                                </div>
                                            </div>
                                        </li>);
                                })
                            }
                        </ul>}
                    </div>
                </div>
                <div className="chat-pos">
                    {chatBoxes.map(stranger => (
                        <ChatBox
                            key={stranger}
                            username={username}
                            stranger={stranger}
                            socket={socket}
                            userMessages={userMessages[stranger] || []}
                            closeChatBox={this.closeChatBox}
                        />)
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default PrivateMessage;
