import { React, useState } from 'react';
import { Button, ButtonToolbar, Modal, Container, Row, Col, Navbar} from 'react-bootstrap';
// import { useSelector } from 'react-redux';

import {
    buttonStyle, modalButtonStyle, modalButtonStyleHover,
} from './NavBarButtonStyle.js';
import LoginForm from '../LoginForm/LoginForm.js';
import SignUpForm from '../SignUpForm/SignUpForm.js';
import AdminLoginForm from '../AdminLogin/AdminLoginForm.js';

const NavBarButtons = () => {

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState('SignUp');
    // const user = useSelector(state => state.user);
    // console.log(user);

    const handleClose = () => {
        setShow(false);
        setSelected('SignUp');
    };
    const handleShow = () => setShow(true);

    const LoginHandler = () => {
        // setLoginModal(true);
        handleShow();
    };

    const handleClick = (value) => {
        setSelected(value);
    };

    return (
        <>
        {true && 
         <>
            <Navbar.Text style={{
                fontFamily : "Inter",
                color : "black",
                fontSize : "2.5vh",
                fontWeight : "400",
            }}>
                Welcome, User 
            </Navbar.Text>
         </>
        }
        {true && 
        <>
            <ButtonToolbar>
                <Button size="lg" variant="default" style={buttonStyle} onClick={LoginHandler}>SignUp/Login</Button>
            </ButtonToolbar>
            <Modal 
                show={show} 
                onHide={handleClose}
                centered
                style={{maxWidth : "100%", maxHeight : "100%"}}
                >
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Button 
                                    size="lg" 
                                    onClick={()=>{handleClick("SignUp")}}
                                    style={selected === "SignUp" ? modalButtonStyleHover : modalButtonStyle} 
                                    variant="default">SignUp</Button>
                            </Col>
                            <Col>
                                <Button 
                                    size="lg" 
                                    onClick={()=>{handleClick("Login")}}
                                    style={selected === "Login" ? modalButtonStyleHover : modalButtonStyle} 
                                    variant="default">Login</Button>
                            </Col>
                            <Col>
                                <Button 
                                    size="lg" 
                                    onClick={()=>{handleClick("adminLogin")}}
                                    style={selected === "adminLogin" ? modalButtonStyleHover : modalButtonStyle} 
                                    variant="default">Admin Login</Button>
                            </Col>
                        </Row>
                        <Row style={{marginTop : "5%"}}>
                            {selected === 'SignUp' && 
                                <SignUpForm/>
                            }
                            {selected === 'Login' && 
                                <LoginForm/>
                            }
                            {selected === 'adminLogin' && 
                                <AdminLoginForm/>
                            }
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        }
        </>
    );
};

export default NavBarButtons;