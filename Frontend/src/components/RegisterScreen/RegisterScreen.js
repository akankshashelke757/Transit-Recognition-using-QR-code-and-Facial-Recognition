

import MainScreen from "../MainLayout/MainLayout";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import { register } from "../../actions/userActions";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "http://www.newdesignfile.com/postpic/2013/01/generic-user-icon-windows_321380.png"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [picMessage, setPicMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [gender, setGender] = useState("");
  const [uid, setUid] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
  }, [ userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      if (phone.length !== 10) {
        setMessage("Enter a valid Phone Number");
      } else {
        dispatch(
          register(name, email, password, `+91${phone}`, dob, gender, uid, pic)
        );
      }
    }
  };

  const postDetails = (picture) => {
    if (!picture) {
      return setPicMessage("Please Select a profile picture!");
    }

    setPicMessage(null);
    //transforming selected image using cloudinary
    // which provides url for the stored image
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
    <MainScreen title="REGISTER">
      <Container>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form
          style={{
            width: "30%",
            fontSize: "21px",
            margin: "auto",
          }}
          onSubmit={submitHandler}
        >
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              className="input"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className="input"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="input"
              value={password}
              placeholder="Password"
              autoComplete="true"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="input"
              type="password"
              value={confirmPassword}
              autoComplete="true"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              className="input"
              type="date"
              value={dob}
              autoComplete="true"
              placeholder="DOB"
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Others</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              className="input"
              type="text"
              value={phone}
              autoComplete="true"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="uid">
            <Form.Label>Aadhar No. </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={uid}
              placeholder="Enter UID"
              onChange={(e) => setUid(e.target.value)}
            />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" size="lg" type="submit">
              Register
            </Button>
          </div>
          <Row className="py-2 text-center">
            <Col>
              Already a User ?{" "}
              <Link to="/" style={{ color: "blue" }}>
                Login Here
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </MainScreen>
  );
};

export default RegisterScreen;






// import MainScreen from "../MainLayout/MainLayout";
// import { Form, Row, Col, Button, Container } from "react-bootstrap";
// import { Link, useHistory } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ErrorMessage from "../ErrorMessage";
// import Loading from "../Loading";
// import { register } from "../../actions/userActions";
// import Header from "../Header/Header";

// const RegisterScreen = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [pic, setPic] = useState(
//     "http://www.newdesignfile.com/postpic/2013/01/generic-user-icon-windows_321380.png"
//   );
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [dob, setDob] = useState("");
//   const [phone, setPhone] = useState("");
//   const [picMessage, setPicMessage] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [gender, setGender] = useState("");
//   const [uid, setUid] = useState("");

//   const dispatch = useDispatch();
//   // const history = useHistory();

//   const userRegister = useSelector((state) => state.userRegister);

//   const { loading, error, userInfo } = userRegister;

//   // useEffect(() => {
//   //   // if (userInfo !== null) {
//   //   //   history.push("/home");
//   //   // }
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Password does not match");
//     } else {
//       if (phone.length !== 10) {
//         setMessage("Enter a valid Phone Number");
//       } else {
//         dispatch(
//           register(name, email, password, `+91${phone}`, dob, gender, uid, pic)
//         );
//       }
//     }
//   };

//   const postDetails = (picture) => {
//     if (!picture) {
//       return setPicMessage("Please Select a profile picture!");
//     }

//     setPicMessage(null);
//     //transforming selected image using cloudinary
//     // which provides url for the stored image
//     if (
//       picture.type === "image/jpeg" ||
//       picture.type === "image/jpg" ||
//       picture.type === "image/png"
//     ) {
//       const data = new FormData();
//       data.append("file", picture);
//       data.append("upload_preset", "shareNote");
//       data.append("cloud_name", "imgstoreap");
//       fetch("https://api.cloudinary.com/v1_1/imgstoreap/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           console.log(res);
//           setPic(res.url.toString());
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       return setPicMessage("Please select an image file");
//     }
//   };

//   return (
//     <MainScreen title="REGISTER">
//       <Header />
//       <Container>
//         {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
//         {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
//         {loading && <Loading />}
//         <Form
//           style={{
//             width: "30%",
//             fontSize: "21px",
//             margin: "auto",
//           }}
//           onSubmit={submitHandler}
//         >
//           <Form.Group controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="name"
//               className="input"
//               value={name}
//               placeholder="Enter name"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               className="input"
//               value={email}
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               className="input"
//               value={password}
//               placeholder="Password"
//               autoComplete="true"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="confirmPassword">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               className="input"
//               type="password"
//               value={confirmPassword}
//               autoComplete="true"
//               placeholder="Confirm password"
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="age">
//             <Form.Label>Date of Birth</Form.Label>
//             <Form.Control
//               className="input"
//               type="text"
//               value={dob}
//               autoComplete="true"
//               placeholder="DOB"
//               onChange={(e) => setDob(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="gender">
//             <Form.Label>Gender</Form.Label>
//             <Form.Control
//               as="select"
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <option>Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Others</option>
//             </Form.Control>
//           </Form.Group>
//           <Form.Group controlId="phone">
//             <Form.Label>Phone</Form.Label>
//             <Form.Control
//               className="input"
//               type="text"
//               value={phone}
//               autoComplete="true"
//               placeholder="Phone"
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="uid">
//             <Form.Label>Aadhar No. </Form.Label>
//             <Form.Control
//               type="text"
//               className="input"
//               value={uid}
//               placeholder="Enter UID"
//               onChange={(e) => setUid(e.target.value)}
//             />
//           </Form.Group>
//           {picMessage && (
//             <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
//           )}
//           <Form.Group controlId="pic">
//             <Form.Label>Profile Picture</Form.Label>
//             <Form.File
//               id="custom-file"
//               type="image/png"
//               label="Upload Profile Picture"
//               custom
//               onChange={(e) => postDetails(e.target.files[0])}
//             />
//           </Form.Group>
//           <div className="text-center">
//             <Button variant="primary" size="lg" type="submit">
//               Register
//             </Button>
//           </div>
//           <Row className="py-2 text-center">
//             <Col>
//               Already a User ?{" "}
//               <Link to="/" style={{ color: "blue" }}>
//                 Login Here
//               </Link>
//             </Col>
//           </Row>
//         </Form>
//       </Container>
//     </MainScreen>
//   );
// };

// export default RegisterScreen;
