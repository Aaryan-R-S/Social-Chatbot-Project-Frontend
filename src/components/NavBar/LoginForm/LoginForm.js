import {React} from 'react';
import {Form, Button} from 'react-bootstrap';
// import { useDispatch } from 'react-redux';

// import { userAuthenticationOptions } from '../../../store/userAuthenticationSlice.js';

const LoginForm = () => {

    // const dispatch = useDispatch();

    const loginHandler = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        // fetch('http://192.168.1.187:8010/login/', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     'email' : email,
        //     'password' : password
        // }),
        //   headers: {"Content-type": "application/json; charset=UTF-8"}     
        // }).then(function(response) {
        //     return response.json()
        // }).then(function(result){
        //     const userId = result['result']['userId'];
        //     const name = result['result']['name'];
        //     const symptoms = result['result']['symptoms']
        //     dispatch(userAuthenticationOptions.setName(name));
        //     dispatch(userAuthenticationOptions.setEmailId(email));
        //     dispatch(userAuthenticationOptions.setPassword(password));
        //     dispatch(userAuthenticationOptions.setUserId(userId));
        //     dispatch(userAuthenticationOptions.setSymptoms(symptoms));

        // }).catch(function(response){
        //     console.log("error")
        // });
    };

    return (
        <Form
            onSubmit = {loginHandler} 
            style={{
                fontFamily : 'Open Sans',
            }}>
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
                    Login
                </Button>
            </Form>
    );
};

export default LoginForm;