import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBuR3xwApVWoYZoTfOYzP-cnEl0qdywRno",
  authDomain: "bloc-chat-95d1d.firebaseapp.com",
  databaseURL: "https://bloc-chat-95d1d.firebaseio.com",
  projectId: "bloc-chat-95d1d",
  storageBucket: "bloc-chat-95d1d.appspot.com",
  messagingSenderId: "331320342759"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      roomName: '',
      messageVisible: false,
      username: ''
    };
  }

  handleRoomClick(activeRoom, roomName) {
    const currentRoom = activeRoom
    const currentRoomName = roomName
    this.setState({activeRoom: currentRoom})
    this.setState({roomName: currentRoomName})
    this.setState({messageVisible: true})
  }

  setUser(user) {
    this.setState({username: user})
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Bloc Chat</h1>
          </header>
          <div className="Active-Room">
            <h1>{this.state.roomName}</h1>
          </div>

          {
            this.state.messageVisible
            ? <MessageList
              firebase={ firebase }
              activeRoom={this.state.activeRoom}
              username={this.state.username}
              />
            : null
          }

          <RoomList
            firebase={ firebase }
            action={(a, n) => this.handleRoomClick(a, n)}
            activeRoom={this.state.activeRoom}
          />

          <User
            username={this.state.username}
            firebase={ firebase }
            setUser={ (user) => this.setUser(user) }
          />

        </div>
    );
  }
}

export default App;
