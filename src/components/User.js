import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
    };

  };

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  handleSignIn(e) {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut(e) {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <section className='user'>
        <h4>Welcome {(this.props.username) ? this.props.username.displayName : 'Guest'}</h4>
        <div id='login'>
          {
            (this.props.username === null) ?
            <button onClick={(e) => this.handleSignIn(e)}>
              Sign in
            </button> :
            <button onClick={(e) => this.handleSignOut(e)}>
              Sign out
            </button>
          }
        </div>
      </section>
    );
  }
}

export default User;
