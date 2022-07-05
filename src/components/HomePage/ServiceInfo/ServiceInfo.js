import { React, useState } from 'react';
import { Row, Col,  Carousel } from 'react-bootstrap';
import CardInfo from '../../Card/CardInfo';
import services from './images/dashboard.jpg';
import chat_support from './images/chat_support.jpg';
import helpingHand from './images/helping-hand.png';
import {
    prevIcon,
    nextIcon,
    carouselStyle,
    servicesImageStyle,
    servicesProvidedWrapperStyle,
    chatbotTitle,
    chatbotInfo,
    helpTitle,
    helpInfo,
    dashboardTitle,
    dashboardInfo,
} from './ServiceInfoStyle.js';


const ServiceInfo = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel 
            activeIndex={index}
            prevIcon={prevIcon}
            prevLabel={''}
            nextIcon={nextIcon}
            nextLabel={''}
            style={carouselStyle}
            interval={3000}
            onSelect={handleSelect}
            >
            <Carousel.Item>
                <Row>
                    <Col xs={6}>
                        <img src={chat_support} alt="chat support" height="80%" width="60%" style={servicesImageStyle} />
                    </Col>
                    <Col xs={4}>
                        <div style={servicesProvidedWrapperStyle}>
                            <CardInfo 
                                title={chatbotTitle}
                                text={chatbotInfo}   
                            />
                        </div>
                    </Col>
                </Row>
            </Carousel.Item>
            <Carousel.Item>
                <Row>
                    <Col xs={6}>
                        <img src={helpingHand} alt="helping hand" height="80%" width="60%" style={servicesImageStyle} />
                    </Col>
                    <Col xs={4}>
                        <div style={servicesProvidedWrapperStyle}>
                            <CardInfo 
                                title={helpTitle}
                                text={helpInfo}   
                            />
                        </div>
                    </Col>
                </Row>
            </Carousel.Item>
            <Carousel.Item>
                <Row>
                    <Col xs={6}>
                        <img src={services} alt="personalized dashboard" height="80%" width="60%" style={servicesImageStyle} />
                    </Col>
                    <Col xs={4}>
                        <div style={servicesProvidedWrapperStyle}>
                            <CardInfo 
                                title={dashboardTitle}
                                text={dashboardInfo}   
                            />
                        </div>
                    </Col>
                </Row>
            </Carousel.Item>
        </Carousel>
    );
};

export default ServiceInfo;