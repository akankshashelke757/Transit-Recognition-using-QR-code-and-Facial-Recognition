import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
// eslint-disable-next-line no-unused-vars
import { login, loginWithAadhaar } from "../../actions/userActions";
import "./landing.css";

const Landing = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
    // setOtpMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // const verifySubmitHandler = async (e) => {
  //   e.preventDefault();

  //   const { data } = await axios.get(
  //     `https://identity-generator.herokuapp.com/user/verify/${verifyUID}`,
  //     config
  //   );
  //   if (data.error) {
  //     setVerified(false);
  //     setAlertMsg(data.error);
  //   } else {
  //     setVerified(true);
  //     setAlertMsg(data.message);
  //   }
  // };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(`${email} : ${password}`);
    dispatch(login(email, password));
  };

  return (
    <div className="container register">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      <div className="row mt-4">
        <div className="col-md-5 register-left">
          <h1 className="p-name">Visitor Transit System</h1>

          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h1>Welcome...</h1>
          <h2>Tired of waiting for security checks...</h2>
          <h2> Join us for a hassle-free quicker entry !!!</h2>
        </div>
        <div className="col-md-7 register-right">
          <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link"
                id="login-tab"
                data-toggle="tab"
                href="/verify"
                role="tab"
                aria-controls="login"
                aria-selected="false"
              >
                Verify
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="register-tab"
                data-toggle="tab"
                href="/register"
                role="tab"
                aria-controls="register"
                aria-selected="false"
              >
                Register
              </a>
            </li>
          </ul>
          <div className="register-heading ">
            <h1>Login</h1>
          </div>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="login"
              role="tabpanel"
              aria-labelledby="login-tab"
            >
              <div className="col-md-5 ">
                <div className="col-md-12 mt-5  profile_card">
                  <form className="form" onSubmit={loginSubmitHandler}>
                    <div className="form-group ">
                      <i className="fa fa-envelope-o"></i>
                      <input
                        type="text"
                        className="form-control p-4 text-input-large"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <i className="fa fa-lock"></i>
                      <input
                        type="password"
                        className="form-control p-4 text-input-large"
                        placeholder="Password *"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <input
                        type="submit"
                        className="btn-lg  m-2 "
                        style={{
                          backgroundColor: "#0062cc",
                          borderColor: "#0062cc",
                        }}
                        value="LOGIN"
                        onSubmit={loginSubmitHandler}
                      />
                    </div>
                  </form>
                  <div
                    className="row py-3 text-center "
                    style={{ fontSize: "20px" }}
                  >
                    {" "}
                    <div className="col">
                      New user ?{" "}
                      <Link to="/register" style={{ color: "blue" }}>
                        Register With us...
                      </Link>{" "}
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
