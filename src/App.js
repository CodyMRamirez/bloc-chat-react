import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
    }

  }

  handleRoomClick(activeRoom) {
    const currentRoom = activeRoom
    this.setState({activeRoom: currentRoom})
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Bloc Chat</h1>
            <p>{this.state.activeRoom}</p>
          </header>

          <MessageList
            firebase={ firebase }
            activeRoom={this.state.activeRoom}
          />

          <RoomList
            firebase={ firebase }
            action={(a) => this.handleRoomClick(a)}
            activeRoom={this.state.activeRoom}
          />

        </div>
    );
  }
}

export default App;
