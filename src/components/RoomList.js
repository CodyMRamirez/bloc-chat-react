import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom() {
    if (this.element.value !== '') {
      this.roomsRef.push({name: this.element.value});
      } else {
        alert('Please enter a room name');
      }
      this.element.value = '';
    }

  render() {
    return (
      <section id="chat-rooms">
        <section id="new-room">
          <div className="create-room">
            <form onSubmit = {() => this.createRoom()}>
              <label>
                New Chat Room:
                <input type="text" ref={el => this.element = el}/>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          {
            this.state.rooms.map( (room, index) =>
              <div key={index} onClick={() => this.props.action(room.key)}>
                {room.name}
              </div>
            )
          }
        </section>
      </section>
    );
  }
}

export default RoomList;
