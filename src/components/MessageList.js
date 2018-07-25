import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username: '',
      content: '',
      sentAt: '',
      roomId: '',
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

  handleChange(e) {
    e.preventDefault()
    if (this.props.username) {
      this.setState({username: this.props.username.displayName})
    } else {
      this.setState({username: 'Guest'})
    }
    this.setState({
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  newMessage(e) {
    e.preventDefault();
    if (this.state.content !== '') {
      this.messagesRef.push(
        {
          username: this.state.username,
          content: this.state.content,
          sentAt: this.state.sentAt,
          roomId: this.state.roomId
        });
      } else {
        alert('Please enter a message');
      }
    this.setState({
      username: '',
      content: '',
      sentAt: '',
      roomId: ''
    });
  }



  render() {
    return (
      <section className="Messages">
        <div className="Message List">
          <p>{this.props.activeRoom.name}</p>
        </div>
        <div className="new-message">
          <form onSubmit = {(e) => this.newMessage(e)}>
            <label>
              New Message:
              <input type="text" value={this.state.content} onChange={(e) => this.handleChange(e)}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        {
          this.state.messages.map( (message, index) =>
          <div key={index}>
            {message.roomId === this.props.activeRoom ? message.content : null}
          </div>
          )
        }
      </section>
    );
  }

}

export default MessageList;
