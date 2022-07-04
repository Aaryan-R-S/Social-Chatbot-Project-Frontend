import { React, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import counsellingImage from '../../images/webbg.jpg';
import CardInfo from '../Card/CardInfo.js';
import { intro } from './HomePageContent.js';
import ServiceInfo from './ServiceInfo/ServiceInfo.js';
import {
    container
} from './HomePageStyle.js';
import {
    buttonStyle, modalButtonStyle, modalButtonStyleHover,
} from '../NavBar/NavBarButtons/NavBarButtonStyle.js';

const HomePage = () => {

    const history = useHistory();

    const handleClick = (value) => {
        setSelected(value);
        history.push(value);
    };
    const [selected, setSelected] = useState('');


    return (
        <div class={container}>
            <Container fluid>
                <Row >
                    <ServiceInfo />
                </Row>
                {/* <Row style={{backgroundColor : "#dfebe9"}}>
                    <CardInfo 
                        title={'Services Provided by Us'} 
                        text = {''}/>
                </Row> */}
                <Row style={{marginTop : '0px'}}>
                    <Col>
                        <CardInfo 
                            title={'About Our Portal'} 
                            text = {intro}/>
                    </Col>                    
                    <Col>
                        <img src={counsellingImage} alt="counselling_image" height="100%" width="100%"/>
                    </Col>
                </Row>
                <Row style={{margin :"5%"}}>
                    <Col>
                        <Button 
                            size="lg" 
                            onClick={()=>{handleClick("terms")}}
                            style={selected === "Terms and Conditions" ? modalButtonStyleHover : modalButtonStyle} 
                            variant="default">Terms and Conditions</Button>
                    </Col>
                    <Col>
                        <Button 
                            size="lg" 
                            onClick={()=>{handleClick("policy")}}
                            style={selected === "Privacy Policy" ? modalButtonStyleHover : modalButtonStyle} 
                            variant="default">Privacy Policy</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;