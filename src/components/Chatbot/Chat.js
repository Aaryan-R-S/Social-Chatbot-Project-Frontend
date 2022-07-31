import React, { useState, useContext, useLayoutEffect } from "react";
import { Widget, addResponseMessage, addUserMessage, toggleWidget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { useHistory } from "react-router-dom";
import credContext from "../../context/cred/credContext.js";
import sytlesSheet from "./chat.css";

// store and display suggestions at the end of the chat

const Chat = () => {
  const history = useHistory();
  const context = useContext(credContext);
  const {
    url,
    credCxt,
    showAlrtState,
    setShowLoginModal,
    checkCredAuthToken,
    currQuestionnaire,
    setCurrQuestionnaire,
  } = context;
  //eslint-disable-next-line
  const [messageList, setMessageList] = useState([]);

  useLayoutEffect(() => {
    // if(localStorage.getItem('authTokenSC')){
    //   checkCredAuthToken();
    // }
    toggleWidget();
    if (localStorage.getItem("authTokenSC")) {
      checkCredAuthToken().then((res) => {
        // console.log(res);
        if (res.success === false) {
          history.push("/");
          setTimeout(() => {
            setShowLoginModal(true);
          }, 3000);
        } else {
          // showAlrtState("Success", "Dear user, Welcome to the Social Chatbot!");
          setShowLoginModal(false);
          // addResponseMessage("Welcome to this awesome chat!");
          // setTimeout(() => {
            // console.log(res.user);
            showQuestionnaire(res.user, res.ques);
          // }, 5000);
        }
      });
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
  
  const getOptionsString = async(answersArr)=>{
    if(answersArr.length===0){
      return "(Type your answer)";
    }
    let retString = "";
    for (let index = 0; index < answersArr.length; index++) {
      const element = answersArr[index];
      retString += "  "+String(index)+"-"+element;
    }
    retString += ")";
    console.log(retString);
    return "("+retString.substring(2);
  }

  // hi-hello stuff
  // fill up the existing questionnaire
  // fetch and show the last unanswered questionnnaire

  const fetchQuestionTxtById = async (uniqueid, answerid) => {
    const response = await fetch(`${url}/api/question/fetchNext`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uniqueid, answerid }),
    });
    const res = await response.json();
    if (res.success) {
      getOptionsString(res.myCurrQuestionResults.answers).then((res1)=>{
        return res.myCurrQuestionResults.questionTxt+" "+res1;
      })
    } else {
      showAlrtState(
        "Warning",
        typeof res.errors === "string" ? res.errors : res.errors[0].msg
        );
      console.log("res.errors", res.errors);
      history.push("/");
      //   alert(typeof res.errors === 'string'? res.errors:res.errors[0].msg);
    }
  };

  const fetchNxtQuestionById = async (uniqueid, answerid) => {
    const response = await fetch(`${url}/api/question/fetchNext`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uniqueid, answerid }),
    });
    const res = await response.json();
    if (res.success) {
      return res;
    } else {
      showAlrtState(
        "Warning",
        typeof res.errors === "string" ? res.errors : res.errors[0].msg
      );
      return res;
      //   alert(typeof res.errors === 'string'? res.errors:res.errors[0].msg);
    }
  };

  const saveQuestionnaire = async()=>{
    const myValidQuestions = [];
    for (let index = 2; index < currQuestionnaire.length; index++) {
      const element = currQuestionnaire[index];
      myValidQuestions.push(element);
    }
    const response = await fetch(`${url}/api/questionnaire/addQuestionnaire`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("authTokenSC")
      },
      body: JSON.stringify({ questionanswers:[myValidQuestions] }),
    });
    const res = await response.json();
    if (res.success) {
      showAlrtState("Success", res.message);
      return res;
    } else {
      showAlrtState(
        "Warning",
        typeof res.errors === "string" ? res.errors : res.errors[0].msg
      );
      return res;
      //   alert(typeof res.errors === 'string'? res.errors:res.errors[0].msg);
    }
  }

  const showQuestionnaire = async (myUser, ques) => {
    console.log("currQuestionnaire ", ques);
    if (ques.length <= 3) {
      // console.log(myUser);
      const welcomeTxt = "Hi! What's up, " + myUser.name + "?";
      addResponseMessage(welcomeTxt);
      setCurrQuestionnaire([{ question: welcomeTxt, answer: "" }]);
      console.log("<=3");
      return;
    }
    let copyMsgList = [];
    for (let index = 0; index < 2; index++) {
      const element = ques[index];
      console.log("element", element);
      addResponseMessage(element.question);
      addUserMessage(element.answer);
      copyMsgList.push(element.answer);
    }
    for (let index = 2; index < ques.length-1; index++) {
      const element = ques[index];
      console.log("element", element);
      fetchQuestionTxtById(element.questionid, element.answer).then((res)=>{
        // console.log(res);
        addResponseMessage(res);
        addUserMessage(element.answer);
        copyMsgList.push(element.answer);
      });
    }
    setMessageList(copyMsgList);
    fetchQuestionTxtById(ques[ques.length-1].questionid, 0).then((res)=>{
      // console.log(res);
      addResponseMessage(res);
    })
    console.log("copymessageList", copyMsgList);
    console.log("messageList", messageList);
    console.log("currQuestionnaire ", currQuestionnaire);
  };

  // update questionnaire
  // if done save it and clear questionnaire and redirect to dashboard
  // if enter stop then clear questionnaire if don't want to save else keep it in localstorage for future
  const handleNewUserMessage = async(newMessage) => {
    console.log("newMessage", newMessage);
    if(String(newMessage).toLowerCase()==="save chat"){
      console.log("currQuestionnaire", currQuestionnaire);
      localStorage.setItem("currQuestionnaireSC", JSON.stringify(currQuestionnaire));
      setCurrQuestionnaire([]);
      history.push('/');
      return;
    }
    if(String(newMessage).toLowerCase()==="discard chat"){
      localStorage.removeItem("currQuestionnaireSC");
      setCurrQuestionnaire([]);
      history.push('/');
      return;
    }
    if (currQuestionnaire.length === 1) {
      console.log("==1");
      setMessageList([...messageList, newMessage]);
      // setCurrQuestionnaire([{question: currQuestionnaire[0].question, answer: newMessage}]);
      setTimeout(() => {
        const probTxt = "What problem are you facing?";
        addResponseMessage(probTxt);
        setCurrQuestionnaire([{question: currQuestionnaire[0].question, answer: newMessage}, {question: probTxt, answer: "" }]);
        // setMessageList([...messageList, newMessage]);
      }, 1000);
    } 
    else if (currQuestionnaire.length === 2) {
      console.log("==2");
      setMessageList([...messageList, newMessage]);
      // setCurrQuestionnaire([currQuestionnaire[0], {question: currQuestionnaire[1].question, answer: newMessage}]);
      setTimeout(() => {
        // fetch first question
        fetchNxtQuestionById(0, -1).then((res)=>{
          if(!res.success) {
              history.push('/');
              return;
          }
          getOptionsString(res.myNextQuestion.answers).then((res1)=>{
            addResponseMessage(res.myNextQuestion.text+" "+res1);
            setCurrQuestionnaire([currQuestionnaire[0], {question: currQuestionnaire[1].question, answer: newMessage}, {questionid: res.myNextQuestion.uniqueid, answer: "" }]);
          })
          // setMessageList([...messageList, newMessage]);
        })
      }, 1000);
    } 
    else {
      console.log(">2");
      setMessageList([...messageList, newMessage]);
      let copyCurrQuestionnaire = [];
      for (let index = 0; index < currQuestionnaire.length-1; index++) {
        const element = currQuestionnaire[index];
        copyCurrQuestionnaire.push(element);
      }
      copyCurrQuestionnaire.push({questionid:currQuestionnaire[currQuestionnaire.length-1].questionid, answer: newMessage})
      console.log("copyCurrQuestionnaire", copyCurrQuestionnaire);
      // setCurrQuestionnaire(copyCurrQuestionnaire);
      setTimeout(() => {
        // fetch next question
        fetchNxtQuestionById(copyCurrQuestionnaire[copyCurrQuestionnaire.length-1].questionid, newMessage).then((res)=>{
          console.log("res", res);
          if(!res.success) {
            getOptionsString(res.myNextQuestion.answers).then((res1)=>{
              addResponseMessage(res.myNextQuestion.text+" "+res1);
            })
            return;
          }
          if(res.myNextQuestion.uniqueid===copyCurrQuestionnaire[copyCurrQuestionnaire.length-1].questionid){
            // all done
            saveQuestionnaire().then((res)=>{
              console.log("res", res);
              if(res.success){
                setCurrQuestionnaire([]);
                localStorage.removeItem("currQuestionnaireSC");
                history.push('/dashboard');
              }
              else{
                history.push('/');
                return;
              }
            })
          }
          else{
            getOptionsString(res.myNextQuestion.answers).then((res1)=>{
              addResponseMessage(res.myNextQuestion.text+" "+res1);
              setCurrQuestionnaire([...copyCurrQuestionnaire, {questionid: res.myNextQuestion.uniqueid, answer: "" }]);
            })
          }
          // setMessageList([...messageList, newMessage]);
        })
    },1000);
    // setMessageList([...messageList, newMessage]);
    // console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  }
  // console.log(user);
  console.log("messageList", messageList);
  console.log("currQuestionnaire", currQuestionnaire);
  }
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
