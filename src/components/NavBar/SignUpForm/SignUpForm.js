import {React} from 'react';
import {Form, Button} from 'react-bootstrap';
import { confidentialityEnsured } from '../../HomePage/HomePageContent.js';

// Make signup attempt
// If successful show success toast and store authToken
// else show failure toast with exact error and clear form

const SignUpForm = () => {

    const singUpHandler = (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        console.log(name, email, password);
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