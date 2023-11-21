import React from 'react';
import { Container, Button, Col, Row } from 'react-bootstrap';
// import ReactPlayer from 'react-player';
import './HomePage.css'; // You can create a CSS file for custom styling
import video from './portability_web_app_1080p.mp4'

const HommePage = () => {
     return (
          <div className="homepage-container">
               <video className="video-background" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
              {/* <ReactPlayer
                  className="video-background"
                  url={video}
                  playing={true}
                  loop={true}
                  muted={true}
                  width="1366px"
                  height="768px"
              /> */}
             <Container className="content-container">
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button className="top-right-button" variant="primary" href='/login'>
                            Click Me
                        </Button>
                    </Col>
                </Row>
            </Container>
          </div>
      );
};

export default HommePage;