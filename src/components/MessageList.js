import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username: '',
      content: '',
      sentAt: '',
      roomId: ''
    };

    this.messagesRef = this.props.firebase.database().ref('Messages');
  };

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render() {
    return (
      <section className="Messages">
        <div className="Message List">
          <p>{this.props.activeRoom.name}</p>
        </div>
      </section>
    );
  }

}

export default MessageList;
