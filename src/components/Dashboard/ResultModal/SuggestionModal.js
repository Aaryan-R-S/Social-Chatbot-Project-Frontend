import { React, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    Modal,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import credContext from "../../../context/cred/credContext.js";

const SuggestionModal = () => {
    let history = useHistory();

    const context = useContext(credContext);
    const {
        url,
        showAlrtState,
        suggestions,
        videos,
        showSuggModal,
        setShowSuggModal,
        questionnaireId,
        questionAnswer,
        setQuestionnaireId,
        setCurrQuestionnaire,
        setQuestionAnswer,
        setSuggestions,
        setVideos,
    } = context;

    const handleClose = () => {
        setQuestionnaireId("");
        setShowSuggModal(false);
        setCurrQuestionnaire([]);
        setQuestionAnswer([]);
        setSuggestions([]);
        setVideos([]);
        localStorage.removeItem("currQuestionnaireSC");
        localStorage.removeItem("currQnaSC");
        localStorage.removeItem("currSuggestionsSC");
        localStorage.removeItem("currVideosSC");
        history.push("/dashboard");
    };

    const handleSendSuggestionsOverMail = async () => {
        const response = await fetch(
            `${url}/api/questionnaire/sendSuggestionsMail`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("authTokenSC"),
                },
                body: JSON.stringify({ suggestions, videos }),
            }
        );
        const res = await response.json();
        // console.log(res);
        if (res.success) {
            showAlrtState("Success", res.message);
        } else {
            showAlrtState(
                "Warning",
                typeof res.errors === "string" ? res.errors : res.errors[0].msg
            );
            // console.log("res.errors", res.errors);
        }
        handleClose();
    };

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
            showAlrtState("Success", res.message);
            history.push("/dashboard");
        } else {
            showAlrtState(
                "Warning",
                typeof res.errors === "string" ? res.errors : res.errors[0].msg
            );
            // console.log("res.errors", res.errors);
            history.push("/dashboard");
        }
        handleClose();
    };

    const handleCopy = async () => {
        let copyText = `Suggestions: \n${suggestions
            .map((s, i) => {
                return `${i + 1}. ${s}`;
            })
            .join("\n")} \n\nVideos: \n${videos
            .map((v, i) => {
                return `${i + 1}. ${v}`;
            })
            .join("\n")}`;
        // console.log(copyText);
        navigator.clipboard.writeText(copyText);
        showAlrtState("Success", "Suggestions copied successfully");
    };

    return (
        <>
            <Modal
                show={showSuggModal}
                onHide={handleClose}
                centered
                backdrop="static"
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                enforceFocus={true}
                onExit={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Suggestions and Videos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row style={{fontSize:"2rem", fontWeight:"600"}}>
                            Suggestions:
                        </Row> 
                        {suggestions.map((s, i) => {
                            return (<Row key={i}>{i + 1}. {s}</Row>);
                        })}
                        {suggestions.length===0 && <Row>Nothing to recommend.</Row>}
                        <Row style={{ marginTop: "1%" }}></Row>
                        <Row style={{fontSize:"2rem", fontWeight:"600"}}>
                            Videos:
                        </Row> 
                        {videos.map((v, i) => {
                            return (<Row key={i+suggestions.length}><a href={v} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>{i + 1}. {v}</a></Row>);
                        })}
                        {videos.length===0 && <Row>Nothing to recommend.</Row>}
                        <Row style={{ marginTop: "5%" }}></Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Col>
                        <Button variant="secondary" size="lg" onClick={handleClose}>
                            Close
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" size="lg" onClick={handleCopy}>
                            Copy it
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="success"
                            size="lg" onClick={handleSendSuggestionsOverMail}
                        >
                            Send me over Mail
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            size="lg" onClick={handleTakeAppointment}
                        >
                            Take an appointment
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SuggestionModal;
