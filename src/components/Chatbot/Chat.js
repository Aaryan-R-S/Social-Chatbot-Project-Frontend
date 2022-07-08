import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'

class Chat extends Component {

  constructor() {
    super();
    this.state = {
      messageList: [],
      messageList1: [],
    };
  }
  // Called when a message is sent, with a message object as an argument.
  _onMessageWasSent(message, message1) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'me',
          type: 'text',
          data: { text }
        }]
      })
    }
  }

  handleClick(){
    // console.log("o")
  }

  render() {
    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'Social Chatbot',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
        // showFileIcon={false}
        // handleClick={this.handleClick}
        // isOpen={false}
      />
    </div>)
  }
}

export default Chat;