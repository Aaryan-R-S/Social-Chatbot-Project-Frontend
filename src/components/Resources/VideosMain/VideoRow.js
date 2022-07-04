import { React, useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube'


const VideoRow = ({video, index}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const titleStyle = {
        fontFamily : "Inter",
        fontWeight : '500',
    };

    const textStyle = {
        fontFamily : "Inter",
        fontWeight : '100',
    };

    let rating = 0;
    if(video.Likes && video.Dislikes){
        const sum = parseInt(video.Likes) + parseInt(video.Dislikes);
        rating = (video.Likes/sum);
        rating *= 5;
        rating = rating.toFixed(1);
    }

    const cardStyle = {
        width: '100%', 
        height : '100%', 
        borderRadius : '10%', 
        fontFamily : 'Open Sans'
    };

    const clickHandler = (event) => {
        console.log(event);
        handleShow();
    };

    return (
        <>
            <Card 
                style={cardStyle} 
                onClick = {clickHandler} >
                <Card.Img 
                    variant="top" 
                    src={video.Thumbnails} 
                    style={{
                        borderTopLeftRadius : '10%',
                        borderTopRightRadius : '10%',
                    }}/>
                <Card.Body>
                    <Card.Title>{video.Title}</Card.Title>
                    <Card.Text>
                        Duration : {video['Duration ']}
                        <br></br>
                        Helpful for : {video.KeyWord}
                        { rating !== 0 &&
                            <>
                                <br></br>
                                Rating : {rating}
                            </>
                        }
                        <br></br>
                        Views : {video.Views}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Modal 
                show={show} 
                onHide={handleClose}
                >
                <Modal.Header >
                <Modal.Title style={titleStyle}>{video.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={textStyle}> 
                    <ReactPlayer 
                        url={`https://www.youtube.com/watch?v=${video.Id}`} 
                        width='100%'
                        controls
                        /> 
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default VideoRow;