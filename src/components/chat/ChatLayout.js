
import React, { Component } from 'react';
import MessageList from './MessageList';
import SendMessage from './SendMessage';
import { SEND_MESSAGE } from '../../Constants';
import UserList from './users/UserList';

export class ChatLayout extends Component {

  sendMassage = (message) => {
    this.props.socket.emit(SEND_MESSAGE, {
      username: this.props.username,
      text: message
    });
  }

  render() {
    return (
      <div className="chat">
        <div className="info">
        <div  className="users-online">
           <div>Watchers: { this.props.users.length}</div>
          <UserList users={this.props.users}/>
        </div>
        <div className="room-info">
          <div>Your name: {this.props.username}</div>
          <div>Room id: {this.props.room}</div>
        </div>
        </div>
        <div className="chat-box">
              <MessageList messages={this.props.messages}/>
              <SendMessage className="chat-send-msg" sendMessage={this.sendMassage}/> 
        </div>
      </div>
    )
  }
}

export default ChatLayout