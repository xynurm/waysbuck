import React, { useState } from "react";
import { Button, Modal, Form, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

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
    fontSize:"18px",
  }
};

export default function Login() {

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    console.log(login);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    
    <>
   <Nav.Link>
        <Button
          variant="outline-danger"
          size="sm"
          className={styles.outBtn}
          onClick={handleShow}
        >
          Login
        </Button>

        <Modal show={show} onHide={handleClose} centered>
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
                <p className="fw-semibold">Don't have account? Klick Here</p>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Nav.Link>
    </>
  );
}
