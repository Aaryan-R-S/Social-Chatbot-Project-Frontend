import { React, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Container, Row, Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';


import UserOption from '../../Dashboard/UserOption/UserOption.js';

const ResourcesHomePage = () =>{

    let { url } = useRouteMatch();
    const labels = [
        ['You can read, watch, or listen to some helpful things here.', `${url}/resources`], 
        ['Would you like to see our recommendations?', `${url}/recommendation`]
    ];
    
    const user = useSelector(state => state.user);
    console.log(url);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        handleClose();
    };

    useEffect(() =>{
        if(user.symptoms.length === 0){
            handleShow();
        }
    },[])

    return (
        <>
            {
            <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Which symptoms do you have among these?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Depression" />
                    <Form.Check type="checkbox" label="Anxiety" />
                    <Form.Check type="checkbox" label="Stress" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          }
            <Container 
                className = "text-center"
                style={{paddingTop : "15%" }}>
                {labels.map( (label) =>
                    <Row style={{padding : 10}}> 
                        <UserOption
                            label = {label[0]}
                            link = {label[1]}
                        />
                    </Row>
                )}
            </Container>
        </>
    );
};

export default ResourcesHomePage;