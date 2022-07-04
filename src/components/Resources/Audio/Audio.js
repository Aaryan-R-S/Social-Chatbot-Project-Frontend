import { React } from 'react';
import { Container, Row, Table } from 'react-bootstrap';

import ReactAudioPlayer from 'react-audio-player';

const Audio = () => {

    const audioList = [
        {
            title : 'GGS Page-1 to 8',
            link : 'https://docs.google.com/uc?export=open&id=1RRZspEDD1Q4OTAnbN3SYhTsDLkl80UXy'
        },
        {
            title : 'GGS Page-9 to 16',
            link : 'https://docs.google.com/uc?export=open&id=18rsys-Qi6ZbJ2dCZExEYCTG_14dOLODa',
        },
        {
            title : 'GGS Page-17 to 24',
            link : 'https://docs.google.com/uc?export=open&id=1JfX8QuOwuS929CLLjagubnPOsg8Fuasz'
        }
    ]

    return(
        <Container 
            style={{
                width:'50%',
                paddingTop : '5%',
            }}>
            <Row style = {{paddingTop : 10}}>
                <Table bordered hover style = {{
                    textAlign : 'center',
                }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Audio</th>
                        </tr>
                    </thead>
                    <tbody>
                        { audioList.map( (audio) => 
                            <tr>
                                <td>
                                    {audio['title']}
                                </td>      
                                <td>
                                    <ReactAudioPlayer
                                        src={audio['link']}
                                        controls
                                        />
                                </td>                          
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );

};

export default Audio;