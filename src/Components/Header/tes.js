import React, { useRef, useState } from "react";
import { Button, Modal, Form, Nav } from "react-bootstrap";
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
    fontSize: "18px"
  }
};

export default function Tes() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const email = useRef();
  const password = useRef();
  const fullname = useRef();

  const handleOnSubmit = () => {
    if(email.current.value&&password.current.value&&fullname.current.value){
        localStorage.setItem("email", email.current.value);
        localStorage.setItem("password", password.current.value);
        localStorage.setItem("fullname", fullname.current.value);
    }
   
    
   
  };

  return (
    <>
      <Nav.Link>
        <Button
          variant="danger"
          style={Styles.Button}
          size="sm"
          className={styles.fullBtn}
          onClick={handleShow}
        >
          Register
        </Button>

        <Modal show={show} onHide={handleClose} centered>
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
                  ref={email}
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
                  ref={email}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  name="fullname"
                  style={Styles.Input}
                  ref={fullname}
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
                <p className="fw-semibold">Already have account? Klick Here</p>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Nav.Link>
    </>
  );
}
