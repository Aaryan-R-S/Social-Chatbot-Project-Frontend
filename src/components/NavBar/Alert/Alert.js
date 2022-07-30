import {React, useContext} from "react";
import credContext from '../../../context/cred/credContext';

export default function Alert() {
    const context = useContext(credContext);
    const {alrtState} = context;

  return (
    <div style={{height:'60px'}}>
      {alrtState.vis && <div className={`alert alert-${alrtState.type.toLowerCase()} alert-dismissible fade show`} style={{fontSize:"1.5rem", textAlign:"center"}} role="alert">
        <strong>{alrtState.type}</strong>: {alrtState.msg}
      </div>}
    </div>
  );
}