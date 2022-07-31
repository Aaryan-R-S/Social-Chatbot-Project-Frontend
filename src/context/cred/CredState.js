import { useState } from "react";
import CredContext from "./credContext.js";

const CredState = (props) => {
  const url = "http://localhost:5000";

    // eslint-disable-next-line 
  const [credCxt, setCredCxt] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState({});
  const [currQuestionnaire, setCurrQuestionnaire] = useState([]);

  const [alrtState, setAlrtState] = useState({
    vis: false,
    msg: "",
    type: ""
  });
  
  const showAlrtState = (t, m)=>{
    setAlrtState({
      vis: true,
      msg: m,
      type: t
    })
    setTimeout(() => {
      setAlrtState({
        vis: false,
        msg: "",
        type: ""
      });
      }, 3000);
  }

  const checkCredAuthToken = async()=>{
    const response = await fetch(`${url}/api/auth/checkLogin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authTokenSC")
      },
    });
    const res = await response.json();
  //   console.log(res);
    if(res.success){
        // showAlrtState("Success", "Dear user, you have successfully login!");
        setCredCxt(true);
        setUser(res.user);
        // console.log(res.user);
        // console.log(user);
        if(localStorage.getItem("currQuestionnaireSC")){
          const ques = await JSON.parse(localStorage.getItem("currQuestionnaireSC"));
          // console.log("saved questionnaire", ques);
          setCurrQuestionnaire(ques);
          res.ques = ques;
        }
        else{
          setCurrQuestionnaire([]);
          res.ques = [];
        }
        return res;
      }
      else{
        localStorage.removeItem("authTokenSC");
        showAlrtState("Warning", typeof res.errors === 'string'? res.errors:res.errors[0].msg);
        setCredCxt(false);
        setUser({});
        setCurrQuestionnaire([]);
        //   alert(typeof res.errors === 'string'? res.errors:res.errors[0].msg);
      }
    return res;
  }

  return (
    <CredContext.Provider value={{ url, credCxt, setCredCxt, alrtState, showAlrtState, showLoginModal, setShowLoginModal, checkCredAuthToken, user, setUser, currQuestionnaire, setCurrQuestionnaire}}>
      {props.children}
    </CredContext.Provider>
  )
}

export default CredState;