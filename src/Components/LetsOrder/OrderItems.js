import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function OrderItems({item}) {
  const navigate = useNavigate();
  const numbering = new Intl.NumberFormat('id')
  return (
    <Col sm={3}>
      <Card
        className="mb-4"
        onClick={() => {
          navigate(`/product/`+ item.id);
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
  );
}
