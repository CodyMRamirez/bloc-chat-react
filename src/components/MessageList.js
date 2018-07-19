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

  newMessage(e) {
    e.preventDefault();
    if (this.message.value !== '') {
      this.messagesRef.push(
        {
          username: 'default',
          content: this.message.value,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
          roomId: this.props.activeRoom
        });
      } else {
        alert('Please enter a message');
      }
      this.element.value = '';
      return false;
    }

  render() {
    return (
      <section className="Messages">
        <div className="Message List">
          <p>{this.props.activeRoom.name}</p>
        </div>
        <div className="new-message">
          <form onSubmit = {() => this.newMessage()}>
            <label>
              New Message:
              <input type="text" ref={message => this.message = message}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>
    );
  }

}

export default MessageList;
