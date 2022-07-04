import { React, useState, useEffect } from 'react';
import { Container, Row} from 'react-bootstrap';

import ShabadText from '../Shabad/ShabadText.js';
import Stories from '../Stories/Stories.js';
import { getStories, getShabads, containerStyle, rowStyle } from './TextMainUtility.js';

const TextMain = () => {

    const [shabadList, setShabadList] = useState([]);
    const [storiesList, setStoriesList] = useState([]);

    // useEffect( async() => {
    //     const shabads = await getShabads();
    //     setShabadList([...shabads]);
    //     // const stories = await getStories();
    //     // setStoriesList([...stories]);
    // },[])

    return (
        <Container style={containerStyle}>
            {shabadList.map( (shabad) => {
                return (
                    <Row style={rowStyle}>
                        <ShabadText  
                            title={shabad['Rahao']}
                            text={shabad['Lines']}
                            />
                    </Row>
                );
            })}
            {storiesList.map( (story) => {
                return(
                    <>
                    <Row style={rowStyle}>
                        <Stories  
                            title={story['title']}
                            text={story['text']}
                            moral={story['moral']}
                            />
                    </Row>
                    </>
                );
            } )}
        </Container>
    );
};

export default TextMain;