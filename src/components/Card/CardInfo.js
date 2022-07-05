import { React } from 'react';
import { Card } from 'react-bootstrap';

import {
    cardStyle,
    titleStyle,
    textStyle,
} from './CardInfoStyle.js';

const CardInfo = ({title, text}) => {
    
    return (
        <div>
            <Card style={cardStyle}>                    
                <Card.Body > 
                    <Card.Title style={titleStyle}> {title} 
                    </Card.Title>
                    <Card.Text style={textStyle}> {text} </Card.Text> 
                </Card.Body>
            </Card>
        </div>
    );
};

export default CardInfo;