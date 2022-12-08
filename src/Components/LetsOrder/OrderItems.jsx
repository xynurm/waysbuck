import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../config/api";
import { UserContext } from "../../context/userContext";
import Login from "../Auth/Login";

export default function OrderItems({item}) {
  const navigate = useNavigate();
  const [showlogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const numbering = new Intl.NumberFormat('id')
  const [state, dispatch] = useContext(UserContext);

  return (
    <>
      <Col sm={3}>
      <Card
        className="mb-4"
        onClick={() => { state.isLogin ?
          navigate(`/product/`+ item.id) : handleShowLogin()
        }}
        style={{
          width: "241px",
          backgroundColor: "#F6DADA",
          border: "none",
          borderRadius: "10px"
        }}
      >
        <Card.Img src={item.image} />
        <Card.Body>
          <Card.Title className="fw-bold " style={{ color: "#BD0707" }}>
            {item.title}
          </Card.Title>
          <Card.Text className="fw-light" style={{ color: "#974A4A" }}>
            Rp.{numbering.format(item.price)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
        
      <Login
      showlogin={showlogin}
      handleCloseLogin={handleCloseLogin}

    />
    </>
  
  );
}
