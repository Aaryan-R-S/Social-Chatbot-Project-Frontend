import React, { useContext, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SuggestionModal from "./ResultModal/SuggestionModal.js";
import credContext from "../../context/cred/credContext.js";
import QuestionnaireModal from "./ResultModal/QuestionnaireModal.js";
import { Button } from "react-bootstrap";

const Dashboard = () => {
    const history = useHistory();
    const context = useContext(credContext);
    const {
        url,
        credCxt,
        user,
        isAdmin,
        showAlrtState,
        setShowLoginModal,
        checkCredAuthToken,
        showSuggModal,
        setShowQuesModal,
        showQuesModal,
        setQuestionnaireId,
    } = context;
    const [allQuestionnaires, setAllQuestionnaires] = useState([]);

    const initFunc = async () => {
        let response;
        if(isAdmin){
          response = await fetch(
              `${url}/api/questionnaire/fetchQuestionnairesAdmin`,
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
              `${url}/api/questionnaire/fetchQuestionnaires`,
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
            setAllQuestionnaires(isAdmin?res.allQuestionnaires.reverse():res.myQuestionnaires.reverse());
        } else {
            showAlrtState(
                "Warning",
                typeof res.errors === "string" ? res.errors : res.errors[0].msg
            );
            // console.log("res.errors", res.errors);
            setAllQuestionnaires([]);
        }
    };

    const toDate = (myStr) => {
        return (
            myStr.substr(8, 2) +
            "/" +
            myStr.substr(5, 2) +
            "/" +
            myStr.substr(0, 4)
        );
    };

    useLayoutEffect(() => {
        if (localStorage.getItem("authTokenSC")) {
            if (checkCredAuthToken().success === false) {
                history.push("/");
                setTimeout(() => {
                    setShowLoginModal(true);
                }, 3000);
            } else {
                // showAlrtState("Success", "Dear user, Welcome to your dashboard!");
                setShowLoginModal(false);
                initFunc();
            }
        } else {
            history.push("/");
            showAlrtState(
                "Warning",
                "Dear user, please login to see your dashboard!"
            );
            setTimeout(() => {
                setShowLoginModal(true);
            }, 3000);
        }
        //eslint-disable-next-line
    }, []);

    useLayoutEffect(() => {
      if(isAdmin){
        initFunc();
      }
      //eslint-disable-next-line
    }, [isAdmin])

    const handleClick = (id) => {
        setShowQuesModal(true);
        setQuestionnaireId(id);
    };

    return (
        <div>
            {showSuggModal && <SuggestionModal />}
            {showQuesModal && <QuestionnaireModal />}
            {allQuestionnaires.length === 0 && "Nothing to show!"}
            {credCxt && user && (
                <div
                    style={{ margin: "1% 20%", fontSize: "1.5rem" }}
                    className="d-grid"
                >
                    <div>
                        <b>Name:</b>&nbsp;{user.name}
                    </div>
                    <div>
                        <b>Email:</b>&nbsp;{user.email}
                    </div>
                </div>
            )}
            {allQuestionnaires.map((s, i) => {
                return (
                    <div
                        key={i}
                        style={{ margin: "1% 20%" }}
                        className="d-grid"
                    >
                        <Button
                            size="lg"
                            variant="success"
                            onClick={() => handleClick(s._id)}
                        >
                            {i + 1}. View Questionnaire submitted on {toDate(s.submissiondate)} {isAdmin?`(User Id #${s.user})`:""}
                            <br />
                        </Button>
                    </div>
                );
            })}
        </div>
    );
};

export default Dashboard;
