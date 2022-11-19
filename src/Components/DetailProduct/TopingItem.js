import React from "react";
import { Col } from "react-bootstrap";

export default function TopingItem(props) {
  return (
    <Col className="px-1">
      <div
        className="card align-items-center "
        style={{ width: "125px", border: "none" }}
      >
        <img
          src={props.img}
          className="card-img-top mb-2"
          style={{ width: "75px" }}
          alt=""
        ></img>
        <p style={{ color: "#BD0707", fontSize:"14px", textAlign:"center", }}>{props.name}</p>
      </div>
    </Col>
  );
}
