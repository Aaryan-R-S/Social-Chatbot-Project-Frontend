import React, {useContext, useLayoutEffect} from 'react'
import { useHistory } from 'react-router-dom';
import credContext from '../../context/cred/credContext.js';

const Chat = ()=> {
  
  const history = useHistory();
  const context = useContext(credContext);
  const {credCxt, showAlrtState, setShowLoginModal, checkCredAuthToken} = context;

  useLayoutEffect(() => {
    // if(localStorage.getItem('authTokenSC')){
    //   checkCredAuthToken();
    // }
    if(localStorage.getItem('authTokenSC')){
      if(checkCredAuthToken()===false){
        history.push('/');
        setTimeout(() => {
          setShowLoginModal(true);
        }, 3000);
      }
      else{
        showAlrtState("Success", "Dear user, Welcome to your dashboard!");
        setShowLoginModal(false);
      }
    }
    else{
      history.push('/');
      showAlrtState("Warning", "Dear user, please login to see your dashboard!");
      setTimeout(() => {
        setShowLoginModal(true);
      }, 3000);
    }
      //eslint-disable-next-line
    }, [])

  return (
  <div>
    {credCxt && "Nothing to show!"}
  </div>
  )
}

export default Chat;