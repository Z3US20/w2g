import  React,  {Component } from 'react';
import "../css/components/welcome/welcome.scss"
class WelcomeScreen extends Component {

  state = {
    roomid: '',
    yourname: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.yourname, this.state.roomid);
  }

  handleRoomNameClick = (e) => {
    this.setState({
      roomid: this.createRandomRoomName(),
    })
  }

  createRandomRoomName = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  render() {
    return (
<div class="bodjy">
<div class="container">
  <form onSubmit={this.handleSubmit} >
  <h1>W<font color="orange">.2.</font>G</h1>
    <div className="welcome-input">
    <input autocomplete="off" value={this.state.yourname} onChange={this.handleChange}  placeholder="Name" required id="yourname"></input> 
    <input autocomplete="off" value={this.state.roomid} onChange={this.handleChange}  placeholder="Room id" required id="roomid"></input>
    </div>
    <button type="submit">Let me in!</button>
    <button  type="button" onClick={this.handleRoomNameClick}>Random room id</button>
  </form>  
</div>
</div>
    )
  }
}

export default WelcomeScreen
