/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import "./UserDetails.css";
import Loading from "../Loading";
import axios from "axios";
import VerifyImage from './VerifyImage';

const url = "http://127.0.0.1:8000";

function UserDetails(props) {
  const [userData, setUserData] = useState({
    name: "Anutosh",
    dob: "05-02-1997",
    gender: "Male",
    uid: "810319041",
    pic: "",
  });
  const [loading, setloading] = useState(false);
  const [pic, setPic] = useState(
    "http://www.newdesignfile.com/postpic/2013/01/generic-user-icon-windows_321380.png"
  );
  const [picMessage, setPicMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);

  const getUserData = async () => {
    setloading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${url}/user/qrdata/`,
        {
          key: props.scanResult,
        },
        config
      );
      console.log(data);
      setUserData(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log("unable to connect", error);
    }
  };

  useEffect(() => {
    if (props) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const postDetails = (picture) => {
    if (!picture) {
      return setPicMessage("Please Select a profile picture!");
    }

    setPicMessage(null);

    if (
      picture.type === "image/jpeg" ||
      picture.type === "image/jpg" ||
      picture.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "shareNote");
      data.append("cloud_name", "imgstoreap");
      fetch("https://api.cloudinary.com/v1_1/imgstoreap/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setPic(res.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image file");
    }
  };

  return (
    <div className="container">
      <Row className="m-4 text-center">
        <Col md={12}>{loading && <Loading />}</Col>
      </Row>
      <Row className="mt-4">
        <Col md={7}>
          <Card>
            <Card.Header className="text-center">
              <h2>Visitors Details</h2>
            </Card.Header>
            <Card.Body>
              <Container className="container">
                <Row style={{ justifyContent: "center" }}>
                  <Card>
                    <Card.Header>
                      <img
                        src={userData.pic}
                        alt={userData.name}
                        className="car-img-top profilePic"
                      />
                      <h2 className="card-title text-center">Visitors Image</h2>
                    </Card.Header>
                  </Card>
                </Row>
                <Row className="input-group mb-3 p-3 info">
                  <Col className="form-control info-div">
                    <label htmlFor="userName">Name : {userData.name}</label>
                  </Col>
                </Row>
                <Row className="input-group mb-3 p-3 info">
                  <Col className="form-control info-div">
                    <label htmlFor="userAge">
                      Date of Birth : {userData.dob}
                    </label>
                  </Col>
                </Row>
                <Row className="input-group mb-3 p-3 info">
                  <Col className="form-control info-div">
                    <label htmlFor="userAge">Gender : {userData.gender}</label>
                  </Col>
                </Row>

                <Row className="input-group mb-3 p-3 info">
                  <Col className="form-control info-div">
                    <label htmlFor="useruid">UID No. : {userData.uid}</label>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <VerifyImage scanResult={props.scanResult} />

          <br />
          {/* <Row>
                <Form
                    style={{
                        width: "30%",
                        fontSize: "21px",
                        margin: "auto",
                    }}
                    onSubmit={submitHandler}
                >
                <Form.Group controlId="pic">
                    <Form.Label>Upload image to verify</Form.Label>
                    <Form.File
                    id="custom-file"
                    type="image/png"
                    label="Upload Picture"
                    custom
                    onChange={(e) => postDetails(e.target.files[0])}
                    />
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" size="lg" type="submit">
                    Upload
                    </Button>
                </div>
            </Form>
            </Row> */}
        </Col>
      </Row>
    </div>
  );
}

export default UserDetails;
