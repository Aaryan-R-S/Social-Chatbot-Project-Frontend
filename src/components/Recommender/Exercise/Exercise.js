import { React } from 'react';
import {Container, Row } from 'react-bootstrap';
import yoga from '../images/yoga.jpg'
import CardInfo from '../../Card/CardInfo';

const Exercise = () => {
    const largeHeading = "Exercises"

    const headings = [
        'Stretching: Focus on flexibility',
        'Deep Breathing',
        'Surya Namaskar'
    ]

    const content = [
        'Research has shown that stretching can help improve flexibility, and, consequently, the range of motion of your joints. Better flexibility may: Improve your performance in physical activities, Decrease your risk of injuries, Help your joints move through their full range of motion, Enable your muscles to work most effectively',

        'Inhaling, exhaling a few deep breaths every day could make a drastic improvement in your lifestyle. No, we are not exaggerating when we say this. Taking just a few moments each day to practice some deep breathing exercises can decrease stress, relax your mind, body and can help you sleep better. Breathing correctly is important for your overall well being.',

        'The benefits of Surya Namaskar are manifold. It helps in better functioning of the body and mental faculties. Here are a few benefits of Surya Namaskar: The postures are a right blend of warm-ups and asanas. It helps to keep you disease-free and healthy, Regular practice promotes balance in the body, Improves blood circulation, Strengthens the heart, Tones the digestive tract, Stimulates abdominal muscles, respiratory system, lymphatic system, spinal nerves and other internal organs. Psychologically, it regulates the interconnectedness of body, breath, and mind, thus making you calmer and boosting the energy levels with sharpened awareness.'
    ]


    return (
        <div>
            <h1 style={{textAlign:"center", fontSize:"3rem", marginTop:"2rem", marginBottom:"1rem"}}>{largeHeading}</h1>
            <div style={{textAlign:"center", margin:"auto"}}>
                <img src={yoga} alt="food_image" height="auto" width="600px"/>
            </div>
            <Container  style = {{padding : '5%', paddingTop:'0%'}}>
                { headings.map( (heading, index) => {
                    const paragraph = content[index];
                    return (

                    <Row key={heading}
                        style={{
                            padding:'1%',
                        }}>
                        <CardInfo
                            title={heading}
                            text={paragraph}/>
                    </Row>
                    );
                })}
            </Container>
        </div>
    );
};

export default Exercise;