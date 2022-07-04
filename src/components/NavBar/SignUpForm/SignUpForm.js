import {React} from 'react';
import {Form, Button} from 'react-bootstrap';
// import { useDispatch } from 'react-redux';

// import { userAuthenticationOptions } from '../../../store/userAuthenticationSlice.js';
import { confidentialityEnsured } from '../../HomePage/HomePageContent.js';

const SignUpForm = () => {

    // const dispatch = useDispatch();

    const singUpHandler = (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        // dispatch(userAuthenticationOptions.setName(name));
        // dispatch(userAuthenticationOptions.setEmailId(email));
        // dispatch(userAuthenticationOptions.setPassword(password));

        // fetch('http://192.168.1.187:8010/signup/', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     'name' : name,
        //     'email' : email,
        //     'password' : password
        // }),
        //   headers: {"Content-type": "application/json; charset=UTF-8"}     
        // }).then(function(response) {
        //     return response.json()
        // }).then(function(result){
        //     const userId = result['result'];
        //     dispatch(userAuthenticationOptions.setUserId(userId));
        // }).catch(function(response){
        //     console.log("error")
        // });
    };

    const confidentialityEnsuredStyle = {
        color : 'red',
    };

    return (
        <Form
            onSubmit = {singUpHandler} 
            style={{
                fontFamily : 'Open Sans',
            }}>
                <Form.Group className="mb-3">
                    <Form.Text as='p'>
                        {'Note: ' + confidentialityEnsured}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button 
                    style={{    
                        backgroundColor : "#dfebe9",
                        fontFamily : "Inter",
                        color : "black",
                        borderColor: "transparent",
                        fontSize : "2vh",
                        fontWeight : "300",
                    }}
                    type='submit'
                    >
                    Sign Up!
                </Button>
            </Form>
    );
};

export default SignUpForm;