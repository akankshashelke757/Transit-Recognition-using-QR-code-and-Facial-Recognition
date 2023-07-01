/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
// import QRCode from 'qrcode';
import { QrReader } from "react-qr-reader";
// import './Verify.css';
import UserDetails from "./UserDetails";

const url = "http://127.0.0.1:8000";

function Verify() {
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  // const classes = useStyles();
  const qrRef = useRef(null);
  const [userData, setUserData] = useState("");

  // const generateQrCode = async () => {
  //   try {
  //         const response = await QRCode.toDataURL(text);
  //         setImageUrl(response);
  //   }catch (error) {
  //     console.log(error);
  //   }
  // }
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  // const getUserDetails = () => {
  //   try {
  //     // To make api request that takes json data
  //     // we need to provide some header
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };

  //     const { data } = axios.post(
  //       `${url}/user/getUserDetails/`,
  //       {
  //         token: scanResultWebCam,
  //       },
  //       config
  //     );
  //     console.log(data);
  //     setUserData(data);

  //     // localstorage can't store the object data
  //     // so we need to convert it into string data
  //   } catch (error) {
  //     console.log("unable to connect", error);
  //   }
  // };

  return scanResultWebCam === "" ? (
    <Container>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col>
          </Col>
          <Col className="col">
            <Card>
              <h2 style = {{textAlign: "center"}}>Scan QR Code</h2>
              <QrReader
                scanDelay={500}
                onResult={(result, error) => {
                  if (!!result) {
                    setScanResultWebCam(result?.text);
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                style={{ width: "100%", height: "100vh" }}
              />
            </Card>
            {/* <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
          </Col>
          <Col></Col>
        </Row>
    </Container>
  ) : (
    <div>
      {<UserDetails scanResult={scanResultWebCam} />}
    </div>
  );
}

export default Verify;
