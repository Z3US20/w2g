import React, { Component } from 'react';

class SendMessage extends Component {

  state = {
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input  autocomplete="off" className="msg-btn" placeholder="Type message" id="message" onChange={this.handleChange} value={this.state.message} required></input>
      </form>
    )
  }
}

export default SendMessage
