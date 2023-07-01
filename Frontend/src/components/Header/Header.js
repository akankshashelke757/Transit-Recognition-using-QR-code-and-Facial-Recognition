import { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
// import titleCase from "../../utils/TitleCase";

const Header = () => {
  const [name, setName] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      // console.log(userInfo);
      setName(userInfo.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container style={{ fontSize: "18px" }}>
        <div className="navbar-brand">
          <Link
            to="/"
            style={{
              fontFamily: "cursive",
              fontStyle: "italic",
              fontSize: "24px",
              fontWeight: "700",
              fontSmooth: "3",
              letterSpacing: "1px",
            }}
          >
            Visitor Transit Portal
          </Link>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav btn btn-danger" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto"></Nav>
          <Nav>
            {userInfo ? (
              <NavDropdown
                style={{
                  fontFamily: "monospace",
                  fontSize: "20px",
                  fontWeight: "600",
                  letterSpacing: "1.5px",
                }}
                title={userInfo ? name : "User"}
                className="basic-nav-dropdown"
              >
                {/* <Link
                    className="dropdown-item"
                    style={{ fontSize: "16px" }}
                    to="/edit"
                  > */}
                {/* <img
                      alt=""
                      src={`${userInfo?.pic}`}
                      width="40"
                      height="40"
                      style={{ marginRight: 10, borderRadius: "18px" }}
                    /> */}
                {/* <Link to="/edit"> */}
                {/* Edit Profile */}
                {/* </Link> */}
                {/* </Link> */}
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item
                  style={{ fontSize: "16px" }}
                  onClick={logoutHandler}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="nav-link">
                <Link
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  to="/register"
                >
                  Register
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
