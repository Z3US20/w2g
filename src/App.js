
import React, { Component } from 'react';
import HomeScreen from './components/HomeScreen';
import WelcomeScreen from './components/WelcomeScreen';

import './css/style.scss';
class App extends Component {

  state = {
    username: '',
    room: '',
    currentScreen: 'default',
  }

  onSubmit = (username, room) => {
    this.setState({
      username,
      room,
      currentScreen: 'HomeScreen'
    })
  }

  render() {
    var screen;
    if (this.state.currentScreen === 'default') {
      screen = <WelcomeScreen onSubmit={this.onSubmit}/>
    }
    if (this.state.currentScreen === 'HomeScreen') {
      screen = <HomeScreen room={this.state.room} username={this.state.username}/>
    }

    return (
      <div className="screen">
        {screen}
      </div>
    )
  }
}

export default App;
