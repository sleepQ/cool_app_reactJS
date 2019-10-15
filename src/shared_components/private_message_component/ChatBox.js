import React from 'react';
import { socketEvent } from '../../utils/helper_variables';

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.newMessageRef = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    componentDidMount() {
        const { socket, stranger } = this.props;
    }

    sendMessage(e, stranger) {
        e.preventDefault();

        const { message } = this.state;
        const { socket, username } = this.props;

        if (message.trim().length < 1) return;

        socket.emit(socketEvent.PRIVATE_MESSAGE, { message, username, stranger });

        this.setState(() => ({ message: '' }));
    }

    onChange(e) {
        const { value } = e.target;
        this.setState(() => ({ message: value }));
    }

    keyPress(e, stranger) {
        if (e.keyCode === 13) {
            this.sendMessage(e, stranger);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.userMessages.length !== prevProps.userMessages.length) {
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        if (this.newMessageRef.current) {
            this.newMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    render() {

        const { message } = this.state;
        const { stranger, username, userMessages, closeChatBox } = this.props;

        console.log('ChatBox', userMessages)

        return (
            <div className="chat-wrapper">
                <div className="bg-secondary text-white p-2">
                    {stranger}
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        value={stranger}
                        onClick={closeChatBox}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="chat-box border-0 m-0 p-1">
                    {
                        userMessages.map((data, i) => {
                            const me = username === data.username;
                            const usernameCss = me ? 'd-none' : 'text-secondary';
                            const messageCss = me ? 'bg-primary' : 'bg-secondary';
                            const msgRow = me ? 'flex-row-reverse' : '';

                            return (
                                <div key={i} className={`my-1 d-flex ${msgRow}`} ref={this.newMessageRef}>
                                    <span className={`py-1 ${usernameCss}`}>{data.username}:</span>
                                    <div className={`mx-1 px-2 py-1 rounded mw-60 ${messageCss}`}>
                                        <span className="text-white">{data.message}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="input-group">
                    <input type="text" className="w-75" value={message} onChange={this.onChange} onKeyDown={(e) => this.keyPress(e, stranger)} />
                    <button type="button" className="btn btn-sm btn-secondary w-25" onClick={(e) => this.sendMessage(e, stranger)}>Send</button>
                </div>
            </div>
        );
    }
}

export default ChatBox;
