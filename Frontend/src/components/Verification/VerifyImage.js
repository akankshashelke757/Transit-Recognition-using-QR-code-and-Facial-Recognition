import React, {useState} from 'react';
import {Container, Card,  Row, Col,  Button} from 'react-bootstrap';
// import './VerifyImage.css';
import axios from "axios";
import Webcam from "react-webcam";
import Loading from '../Loading';

const url = "http://127.0.0.1:8000";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};



function VerifyImage(props) { 
    const [ImageCaptured , setImageCaptured] = useState('');
    const [picLink, setPicLink] = useState('');
    const [verified, setVerified] = useState('');
    const [loading, setloading] = useState(false);

    const postDetails = async () => {
        //  console.log(props.scanResult)
          setloading(true)
          const data = new FormData();
          data.append("file", ImageCaptured);
          data.append("upload_preset", "shareNote");
          data.append("cloud_name", "imgstoreap");
          await fetch("https://api.cloudinary.com/v1_1/imgstoreap/image/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setPicLink(res.url.toString());
            })
            .catch((err) => {
              console.log(err);
            });

            setloading(false)
        
      };

      const compareImage = async () => {
          
          setloading(true);
          setVerified('')
          console.log('Image Link', picLink);
          
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
        
            const  {data}  = await axios.post(
              `${url}/user/facematch/`,
              {
                "img" : picLink,
                "token" : props.scanResult
              },
              config
            );
            console.log(data.verify)
            setVerified(data.verify)
            setloading(false);
        
          } catch (error) {
            setloading(false);
            console.log("unable to connect",error);
          }
      }

      const clearData = () => {
        setImageCaptured('')
        setVerified('')
        setPicLink('')
      }
  
  return (
    <>
    <Card>
      <Card.Header className="text-center">
        <h2>Verify User</h2>
      </Card.Header>
      <Card.Body>
        <Container className="container">
          {
              ImageCaptured === '' ?
              <Row>
                  <Col>
                      <Webcam
                          audio={false}
                          // height={720}
                          screenshotFormat="image/jpeg"
                          width={"100%"}
                          videoConstraints={videoConstraints}
                      >
                          {({ getScreenshot }) => (
                          <Button
                              style = {{width : "100%"}} 
                              onClick={() => {
                                  const imageSrc = getScreenshot();
                                  // console.log(imageSrc);
                                  setImageCaptured(imageSrc);
                              }}
                          >
                              Capture photo
                          </Button>
                          )}
                      </Webcam>
                  </Col>
              </Row> :
              <div>
                  {/* {ImageCaptured} */}
                  <Row>
                    <img style={{margin:"auto"}} src={ImageCaptured} alt="image"></img>
                  </Row>
                  <Row style= {{ marginTop:"10px"}}>
                    <Col>
                        <Button style = {{width : "100%"}} onClick={() => {clearData()}}> Retake Image </Button>
                    </Col>
                    <Col>
                    {
                        picLink === '' ?
                        <Button style = {{width : "100%"}} onClick={() => {postDetails()}}> Upload Image </Button>
                        :
                        <Button style = {{width : "100%"}} onClick={() => {compareImage()}}> Verify Image </Button>
                    } 
                    </Col>
                  </Row>
                  <Row style= {{ marginTop:"10px"}}>
                      {
                        loading === true ? <Loading /> :
                        verified === '' ? null :
                        verified === true ? 
                        <div style={{margin:"auto"}}>
                          <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpsOZMm6hxCH_zQpZVQSJ-weJ-ZE4Q94UkjCYPscOuU17SWeGGbH_5IJKBuubxtX9U1wg&usqp=CAU"
                            alt="Verified"
                          />
                        </div> :
                        <div style={{margin:"auto"}}>
                          <img
                            src="data:image/png;base64,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"
                            alt="Not Verified"
                          />
                        </div>
                      }
                  </Row>
              </div>
          }
        </Container> 
      </Card.Body>
    </Card>
    
    
    </>
  );
}

export default VerifyImage;