import { React, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonToolbar, Modal, Container, Row, Col} from 'react-bootstrap';
import { buttonStyle, modalButtonStyle, modalButtonStyleHover } from './NavBarButtonStyle.js';
import LoginForm from '../LoginForm/LoginForm.js';
import SignUpForm from '../SignUpForm/SignUpForm.js';
import AdminLoginForm from '../AdminLogin/AdminLoginForm.js';
import credContext from '../../../context/cred/credContext.js';

// If login show name as button which will redirect to see questionnaires along with logout option
// else show login/signup button

const NavBarButtons = () => {
    let history = useHistory();

    const context = useContext(credContext);
    const {credCxt, setCredCxt, showAlrtState, showLoginModal, setShowLoginModal} = context;
    
    const [selected, setSelected] = useState('SignUp');

    const handleClose = () => {
        setShowLoginModal(false);
        setSelected('SignUp');
    };

    const handleShow = () => setShowLoginModal(true);

    const LoginHandler = () => {
        handleShow();
    };

    const handleClick = (value) => {
        setSelected(value);
    };

    const handleLogout = ()=>{
        showAlrtState("Success", "You have successfully Logged Out!");
        setCredCxt(false);
        localStorage.removeItem("authTokenSC");
        handleClose();
        history.push("/");
    }

    return (
        <>
            {/* If already login */}
            {credCxt && 
                <Button size="lg" variant="default" style={buttonStyle} onClick={handleLogout}>Logout</Button>
            }
            {/* If not login */}
            {!credCxt && 
            <>
                <ButtonToolbar>
                    <Button size="lg" variant="default" style={buttonStyle} onClick={LoginHandler}>SignUp/Login</Button>
                </ButtonToolbar>
                <Modal 
                    show={showLoginModal} 
                    onHide={handleClose}
                    centered
                    style={{maxWidth : "100%", maxHeight : "100%"}}
                    >
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <Button 
                                        size="normal" 
                                        onClick={()=>{handleClick("SignUp")}}
                                        style={selected === "SignUp" ? modalButtonStyleHover : modalButtonStyle} 
                                        variant="default">Sign Up</Button>
                                </Col>
                                <Col>
                                    <Button 
                                        size="normal" 
                                        onClick={()=>{handleClick("Login")}}
                                        style={selected === "Login" ? modalButtonStyleHover : modalButtonStyle} 
                                        variant="default">Login</Button>
                                </Col>
                                <Col>
                                    <Button 
                                        size="normal" 
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