import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../../config/api";
import { UserContext } from "../../context/userContext";
import AdminDropdown from "../Dropdown/AdminDropdown.jsx";
import UserDropdown from "../Dropdown/UserDropdown";
import BtnModal from "./molecules/BtnModal";
import Login from "./Login";
import Register from "./Register";
export default function Auth() {
  const navigate = useNavigate();

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
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (state.user.role === "admin") {
      navigate("/admin");
    } else{
      navigate("/");
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR"
        });
      }
      // Get user data
      let payload = response.data.data;

      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkUser();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/")
  }

  return (
    <>
      {state.isLogin ? (
        state.user.role === "user" ? (
          <UserDropdown logOut={logOut} />
        ) : (
          <AdminDropdown logOut={logOut} />
        )
      ) : (
        <>
          <Nav.Link>
            <BtnModal
              name="Login"
              variant="outline-danger"
              onClick={handleShowLogin}
            />
          </Nav.Link>
          <Login
            showlogin={showlogin}
            handleCloseLogin={handleCloseLogin}
            linkRegister={linkRegister}
          />
          <Nav.Link>
            <BtnModal
              name="Register"
              variant="danger"
              style={{ backgroundColor: "#BD0707" }}
              onClick={handleShowRegister}
            />
          </Nav.Link>
          <Register
            showregister={showregister}
            handleCloseRegister={handleCloseRegister}
            linkLogin={linkLogin}
          />
        </>
      )}
    </>
  );
}
