import { React, useState, useEffect } from 'react';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';


import VideoRow from './VideoRow';

const VideosMain = () => {
    const [videosList, setVideosList] = useState([]);
    const [dropDownText, setDropDownText] = useState('Select Category');
    const [allVideos, setAllVideos] = useState([]); 


    useEffect(() =>{
        fetch('https://social-chatbot-backend.herokuapp.com/get_video_playlist/', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Headers" : "*"
            }})
            .then(function(response) {
                console.log(response);
                return response.json()
            })
            .then(function(result){
                console.log(result);        
                setVideosList(result['result']);
                setAllVideos(result['result']);
            });
    },[])

    const selectHandler = (event) => {
        console.log(event);
        if(event === 'All'){
            setVideosList(allVideos);
            return;
        }
        const filteredVideos = allVideos.filter( (video) => video.KeyWord === event)
        setDropDownText(event);
        setVideosList(filteredVideos);
    };



    return (
        <Container>
            <Row 
                className="text-center"
                style = {{
                    marginTop : 10,
                }}>
                <Col xs={12}>
                    <Dropdown 
                        onSelect={selectHandler}>
                        <Dropdown.Toggle 
                            variant="primary" 
                            id="dropdown-basic"
                            style={{
                                backgroundColor : "#dfebe9",
                                color : 'black',
                                fontStyle : "Inter",
                                borderColor : 'transparent',
                            }}>
                            {dropDownText}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={'Anxiety'}>Anxiety</Dropdown.Item>
                            <Dropdown.Item eventKey={'Depression'}>Depression</Dropdown.Item>
                            <Dropdown.Item eventKey={'Stress'}>Stress</Dropdown.Item>
                            <Dropdown.Item eventKey={'All'}>All</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row style = {{paddingTop : '4%'}}>
                { videosList.map( (video, index) => 
                    <Col lg = '2' style = {{width : '25%', paddingBottom : '4%'}}>
                        <VideoRow video={video} index={index} />
                    </Col>
                    
                )}      
            </Row>
        </Container>
    );  
};

export default VideosMain;