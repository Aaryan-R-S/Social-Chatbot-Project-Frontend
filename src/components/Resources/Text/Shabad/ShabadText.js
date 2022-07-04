import { React, useState } from 'react';
// import { Card, ButtonBase, CardContent, Typography } from '@material-ui/core';
import { Modal, Button } from 'react-bootstrap';

const ShabadText = ({title, text}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cardStyle = {
        backgroundColor : '#ffffff',
        borderRadius : '20px',
    };

    const titleStyle = {
        fontFamily : 'Open Sans',
        fontWeight : '500',
    };

    const textStyle = {
        fontFamily : 'Open Sans',
        fontWeight : '100',
    };

    const cardClickHandler = () => {
        console.log(text);
        handleShow();
    };

    return (
        <>
            {/* <Card style={cardStyle}>  
                <ButtonBase
                    onClick={cardClickHandler}>
                    <CardContent> 
                        <Typography style={titleStyle}>
                            {title}
                        </Typography>
                    </CardContent>
                </ButtonBase>
            </Card> */}
            <Modal 
                show={show} 
                onHide={handleClose}>
                <Modal.Header >
                <Modal.Title style={titleStyle}>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body 
                    style={textStyle}> 
                    {text.map( (line) => 
                        <>
                        <p style={{margin:'2%'}}>
                            {line+'.'}
                        </p>
                        </>
                    )} 
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShabadText;