import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function OrderItems(props) {
  const navigate = useNavigate();
  // const getLogin = JSON.parse(localStorage.getItem("login"));
  // let redirect = null;
  // if (getLogin.length !== 0) {
  //   redirect = () => {
  //     navigate(`/detail/${props.id}`);
  //   };
  // } else {
  //   //
  // }
  return (
    <Col sm={3}>
      <Card
        className="mb-4"
        onClick={() => {
          navigate(`/detail/${props.id}`);
        }}
        style={{
          width: "241px",
          backgroundColor: "#F6DADA",
          border: "none",
          borderRadius: "10px"
        }}
      >
        <Card.Img src={props.img} />
        <Card.Body>
          <Card.Title className="fw-bold " style={{ color: "#BD0707" }}>
            {props.name}
          </Card.Title>
          <Card.Text className="fw-light" style={{ color: "#974A4A" }}>
            {props.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
