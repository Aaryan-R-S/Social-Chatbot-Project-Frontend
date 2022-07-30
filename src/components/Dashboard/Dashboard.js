import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import credContext from '../../context/cred/credContext.js';

const Chat = ()=> {
  
  const history = useHistory();
  const context = useContext(credContext);
  const {credCxt, showAlrtState, setShowLoginModal} = context;

  useEffect(()=>{
    if(!credCxt){
      history.push('/');
      showAlrtState("Warning", "Dear user, please login to see your dashboard!");
      setTimeout(() => {
        setShowLoginModal(true);
      }, 3000);
    }
    else{
      showAlrtState("Success", "Dear user, Welcome to your dashboard!");
      setShowLoginModal(false);
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