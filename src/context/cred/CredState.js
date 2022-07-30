import { useState } from "react";
import CredContext from "./credContext.js";

const CredState = (props) => {
  const url = "http://localhost:5000";

    // eslint-disable-next-line 
  const [credCxt, setCredCxt] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
        return true;
      }
      else{
        localStorage.removeItem("authTokenSC");
        showAlrtState("Warning", typeof res.errors === 'string'? res.errors:res.errors[0].msg);
        setCredCxt(false);
        //   alert(typeof res.errors === 'string'? res.errors:res.errors[0].msg);
      }
    return false;
  }

  return (
    <CredContext.Provider value={{ url, credCxt, setCredCxt, alrtState, showAlrtState, showLoginModal, setShowLoginModal, checkCredAuthToken}}>
      {props.children}
    </CredContext.Provider>
  )
}

export default CredState;