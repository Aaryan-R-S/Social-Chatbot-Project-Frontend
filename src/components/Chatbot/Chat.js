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
import Spinner from "../Spinner/Spinner";

const Chat = () => {
    const history = useHistory();
    const context = useContext(credContext);
    const {
        url,
        credCxt,
        isAdmin,
        showAlrtState,
        setShowLoginModal,
        setShowSuggModal,
        checkCredAuthToken,
        currQuestionnaire,
        setCurrQuestionnaire,
        questionAnswer,
        setQuestionAnswer,
        suggestions,
        setSuggestions,
        videos,
        setVideos,
        setQuestionnaireId,
        showSpinner,
        setShowSpinner
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
                    showQuestionnaire(res.user, res.ques, res.qna, res.sugg, res.vid);
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

    useLayoutEffect(()=>{
        if(isAdmin){
            history.push('/dashboard');
        }
        // eslint-disable-next-line
    }, [isAdmin])

    const getOptionsString = async (answersArr) => {
        if (answersArr.length === 0) {
            return "(Type your answer)";
        }
        let retString = "";
        for (let index = 0; index < answersArr.length; index++) {
            const element = answersArr[index];
            // retString += "/" + element;
            retString += "("+(index+1).toString()+") "+element+" "
        }
        // retString += ")";
        // console.log(retString);
        // return "(" + retString.substring(1);
        return retString;
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
                body: JSON.stringify({ questionanswers: myValidQuestions }),
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

    const showQuestionnaire = async (myUser, ques, qna, sugg, vid) => {
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
                setQuestionAnswer([
                    {
                        questionTxt: quesRes.myNextQuestion.text + " " + res1,
                        answer: "",
                    },
                ]);
            });
            return;
        }
        setCurrQuestionnaire(ques);
        setQuestionAnswer(qna);
        setSuggestions(sugg);
        setVideos(vid);
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

    const max = (a, b) =>{
        if (a > b)
            return a;
        else
            return b;
    }
  
    const lcs = (X, Y, m, n) =>{
        var L = new Array(m + 1);
        for(var i = 0; i < L.length; i++){
            L[i] = new Array(n + 1);
        }
        // eslint-disable-next-line
        var i, j;
        
        /* Following steps build L[m+1][n+1] in
        bottom up fashion. Note that L[i][j]
        contains length of LCS of X[0..i-1]
        and Y[0..j-1] */
        for(i = 0; i <= m; i++){
            for(j = 0; j <= n; j++){
                if (i === 0 || j === 0)
                    L[i][j] = 0;
                else if (X[i - 1] === Y[j - 1])
                    L[i][j] = L[i - 1][j - 1] + 1;
                else
                    L[i][j] = max(L[i - 1][j], L[i][j - 1]);
            }
        }
        
        /* L[m][n] contains length of LCS
        for X[0..n-1] and Y[0..m-1] */
        return L[m][n];
    }
  
    const getMostSuitableMatch = (posAnswers, newMessage) => {
        let ansIdx = -1, maxLen = 0;
        for (let index = 0; index < posAnswers.length; index++) {
            const elem = posAnswers[index];
            let currLen = lcs(elem.toLowerCase(), newMessage.toLowerCase(), elem.length, newMessage.length);
            if(currLen>=1 && currLen>maxLen){
                maxLen = currLen;
                ansIdx = index;
            }
        }
        return ansIdx;
    };

    const handleNewUserMessage = async (newMessage) => {
        // console.log("newMessage", newMessage);
        // console.log(questionAnswer);
        // console.log(suggestions);
        // console.log(videos);
        if (String(newMessage).toLowerCase() === "save chat") {
            // console.log("currQuestionnaire", currQuestionnaire);
            localStorage.setItem("currQuestionnaireSC", JSON.stringify(currQuestionnaire));
            localStorage.setItem("currQnaSC", JSON.stringify(questionAnswer));
            localStorage.setItem("currSuggestionsSC", JSON.stringify(suggestions));
            localStorage.setItem("currVideosSC", JSON.stringify(videos));
            setCurrQuestionnaire([]);
            setQuestionAnswer([]);
            setSuggestions([]);
            setVideos([]);
            showAlrtState("Success", "Your chat has been save successfully!");
            history.push("/");
            return;
        }
        if (String(newMessage).toLowerCase() === "delete chat") {
            localStorage.removeItem("currQuestionnaireSC");
            localStorage.removeItem("currQnaSC");
            localStorage.removeItem("currSuggestionsSC");
            localStorage.removeItem("currVideosSC");
            setCurrQuestionnaire([]);
            setQuestionAnswer([]);
            setSuggestions([]);
            setVideos([]);
            showAlrtState(
                "Success",
                "Your chat has been deleted successfully!"
            );
            history.push("/");
            return;
        }
        setMessageList([...messageList, newMessage]);
        let copyCurrQuestionnaire = [];
        let copyCurrQna = [];
        for (let index = 0; index < currQuestionnaire.length - 1; index++) {
            const element = currQuestionnaire[index];
            copyCurrQuestionnaire.push(element);
            copyCurrQna.push(questionAnswer[index]);
        }
        // console.log(currQuestionnaire);
        let answerid = "-1";
        let posAnswers = await fetchNxtQuestionById(
            currQuestionnaire[currQuestionnaire.length - 1].questionid,
            0
        );
        posAnswers = posAnswers.myCurrQuestionResults.answers;
        // console.log(posAnswers);
        if(posAnswers.length!==0){
            let mostSuitableMatch = getMostSuitableMatch(posAnswers, newMessage);
            answerid = mostSuitableMatch.toString();
            // if(mostSuitableMatch!==-1){
                // newMessage = posAnswers[mostSuitableMatch];
            // }
            // console.log(answerid);
            // console.log(newMessage);

            // Version - 1.0
            // if(newMessage>='0' && parseInt(newMessage)<posAnswers.length){
                //     answerid = newMessage;
                //     newMessage = posAnswers[parseInt(newMessage)];
            // }
            // Version - 2.0
            // for (let index = 0; index < posAnswers.length; index++) {
            //     const element = posAnswers[index];
            //     if (newMessage.toLowerCase() === element.toLowerCase()) {
            //         answerid = index.toString();
            //         // console.log("got matched with some options");
            //         break;
            //     }
            // }
        }
        copyCurrQuestionnaire.push({
            questionid: currQuestionnaire[currQuestionnaire.length - 1].questionid,
            answer: newMessage,
            answerid,
        });
        copyCurrQna.push({
            questionTxt: questionAnswer[questionAnswer.length - 1].questionTxt,
            answer: newMessage,
        });
        // console.log("copyCurrQuestionnaire", copyCurrQuestionnaire);
        setCurrQuestionnaire(copyCurrQuestionnaire);
        setQuestionAnswer(copyCurrQna);
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
                    if(res.myCurrQuestionResults.suggestions.length!==0){
                        setSuggestions([
                            ...suggestions,
                            res.myCurrQuestionResults.suggestions[0]
                        ]);
                        localStorage.setItem("currSuggestionsSC", JSON.stringify([
                            ...suggestions,
                            res.myCurrQuestionResults.suggestions[0]
                        ]));
                    }
                    else{
                        localStorage.setItem("currSuggestionsSC", JSON.stringify(suggestions));
                    }
                    if(res.myCurrQuestionResults.videos.length!==0){
                        setVideos([
                            ...videos,
                            res.myCurrQuestionResults.videos[0]
                        ]);
                        localStorage.setItem("currVideosSC", JSON.stringify([
                            ...videos,
                            res.myCurrQuestionResults.videos[0]
                        ]));
                    }
                    else{
                        localStorage.setItem("currVideosSC", JSON.stringify(videos));
                    }
                    addResponseMessage("Thanks for sumbitting the questionnaire. \nRecommending you some solutions and helpful videos...")
                    setShowSpinner(true);
                    setTimeout(() => {
                        saveQuestionnaire(copyCurrQuestionnaire).then((res2) => {
                            // console.log("res2", res2);
                            if (res2.success) {
                                setQuestionnaireId(res2.questionnaireId);
                                setShowSuggModal(true);
                                localStorage.setItem("currQuestionnaireSC", JSON.stringify(copyCurrQuestionnaire));
                                localStorage.setItem("currQnaSC", JSON.stringify(copyCurrQna));
                                history.push("/dashboard");
                            } else {
                                history.push("/");
                                return;
                            }
                        });
                    }, 2000);
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
                            setQuestionAnswer([
                                ...copyCurrQna,
                                {
                                    questionTxt: res.myNextQuestion.text + " " + res1,
                                    answer: "",
                                },
                            ]);
                            if(res.myCurrQuestionResults.suggestions.length!==0){
                                setSuggestions([
                                    ...suggestions,
                                    res.myCurrQuestionResults.suggestions[0]
                                ]);
                            }
                            if(res.myCurrQuestionResults.videos.length!==0){
                                setVideos([
                                    ...videos,
                                    res.myCurrQuestionResults.videos[0]
                                ]);
                            }
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
            {showSpinner && <Spinner/>}
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
