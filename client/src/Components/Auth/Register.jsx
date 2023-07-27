import React, { useContext, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
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

export default function Register({
  showregister,
  handleCloseRegister,
  linkLogin
}) {
  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    fullName: "",
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
      e.preventDefault();
      await API.post("/register", form);
      handleCloseRegister();
      alert("berhasil daftar");
    } catch (err) {
      console.log(err);
      handleCloseRegister();
      alert("gagal daftar")
    }
  });
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
          <FooterText title="Have an Account?" click={linkLogin} />
        </Form>
      </Modal.Body>
    </Modal>
  );
}
