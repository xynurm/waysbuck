import React, { useState, useContext } from "react";
import { Modal, Form, Alert } from "react-bootstrap";
import FormGroupAuth from "./FormGroupAuth";
import BtnAuth from "./BtnAuth";
import FooterText from "./FooterText";
import { API } from "../../config/api";
import {UserContext} from "../../context/userContext"
import { useMutation } from 'react-query';

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

export default function Register({
  showregister,
  handleCloseRegister,
  linkLogin
}) {

  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(null);



  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post('/register', form)

      const alert = (<Alert variant='success' className='py-1'>
        Success
      </Alert>)
      setMessage(alert)
      console.log("user Register :", response.data.data)
      handleCloseRegister()
    } catch (err) {
      const alert = (<Alert variant='danger' className='py-1'>
        Failed
      </Alert>)
      setMessage(alert)
      console.log(err)
      handleCloseRegister()
    }
  })
  return (
    <Modal show={showregister} onHide={handleCloseRegister} centered>
      <Modal.Body>
        <Modal.Title className="mb-4 fs-2 fw-bold" style={Styles.Title}>
          Register
        </Modal.Title>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <FormGroupAuth
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <FormGroupAuth
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <FormGroupAuth
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <BtnAuth
            variant="danger"
            name="Register"
            onClick={(e) => handleSubmit.mutate(e)}
          />
          <FooterText title="Don't have account?" click={linkLogin} />
        </Form>
      </Modal.Body>
    </Modal>
  );
}
