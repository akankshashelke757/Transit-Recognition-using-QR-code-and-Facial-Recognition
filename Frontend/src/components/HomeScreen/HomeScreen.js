import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
// import titleCase from "../../utils/TitleCase";
import { QRCodeCanvas } from "qrcode.react";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import "./HomeScreen.css";
import Header from "../Header/Header";

const HomeScreen = () => {
  const [name, setName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [pic, setPic] = useState("");
  // const [picMessage, setPicMessage] = useState("");
  const [dob, setDob] = useState("");
  const [uid, setUid] = useState("");
  const [gender, setGender] = useState("");
  const [verification_key, setKey] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      console.log(userInfo);
      setName(userInfo.name);
      setPic(userInfo.pic);
      setUid(userInfo.uid);
      setDob(userInfo.dob);
      setGender(userInfo.gender);
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/user/gettoken/",
      // req_param,
      { email: userInfo.email },
      config
    );

    if (data !== "") {
      console.log(data);
      setKey(data.key);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code-el");
    // console.log(canvas);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${name}_UID_QR_code.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="container">
      <Header />

      <Row className="m-4 text-center">
        <Col md={12}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          {/* <h1>Welcome, {userInfo ? titleCase(name) : "User"}</h1> */}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={7}>
          <Card>
            <Card.Header className="text-center">
              <h2>Your Details</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler} className="container">
                <Row className="input-group mb-3 p-3 info">
                  <Col className="form-control info-div">
                    <label htmlFor="userName">Name : {name}</label>
                  </Col>
                </Row>
                <Row className="input-group mb-3 p-3 info">
                  <Col className="form-control info-div">
                    <label htmlFor="userAge">Date of Birth : {dob}</label>
                  </Col>
                </Row>
                <Row className="input-group mb-3 p-3 info">
                  <Col className="form-control info-div">
                    <label htmlFor="userAge">Gender : {gender}</label>
                  </Col>
                </Row>

                <Row className="input-group mb-3 p-3 info">
                  <Col className="form-control info-div">
                    <label htmlFor="useruid">UID No. : {uid}</label>
                  </Col>
                </Row>
                <Row className="input-group mt-4 loginBtn">
                  <Button variant="primary" type="submit" size="lg">
                    Generate UID
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Row style={{ justifyContent: "center" }}>
            <Card>
              <Card.Header>
                <img src={pic} alt={name} className="car-img-top profilePic" />
                <h2 className="card-title text-center">Your Profile Pic</h2>
              </Card.Header>
            </Card>
          </Row>
          <br />

          {verification_key !== "" ? (
            <Alert variant="success">
              <h4 className="text-center">
                QR Code generated successfully!!!{" "}
              </h4>
              <Row>
                <Col>
                  <QRCodeCanvas
                    size={200}
                    includeMargin={true}
                    id="qr-code-el"
                    title={name}
                    level="H"
                    value={verification_key}
                  />
                </Col>
                <Col style={{ alignSelf: "center" }}>
                  <button
                    style={{
                      padding: "5px",
                      margin: "20px",
                    }}
                    type="button"
                    onClick={downloadQRCode}
                  >
                    Download QR Code
                  </button>
                </Col>
              </Row>
            </Alert>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
