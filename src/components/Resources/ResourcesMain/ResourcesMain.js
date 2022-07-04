import { React } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap/'

import UserOption from '../../Dashboard/UserOption/UserOption.js';

const ResourcesMain = () =>{

    let { url } = useRouteMatch();
    const labels = [['Texts', `${url}/texts`], 
                    ['Audios', `${url}/audios`],
                    ['Videos', `${url}/videos`]];
    
    console.log(url);

    return (
        <>
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

export default ResourcesMain;