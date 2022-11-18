import React, {useState } from "react";
import {
  Button,
  Modal,
  Form,
  Nav,
  NavDropdown
} from "react-bootstrap";
import profile from "../../assets/img/profile.png";
import cart from "../../assets/img/cart.png";
import styles from "./header.module.css";
import { Link } from "react-router-dom";


const Styles = {
  Title: {
    color: "#BD0707"
  },
  Input: {
    border: "2px solid #BD0707",
    height: "50px",
    backgroundColor: "rgba(224, 200, 200, 0.25)"
  },
  CustomBtn: {
    backgroundColor: "#BD0707",
    height: "50px",
    fontSize: "18px"
  }
};

export default function Auth() {
  const [islogin, setIsLogin] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: ""
  });

  const handleOnChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setShowLogin(false);
    setIsLogin(true);
    setShowRegister(false);

    console.log(login);
  };



  const handleLogout = () => setIsLogin(false);

  const [showlogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showregister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const linkRegister = ()=>{
    setShowLogin(false);
    setShowRegister(true);
  }

  const linkLogin = ()=>{
    setShowLogin(true);
    setShowRegister(false);
  }

  if (islogin) {
    return (
      <>
        <Nav.Link>
          <img src={cart}/>
        </Nav.Link>
        <Nav.Link align="center">
          <NavDropdown
            title={<img src={profile}/>}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item className="fw-bold"><Link to="/profile" className="text-decoration-none text-dark" >Profile
            </Link></NavDropdown.Item>
            <NavDropdown.Item className="fw-bold" onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav.Link>
      </>
    );
  }
  return (
    <>
      {/* Login */}
      <Nav.Link>
        <Button
          variant="outline-danger"
          size="sm"
          className={styles.outBtn}
          onClick={handleShowLogin}
        >
          Login
        </Button>

        <Modal show={showlogin} onHide={handleCloseLogin} centered>
          <Modal.Body>
            <Modal.Title className="mb-4 fs-2 fw-bold" style={Styles.Title}>
              Login
            </Modal.Title>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  onChange={handleOnChange}
                  value={login.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  style={Styles.Input}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  onChange={handleOnChange}
                  value={login.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={Styles.Input}
                ></Form.Control>
              </Form.Group>

              <div className="d-grid gap-2 mb-3">
                <Button
                  onClick={handleOnSubmit}
                  variant="danger"
                  className="fw-semibold"
                  style={Styles.CustomBtn}
                >
                  Login
                </Button>
              </div>
              <div className="text-center">
                <p className="fw-semibold">Don't have account? Klick <Link onClick={linkRegister} > Here</Link> </p>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Nav.Link>
      {/* register */}
      <Nav.Link>
        <Button
          variant="danger"
          style={Styles.Button}
          size="sm"
          className={styles.fullBtn}
          onClick={handleShowRegister}
        >
          Register
        </Button>

        <Modal show={showregister} onHide={handleCloseRegister} centered>
          <Modal.Body>
            <Modal.Title
              className="mb-4 col-4 fs-2 fw-bold"
              style={Styles.Title}
            >
              Register
            </Modal.Title>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  onChange={handleOnChange}
                  value={user.email}
                  name="email"
                  style={Styles.Input}
                  placeholder="Email"
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  style={Styles.Input}
                  onChange={handleOnChange}
                  value={user.password}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  name="fullname"
                  style={Styles.Input}
                  onChange={handleOnChange}
                  value={user.fullname}
                  placeholder="Full Name"
                ></Form.Control>
              </Form.Group>

              <div className="d-grid gap-2 mb-3">
                <Button
                  // type="submit"
                  onClick={handleOnSubmit}
                  className="fw-semibold"
                  variant="danger"
                  style={Styles.CustomBtn}
                >
                  Register
                </Button>
              </div>
              <div className="text-center">
                <p className="fw-semibold">Already have account? Klick <Link onClick={linkLogin}>Here</Link>  </p>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Nav.Link>
    </>
  );
}
