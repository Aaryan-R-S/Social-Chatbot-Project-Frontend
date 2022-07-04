import { React, useState } from 'react';
import { Row, Col,  Carousel } from 'react-bootstrap';
    
import services from '../../../images/services.jpg';
import chat_support from './images/chat_support.jpg';
import helpingHand from './images/helping-hand.png';

import {
    prevIcon,
    nextIcon,
    carouselStyle,
    servicesImageStyle,
    servicesProvidedStyle,
    servicesProvidedWrapperStyle,
    chatbotTitle,
    chatbotInfo,
    helpTitle,
    helpInfo,
} from './ServiceInfoStyle.js';
import CardInfo from '../../Card/CardInfo';

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
        </Carousel>
    );
};

export default ServiceInfo;