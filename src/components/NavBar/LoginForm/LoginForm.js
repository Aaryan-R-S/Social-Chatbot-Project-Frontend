import {React, useState, useContext} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import credContext from '../../../context/cred/credContext.js';

// Make login attempt
// If successful show success toast and store authToken
// else show failure toast and clear form

const LoginForm = () => {
    const context = useContext(credContext);
    // console.log(context);
    // eslint-disable-next-line 
    const {url, credCxt, setCredCxt, showAlrtState, setShowLoginModal, checkCredAuthToken} = context;

    let history = useHistory();
    
    // eslint-disable-next-line 
    const [credentials, setCredentials] = useState({name:"", email:"", password:""});

    const loginHandler = async(event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        // console.log(email, password);
        setCredentials({email, password})

        const response = await fetch(`${url}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
          });
          const res = await response.json();
        //   console.log(res);
          if(res.success){
              showAlrtState("Success", "Dear user, you have successfully login!");
              localStorage.setItem('authTokenSC', res.authToken);
              setCredCxt(true);
              checkCredAuthToken();
              history.push("/Social-Chatbot-Project-Frontend");
            }
            else{
                showAlrtState("Warning", typeof res.errors === 'string'? res.errors:res.errors[0].msg);
                setCredCxt(false);
                //   alert(typeof res.errors === 'string'? res.errors:res.errors[0].msg);
            }
            setShowLoginModal(false);
    };

    return (
        <Form onSubmit = {loginHandler} style={{fontFamily : 'Open Sans'}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email ID</Form.Label>
                <Form.Control type="email" placeholder="Enter your email id" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            
            <Button 
                style={{    
                    backgroundColor : "#dfebe9",
                    fontFamily : "Inter",
                    color : "black",
                    borderColor: "transparent",
                    fontSize : "1.3rem",
                    fontWeight : "300",
                }}
                type='submit'
                >
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;