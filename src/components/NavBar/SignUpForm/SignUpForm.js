import {React, useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { confidentialityEnsured } from '../../HomePage/HomePageContent.js';
import { useHistory } from 'react-router-dom';
import credContext from '../../../context/cred/credContext.js';

// Make signup attempt
// If successful show success toast and store authToken
// else show failure toast with exact error and clear form

const SignUpForm = () => {
    const context = useContext(credContext);
    // console.log(context);
    // eslint-disable-next-line 
    const {url, credCxt, setCredCxt, showAlrtState, setShowLoginModal} = context;

    let history = useHistory();
    
    // eslint-disable-next-line 
    const [credentials, setCredentials] = useState({name:"", email:"", password:""});

    const singUpHandler = async (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        // console.log(name, email, password);
        setCredentials({name, email, password})

        const response = await fetch(`${url}/api/auth/addUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
          });
          const res = await response.json();
        //   console.log(res);
          if(res.success){
              showAlrtState("Success", "Dear user, you have successfully signed in!");
              localStorage.setItem('authTokenSC', res.authToken);
              setCredCxt(true);
              history.push("/");
            }
            else{
                showAlrtState("Warning", typeof res.errors === 'string'? res.errors:res.errors[0].msg);
                setCredCxt(false);
                //   alert(typeof res.errors === 'string'? res.errors:res.errors[0].msg);
            }
            setShowLoginModal(false);
    };

    return (
        <Form onSubmit = {singUpHandler} style={{ fontFamily : 'Open Sans'}}>
            <Form.Group className="mb-3">
                <Form.Text as='p' style={{ color : 'green'}}>
                    <b>Note: </b> {confidentialityEnsured}
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter your name" />
            </Form.Group>

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
                Sign Up
            </Button>
        </Form>
    );
};

export default SignUpForm;