import React, { Component } from 'react';
import './ChatBot.css'; // Create a CSS file for styling your chatbot

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [], // Store messages
      userInput: '' // Store current user input
    };
  }

  handleInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { userInput, messages } = this.state;
    if (!userInput.trim()) return;

    // Add the user's message to the chat
    const newMessage = { id: Date.now(), text: userInput, sender: 'user' };
    this.setState({
      messages: [...messages, newMessage],
      userInput: '' // Reset input field
    });

    // Here you can also call an API to get a response from your bot and add it to the chat
  }

  renderMessages() {
    return this.state.messages.map(message => (
      <div key={message.id} className={`message ${message.sender}`}>
        {message.text}
      </div>
    ));
  }

  render() {
    return (
      <div className="chatbot-container">
        <div className="messages">
          {this.renderMessages()}
        </div>
        <form onSubmit={this.handleSubmit} className="user-input">
          <input
            type="text"
            value={this.state.userInput}
            onChange={this.handleInputChange}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default ChatBot;
