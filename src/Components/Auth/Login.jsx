import React, { useContext, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import BtnAuth from "./molecules/BtnAuth";
import FooterText from "./molecules/FooterText";
import FormGroupAuth from "./molecules/FormGroupAuth";
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

export default function Login({ showlogin, handleCloseLogin, linkRegister  }) {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      
      const response = await API.post("/login", form);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
      });
     navigate(0)
     alert("Login success")
    } catch (err) {
      console.log(err);
      alert("login failed");
    }
  });
;


  return (
    <Modal show={showlogin} onHide={handleCloseLogin} centered>
      <Modal.Body>
        <Modal.Title className="mb-4 fs-2 fw-bold" style={Styles.Title}>
          Login
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
          <BtnAuth
            variant="danger"
            name="Login"
            onClick={(e) => handleSubmit.mutate(e)}
          />
          <FooterText title="Don't have account?" click={linkRegister} />
        </Form>
      </Modal.Body>
    </Modal>
  );
}
