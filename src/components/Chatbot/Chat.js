import React, {useState, useContext, useEffect} from 'react'
import {Launcher} from 'react-chat-window'
import { useHistory } from 'react-router-dom';
import credContext from '../../context/cred/credContext.js';

const Chat = ()=> {
  
  const history = useHistory();
  const context = useContext(credContext);
  const {credCxt, showAlrtState, setShowLoginModal} = context;
  const [messageList, setMessageList] = useState([]);

  useEffect(()=>{
    if(!credCxt){
      history.push('/');
      showAlrtState("Warning", "Dear user, please login to access the chatbot service!");
      setTimeout(() => {
        setShowLoginModal(true);
      }, 3000);
    }
    else{
      showAlrtState("Success", "Dear user, Welcome to the Social Chatbot!");
      setShowLoginModal(false);
    }
    //eslint-disable-next-line
  }, [])

  // Called when a message is sent, with a message object as an argument.
  const _onMessageWasSent = (message)=> {
    // message['date']=Date.now;
    setMessageList([...messageList, message]);
    setTimeout(() => {
      let messageCopy = structuredClone(message);
      messageCopy['author']='them';
      setMessageList([...messageList, message, messageCopy]);
    }, 1000);
    console.log(messageList);
  }

  // _sendMessage(text) {
  //   if (text.length > 0) {
  //     this.setState({
  //       messageList: [...this.state.messageList, {
  //         author: 'me',
  //         type: 'text',
  //         data: { text },
  //         date:Date.now
  //       }]
  //     })
  //   }
  // }

  //eslint-disable-next-line
  const handleClick = ()=>{
    // console.log("o")
  }

  return (
  <div>
    {credCxt &&
      <Launcher
        agentProfile={{
          teamName: 'Social Chatbot',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={_onMessageWasSent.bind(this)}
        messageList={messageList}
        showEmoji
        // showFileIcon={false}
        // handleClick={this.handleClick}
        isOpen
        isWebView={true}
      />
    }
  </div>
  )
}

export default Chat;