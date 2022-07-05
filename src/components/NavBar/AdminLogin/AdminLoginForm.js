import {React} from 'react';
import {Form, Button} from 'react-bootstrap';

// Make login attempt
// If successful show success toast and store authToken
// else show failure toast and clear form

const AdminLoginForm = () => {

    const adminLoginHandler = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        console.log(email, password);
    };

    return (
        <Form onSubmit = {adminLoginHandler} style={{ fontFamily : 'Open Sans' }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email ID</Form.Label>
                <Form.Control type="email" placeholder="Enter your email id" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>

            <Button style={{    
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

export default AdminLoginForm;