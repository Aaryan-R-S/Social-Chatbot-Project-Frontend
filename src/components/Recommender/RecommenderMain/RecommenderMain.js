import { React } from 'react';
import UserOptions from '../../Dashboard/UserOption/UserOption';
import { useRouteMatch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap/'

const RecommenderMain = () => {

    let { url } = useRouteMatch();
    const labels = [['Diet', `${url}/diet`], 
                    ['Exercises', `${url}/exercise`]
    ];
    
    console.log(url);
    
    return (
        <>
            <Container 
                className = "text-center"
                style={{paddingTop : "15%" }}>
                {labels.map( (label) =>
                    <Row style={{padding : 10}}> 
                        <UserOptions
                            label = {label[0]}
                            link = {label[1]}
                        />
                    </Row>
                )}
            </Container>
        </>
    );
};

export default RecommenderMain;