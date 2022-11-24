import React, { useState } from "react";
import { Form, Modal, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import cart from "../../assets/img/cart.png";
import profile from "../../assets/img/profile.png";
import BtnAuth from "./BtnAuth";
import BtnModal from "./BtnModal";
import FooterText from "./FooterText";
import FormGroupAuth from "./FormGroupAuth";

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

export default function Auth(props) {
  const navigate = useNavigate()

  const users = [];

  const [user, setUser] = useState({
    id: 0,
    email: "",
    password: "",
    fullname: "",
    role: "user"
  });

  const createUser = () => {
    let dataUser = JSON.parse(localStorage.getItem("DATA_USERS"))
    if (dataUser !== null){
      dataUser.forEach(element => {
        users.push(element)
      })
      users.push(user)
      localStorage.setItem("DATA_USERS", JSON.stringify(users))
    }else{
      users.push(user)
      localStorage.setItem("DATA_USERS", JSON.stringify(users))
    }
  };

  const handleOnChangeRegister = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmitRegister = (e) => {
    e.preventDefault();
    createUser();
  };

  
  const [login, setLogin] = useState({
    email: "",
    password: "",
    fullname:""
  });



  const getUser = () => {
    let storage= JSON.parse(localStorage.getItem("DATA_USERS"));
    storage.forEach((element) => {
      if (
        login.email === element.email &&
        login.password === element.password 
       
      ) {
       
        users.push(login)
       

        localStorage.setItem("login", JSON.stringify(users));
        handleCloseLogin()
      } else {
        return alert("wrong password");
      }
    });
  };

  const dataLogin = JSON.parse(localStorage.getItem("login"));
  let getLogin = [...dataLogin];
  


  const handleOnChangeLogin = (e) => {
    let storage= JSON.parse(localStorage.getItem("DATA_USERS"));
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
      fullname: storage[0].fullname,
    });
  };

  const handleOnSubmitLogin = (e) => {
    e.preventDefault();
    getUser();
    
  };

  const Logout = () => {
    navigate("/")
    getLogin.pop()

    localStorage.setItem("login", JSON.stringify(getLogin));
  };

  const [showlogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showregister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const linkRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const linkLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

 


  if (getLogin.length !==0 ) {
    return (
      <>
        <Nav.Link className="pt-4 px-4">
          <img src={cart} />
        </Nav.Link>
        <Nav.Link align="center">
          <NavDropdown title={<img src={profile} />} id="basic-nav-dropdown">
            <NavDropdown.Item className="fw-bold">
              <Link to="/profile" className="text-decoration-none text-dark">
                Profile
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item className="fw-bold" onClick={Logout}>
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
          <BtnModal
            name="Login"
            variant="outline-danger"
            onClick={handleShowLogin}
          />
  
          <Modal show={showlogin} onHide={handleCloseLogin} centered>
            <Modal.Body>
              <Modal.Title className="mb-4 fs-2 fw-bold" style={Styles.Title}>
                Login
              </Modal.Title>
              <Form>
                <FormGroupAuth
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleOnChangeLogin}
                />
                <FormGroupAuth
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleOnChangeLogin}
                />
                <BtnAuth
                  variant="danger"
                  name="Login"
                  onClick={handleOnSubmitLogin}
                />
                <FooterText title="Don't have account?" click={linkRegister} />
              </Form>
            </Modal.Body>
          </Modal>
        </Nav.Link>
  
        {/* register */}
  
        <Nav.Link>
          <BtnModal
            name="Register"
            variant="danger"
            style={{ backgroundColor: "#BD0707" }}
            onClick={handleShowRegister}
          />
          <Modal show={showregister} onHide={handleCloseRegister} centered>
            <Modal.Body>
              <Modal.Title className="mb-4 fs-2 fw-bold" style={Styles.Title}>
                Register
              </Modal.Title>
              <Form onSubmit={handleOnSubmitRegister}>
                <FormGroupAuth
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleOnChangeRegister}
                />
                <FormGroupAuth
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleOnChangeRegister}
                />
                <FormGroupAuth
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  onChange={handleOnChangeRegister}
                />
                <BtnAuth
                  variant="danger"
                  name="Register"
                  onClick={handleOnSubmitRegister}
                />
                <FooterText title="Don't have account?" click={linkLogin} />
              </Form>
            </Modal.Body>
          </Modal>
        </Nav.Link>
      </>
    );
  }
 

