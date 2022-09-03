import { React, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    Modal,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import credContext from "../../../context/cred/credContext.js";
const QuestionnaireModal = () => {
    let history = useHistory();

    const context = useContext(credContext);
    const {
        url,
        isAdmin,
        showAlrtState,
        showQuesModal,
        setShowQuesModal,
        questionnaireId,
        setQuestionnaireId,
    } = context;

    const [questionAnswer, setQuestionAnswer] = useState([]);
    const [submissionDate, setSubmissionDate] = useState("");

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
  
    const fetchQuestionTxtById = async (uniqueid) => {
        const response = await fetch(`${url}/api/question/fetchCurr`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uniqueid }),
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
            history.push("/Social-Chatbot-Project-Frontend");
        }
    };

    const fetchQuestionnaireById = async(questionnaireId)=>{
        let response;
        if(isAdmin){
            response = await fetch(
                `${url}/api/questionnaire/fetchQuestionnaireAdmin/${questionnaireId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("authTokenSC"),
                    },
                }
            );
        }
        else{
            response = await fetch(
                `${url}/api/questionnaire/fetchQuestionnaire/${questionnaireId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("authTokenSC"),
                    },
                }
            );
        }
        const res = await response.json();
        // console.log(res);
        if (res.success) {
            // showAlrtState("Success", res.message);
        } else {
            showAlrtState(
                "Warning",
                typeof res.errors === "string" ? res.errors : res.errors[0].msg
                );
                // console.log("res.errors", res.errors);
        }
        return res;
    }

    const createQuestionAnswer = async(questionnaire)=>{
        let tempQna = [];
        let quesArr = questionnaire.myQuestionnaire.questionanswers;
        for (let index = 0; index < quesArr.length; index++) {
            const element = quesArr[index];
            let questionTxt = await fetchQuestionTxtById(element.questionid);
            tempQna.push({questionTxt, answer: element.answer});
            // console.log(tempQna);
        }
        return tempQna;
    }

    const toDate = (myStr)=>{
        return myStr.substr(8, 2)+"/"+myStr.substr(5, 2)+"/"+myStr.substr(0, 4)
    }

    useEffect(() => {
        const initFunc = async()=>{
            const qna = await fetchQuestionnaireById(questionnaireId);
            let myDate = toDate(qna.myQuestionnaire.submissiondate);
            setSubmissionDate(myDate);
            // console.log(qna);
            const quesAns = await createQuestionAnswer(qna);
            // console.log(quesAns);
            setQuestionAnswer(quesAns);
        }
        if(showQuesModal){
            initFunc();
        }
        //eslint-disable-next-line
    }, [showQuesModal])
    

    const handleClose = () => {
        setShowQuesModal(false);
        setQuestionnaireId("");
        setQuestionAnswer([]);
        history.push("/Social-Chatbot-Project-Frontend/dashboard");
    };

    const handleDelete = async()=> {
        const response = await fetch(
            `${url}/api/questionnaire/deleteQuestionnaire/${questionnaireId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("authTokenSC"),
                },
                body: JSON.stringify({}),
            }
        );
        const res = await response.json();
        // console.log(res);
        if (res.success) {
            // showAlrtState("Success", res.message);
        } else {
            showAlrtState(
                "Warning",
                typeof res.errors === "string" ? res.errors : res.errors[0].msg
            );
            // console.log("res.errors", res.errors);
        }
        window.location.href = '/dashboard';
    }

    const handleTakeAppointment = async () => {
        const response = await fetch(
            `${url}/api/questionnaire/takeAppointment/${questionnaireId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("authTokenSC"),
                },
                body: JSON.stringify({ questionanswers: questionAnswer }),
            }
        );
        const res = await response.json();
        // console.log(res);
        if (res.success) {
            // showAlrtState("Success", res.message);
        } else {
            showAlrtState(
                "Warning",
                typeof res.errors === "string" ? res.errors : res.errors[0].msg
            );
            // console.log("res.errors", res.errors);
        }
        handleClose();
    };

    return (
        <>
            <Modal
                show={showQuesModal}
                onHide={handleClose}
                centered
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                enforceFocus={true}
                onExit={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Questionnaire submitted on {submissionDate}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {questionAnswer.map((s, i) => {
                            return (
                                <Row key={i} style={{marginBottom: "2%"}}>
                                    Q{i + 1}. {s.questionTxt} 
                                    <br/>
                                    Ans. {s.answer}
                                </Row>
                            );
                        })}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Col>
                        <Button variant="secondary" size="lg" onClick={handleClose}>
                            Close
                        </Button>
                    </Col>
                    {!isAdmin && <Col>
                        <Button
                            variant="success"
                            size="lg" onClick={handleTakeAppointment}
                        >
                            Take an appointment
                        </Button>
                    </Col>}
                    {!isAdmin && <Col>
                        <Button
                            variant="danger"
                            size="lg" onClick={handleDelete}
                        >
                            Delete Questionnaire
                        </Button>
                    </Col>}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default QuestionnaireModal;
