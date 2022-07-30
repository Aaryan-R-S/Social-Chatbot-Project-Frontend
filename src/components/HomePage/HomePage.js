import { React, useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CardInfo from '../Card/CardInfo.js';
import { intro } from './HomePageContent.js';
import ServiceInfo from './ServiceInfo/ServiceInfo.js';
import counsellingImage from '../../images/webbg.jpg';
import { container } from './HomePageStyle.js';
import { modalButtonStyle, modalButtonStyleHover } from '../NavBar/NavBarButtons/NavBarButtonStyle.js';

import credContext from '../../context/cred/credContext.js';

const HomePage = () => {
    const context = useContext(credContext);
    const {checkCredAuthToken} = context;
    useEffect(() => {
        if(localStorage.getItem('authTokenSC')){
          checkCredAuthToken();
        }
        //eslint-disable-next-line
    }, [])

    const [hover1, setHover1] = useState();
    const [hover2, setHover2] = useState();

    const handleMouseIn1 = () => {
        setHover1(true);
    };

    const handleMouseOut1 = () => {
        setHover1(false);
    };

    const handleMouseIn2 = () => {
        setHover2(true);
    };

    const handleMouseOut2= () => {
        setHover2(false);
    };

    return (
        <div className={container}>
            <Container fluid>
                <Row >
                    <ServiceInfo />
                </Row>
                <Row style={{backgroundColor : "#dfebe9"}}>
                    <CardInfo
                        title={'About our Portal'} 
                        text = {''}/>
                </Row>
                <Row>
                    <Col style={{"marginTop":"5rem"}}>
                        <CardInfo 
                            title={''} 
                            text = {intro}/>
                    </Col>                    
                    <Col>
                        <img src={counsellingImage} alt="counselling_image" height="100%" width="100%"/>
                    </Col>
                </Row>
                <Row style={{margin :"5%"}}>
                    <Col>
                        <Button 
                            as={Link} to='terms'
                            size="lg" 
                            style={hover1?modalButtonStyleHover:modalButtonStyle} 
                            onMouseOver={handleMouseIn1} onMouseOut={handleMouseOut1}
                            variant="default">Terms and Conditions</Button>
                    </Col>
                    <Col>
                        <Button 
                            as={Link} to='policy'
                            size="lg" 
                            style={hover2?modalButtonStyleHover:modalButtonStyle} 
                            onMouseOver={handleMouseIn2} onMouseOut={handleMouseOut2}
                            variant="default">Privacy Policy</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;