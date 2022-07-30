import React, { useState, useContext, useLayoutEffect } from "react";
import { Widget, addResponseMessage, toggleWidget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { useHistory } from "react-router-dom";
import credContext from "../../context/cred/credContext.js";
import sytlesSheet from './chat.css'

const Chat = () => {
  const history = useHistory();
  const context = useContext(credContext);
  const { credCxt, showAlrtState, setShowLoginModal, checkCredAuthToken } =
    context;
  //eslint-disable-next-line
  const [messageList, setMessageList] = useState([]);

  useLayoutEffect(() => {
    // if(localStorage.getItem('authTokenSC')){
    //   checkCredAuthToken();
    // }
    toggleWidget();
    if (localStorage.getItem("authTokenSC")) {
      if (checkCredAuthToken() === false) {
        history.push("/");
        setTimeout(() => {
          setShowLoginModal(true);
        }, 3000);
      } else {
        // showAlrtState("Success", "Dear user, Welcome to the Social Chatbot!");
        setShowLoginModal(false);
        addResponseMessage("Welcome to this awesome chat!");
      }
    } else {
      history.push("/");
      showAlrtState(
        "Warning",
        "Dear user, please login to access the chatbot service!"
      );
      setTimeout(() => {
        setShowLoginModal(true);
      }, 3000);
    }
    //eslint-disable-next-line
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(messageList);
    setMessageList([...messageList, newMessage]);
    // console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    setTimeout(() => {
      addResponseMessage(newMessage);
      setMessageList([...messageList, newMessage]);
    }, 1000);
  };

  return (
    <div>
      {credCxt && (
        <Widget
          className={sytlesSheet}
          handleNewUserMessage={handleNewUserMessage}
          title="Social Chatbot"
          subtitle="An AI powered chatbot"
          senderPlaceHolder="Type a message"
          profileAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9OjBMsliZgmJhLAVg6CVHauN0Q3FbYcJ0Ww&usqp=CAU"
          profileClientAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4EC26dH5Nu1_AGZ65YVIwYgGcNTQJhAYgzQ&usqp=CAU"
          titleAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9OjBMsliZgmJhLAVg6CVHauN0Q3FbYcJ0Ww&usqp=CAU"
          emojis
          autofocus
          showBadge={false}
        />
      )}
    </div>
  );
};

export default Chat;
