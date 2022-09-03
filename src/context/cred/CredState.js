import { useState } from "react";
import CredContext from "./credContext.js";

const CredState = (props) => {
    // const url = "http://localhost:5000";
    const url = "https://social-chatbot-backend-iiitd.herokuapp.com/";

    // eslint-disable-next-line
    const [credCxt, setCredCxt] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSuggModal, setShowSuggModal] = useState(false);
    const [showQuesModal, setShowQuesModal] = useState(false);
    const [user, setUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [currQuestionnaire, setCurrQuestionnaire] = useState([]);
    const [questionAnswer, setQuestionAnswer] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [videos, setVideos] = useState([]);
    const [questionnaireId, setQuestionnaireId] = useState("");

    const [alrtState, setAlrtState] = useState({
        vis: false,
        msg: "",
        type: "",
    });

    const showAlrtState = (t, m) => {
        setAlrtState({
            vis: true,
            msg: m,
            type: t,
        });
        setTimeout(() => {
            setAlrtState({
                vis: false,
                msg: "",
                type: "",
            });
        }, 3000);
    };

    const checkCredAuthToken = async () => {
        const response = await fetch(`${url}/api/auth/checkLogin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authTokenSC"),
            },
        });
        const res = await response.json();
        // console.log(res);
        if (res.success) {
            // showAlrtState("Success", "Dear user, you have successfully login!");
            setCredCxt(true);
            setUser(res.user);
            setIsAdmin(false);
            // console.log(res.user);
            // console.log(user);
            if (localStorage.getItem("currQuestionnaireSC")) {
                const ques = await JSON.parse(
                    localStorage.getItem("currQuestionnaireSC")
                );
                const qna = localStorage.getItem("currQnaSC")
                    ? await JSON.parse(localStorage.getItem("currQnaSC"))
                    : [];
                const sugg = localStorage.getItem("currSuggestionsSC")
                    ? await JSON.parse(
                          localStorage.getItem("currSuggestionsSC")
                      )
                    : [];
                const vid = localStorage.getItem("currVideosSC")
                    ? await JSON.parse(localStorage.getItem("currVideosSC"))
                    : [];
                setCurrQuestionnaire(ques);
                setQuestionAnswer(qna);
                setSuggestions(sugg);
                setVideos(vid);
                res.ques = ques;
                res.qna = qna;
                res.sugg = sugg;
                res.vid = vid;
            } else {
                setCurrQuestionnaire([]);
                setQuestionAnswer([]);
                setSuggestions([]);
                setVideos([]);
                res.ques = [];
                res.qna = [];
                res.sugg = [];
                res.vid = [];
            }
            return res;
        } else {
            const response1 = await fetch(`${url}/api/authAdmin/checkLogin`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("authTokenSC"),
                },
            });
            const res1 = await response1.json();
            if (res1.success) {
                setCredCxt(true);
                setUser(res1.user);
                setIsAdmin(true);
                return res1;
            }
            else{
              localStorage.removeItem("authTokenSC");
              showAlrtState(
                  "Warning",
                  typeof res.errors === "string" ? res.errors : res.errors[0].msg
              );
              setCredCxt(false);
              setUser({});
              setCurrQuestionnaire([]);
              setQuestionAnswer([]);
              setSuggestions([]);
              setVideos([]);
              //   alert(typeof res.errors === 'string'? res.errors:res.errors[0].msg);
            }
        }
        return res;
    };

    return (
        <CredContext.Provider
            value={{
                url,
                credCxt,
                setCredCxt,
                alrtState,
                showAlrtState,
                showLoginModal,
                setShowLoginModal,
                showSuggModal,
                setShowSuggModal,
                showQuesModal,
                setShowQuesModal,
                checkCredAuthToken,
                user,
                setUser,
                isAdmin,
                setIsAdmin,
                currQuestionnaire,
                setCurrQuestionnaire,
                questionAnswer,
                setQuestionAnswer,
                suggestions,
                setSuggestions,
                videos,
                setVideos,
                questionnaireId,
                setQuestionnaireId,
            }}
        >
            {props.children}
        </CredContext.Provider>
    );
};

export default CredState;
