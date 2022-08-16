import React, { useState, useContext, useLayoutEffect } from "react";
import {
    Widget,
    addResponseMessage,
    addUserMessage,
    toggleWidget,
} from "react-chat-widget";
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
                    setShowLoginModal(false);
                    showQuestionnaire(res.user, res.ques);
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

    const getOptionsString = async (answersArr) => {
        if (answersArr.length === 0) {
            return "(Type your answer)";
        }
        let retString = "";
        for (let index = 0; index < answersArr.length; index++) {
            const element = answersArr[index];
            retString += "/" + element;
        }
        retString += ")";
        // console.log(retString);
        return "(" + retString.substring(1);
    };

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
            let res1 = await getOptionsString(
                res.myCurrQuestionResults.answers
            );
            // console.log(res.myCurrQuestionResults.questionTxt+" "+res1);
            return res.myCurrQuestionResults.questionTxt + " " + res1;
        } else {
            showAlrtState(
                "Warning",
                typeof res.errors === "string" ? res.errors : res.errors[0].msg
            );
            // console.log("res.errors", res.errors);
            history.push("/");
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
        }
    };

    const saveQuestionnaire = async (copyCurrQuestionnaire) => {
        const myValidQuestions = [];
        for (let index = 0; index < copyCurrQuestionnaire.length; index++) {
            const element = copyCurrQuestionnaire[index];
            myValidQuestions.push({
                questionid: element.questionid,
                answer: element.answer,
            });
        }
        const response = await fetch(
            `${url}/api/questionnaire/addQuestionnaire`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("authTokenSC"),
                },
                body: JSON.stringify({ questionanswers: [myValidQuestions] }),
            }
        );
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
        }
    };

    const showQuestionnaire = async (myUser, ques) => {
        // console.log("currQuestionnaire ", ques);
        if (ques.length <= 1) {
            let quesRes = await fetchNxtQuestionById(0, 0);
            // console.log(quesRes);
            getOptionsString(quesRes.myNextQuestion.answers).then((res1) => {
                addResponseMessage(quesRes.myNextQuestion.text + " " + res1);
                setCurrQuestionnaire([
                    {
                        questionid: quesRes.myNextQuestion.uniqueid,
                        answer: "",
                        answerid: "",
                    },
                ]);
            });
            return;
        }
        setCurrQuestionnaire(ques);
        let copyMsgList = [];
        for (let index = 0; index < ques.length - 1; index++) {
            let quesRes = await fetchQuestionTxtById(
                ques[index].questionid,
                ques[index].answerid,
                true
            );
            const element = ques[index];
            // console.log("element", element);
            // console.log("quesRes", quesRes);
            addResponseMessage(quesRes);
            addUserMessage(element.answer);
            copyMsgList.push(element.answer);
        }
        setMessageList(copyMsgList);
        let quesRes = await fetchQuestionTxtById(
            ques[ques.length - 1].questionid,
            0,
            true
        );
        addResponseMessage(quesRes);
        // console.log("copymessageList", copyMsgList);
        // console.log("messageList", messageList);
        // console.log("currQuestionnaire ", currQuestionnaire);
    };

    const handleNewUserMessage = async (newMessage) => {
        // console.log("newMessage", newMessage);
        if (String(newMessage).toLowerCase() === "save chat") {
            // console.log("currQuestionnaire", currQuestionnaire);
            localStorage.setItem(
                "currQuestionnaireSC",
                JSON.stringify(currQuestionnaire)
            );
            setCurrQuestionnaire([]);
            showAlrtState("Success", "Your chat has been save successfully!");
            history.push("/");
            return;
        }
        if (String(newMessage).toLowerCase() === "delete chat") {
            localStorage.removeItem("currQuestionnaireSC");
            setCurrQuestionnaire([]);
            showAlrtState(
                "Success",
                "Your chat has been deleted successfully!"
            );
            history.push("/");
            return;
        }
        setMessageList([...messageList, newMessage]);
        let copyCurrQuestionnaire = [];
        for (let index = 0; index < currQuestionnaire.length - 1; index++) {
            const element = currQuestionnaire[index];
            copyCurrQuestionnaire.push(element);
        }
        // console.log(currQuestionnaire);
        let answerid = "-1";
        let posAnswers = await fetchNxtQuestionById(
            currQuestionnaire[currQuestionnaire.length - 1].questionid,
            0
        );
        // console.log(posAnswers);
        // use NLP here
        posAnswers = posAnswers.myCurrQuestionResults.answers;
        for (let index = 0; index < posAnswers.length; index++) {
            const element = posAnswers[index];
            if (newMessage.toLowerCase() === element.toLowerCase()) {
                answerid = index.toString();
                // console.log("got matched with some options");
                break;
            }
        }
        copyCurrQuestionnaire.push({
            questionid:
                currQuestionnaire[currQuestionnaire.length - 1].questionid,
            answer: newMessage,
            answerid,
        });
        // console.log("copyCurrQuestionnaire", copyCurrQuestionnaire);
        setCurrQuestionnaire(copyCurrQuestionnaire);
        setTimeout(() => {
            fetchNxtQuestionById(
                copyCurrQuestionnaire[copyCurrQuestionnaire.length - 1]
                    .questionid,
                answerid
            ).then((res) => {
                // console.log("res", res);
                if (!res.success) {
                    getOptionsString(res.myNextQuestion.answers).then(
                        (res1) => {
                            addResponseMessage(
                                res.myNextQuestion.text + " " + res1
                            );
                        }
                    );
                    return;
                }
                if (
                    res.myNextQuestion.uniqueid ===
                    copyCurrQuestionnaire[copyCurrQuestionnaire.length - 1]
                        .questionid
                ) {
                    // all done
                    saveQuestionnaire(copyCurrQuestionnaire).then((res) => {
                        // console.log("res", res);
                        if (res.success) {
                            setCurrQuestionnaire([]);
                            localStorage.removeItem("currQuestionnaireSC");
                            history.push("/dashboard");
                        } else {
                            history.push("/");
                            return;
                        }
                    });
                } else {
                    getOptionsString(res.myNextQuestion.answers).then(
                        (res1) => {
                            addResponseMessage(
                                res.myNextQuestion.text + " " + res1
                            );
                            setCurrQuestionnaire([
                                ...copyCurrQuestionnaire,
                                {
                                    questionid: res.myNextQuestion.uniqueid,
                                    answer: "",
                                    answerid: "",
                                },
                            ]);
                        }
                    );
                }
            });
        }, 1000);
        // console.log("messageList", messageList);
        // console.log("currQuestionnaire", currQuestionnaire);
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
