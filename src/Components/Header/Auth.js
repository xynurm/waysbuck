import React, { useContext, useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import cart from "../../assets/img/cart.png";
import profile from "../../assets/img/profile.png";
import { API,setAuthToken } from "../../config/api";
import { UserContext } from "../../context/userContext";
import BtnModal from "./BtnModal";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
  const navigate = useNavigate()


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

  const [state, dispatch] = useContext(UserContext);


  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      console.log("response check auth", response)

      // Get user data
      let payload = response.data.data;

      if (payload.role === "admin"){
        navigate("/admin")
      }
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      console.log("ini data state", state)
     
    } catch (error) {
      console.log(error);
     
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

 
  

  if (state.isLogin) {
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
            <NavDropdown.Item className="fw-bold" >
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
        </Nav.Link>
       <Login showlogin={showlogin} handleCloseLogin={handleCloseLogin} linkRegister={linkRegister}/>
        {/* register */}
  
        <Nav.Link>
          <BtnModal
            name="Register"
            variant="danger"
            style={{ backgroundColor: "#BD0707" }}
            onClick={handleShowRegister}
          />
        </Nav.Link>
        <Register showregister={showregister} handleCloseRegister={handleCloseRegister} linkLogin={linkLogin} />
      </>
    );
  }
 

