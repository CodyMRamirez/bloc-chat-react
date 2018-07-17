import React, { Component } from 'react';
//import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
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
    this.roomsRef.push({
      name: this.element.value
    });
  }

  render() {
    return (
      <section id="chat-rooms">
      {
        this.state.rooms.map( (room, index) =>
          <div key={index}>
            {room.name}
          </div>
        )
      }
        <section id="new-room">
          <div className="create-room">
            <form onSubmit = {() => this.createRoom()}>
              <label>
                Enter a new chat room name:
                <input type="text" ref={el => this.element = el}/>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </section>
      </section>
    );
  }
}

export default RoomList;
