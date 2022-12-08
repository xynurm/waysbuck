import React from "react";
import { Container } from "react-bootstrap";
import frame from "../../assets/img/Frame1.png";

export default function Heroes() {
  return (
    <Container>
      <div className="position-relative">
        <img src={frame} className="img-fluid" alt="heroes-img"></img>
        <div className="position-absolute top-0  p-5 text-white">
          <h1 className="fw-bold px-4">WAYSBUCKS</h1>
          <p className="fw-light px-4" style={{ fontSize: "24px" }}>
            Things are changing, but we’re still here for you
          </p>
          <p className="fw-light px-4" style={{ fontSize: "18px" }}>
            We have temporarily closed our in-store cafes, but select <br></br>
            grocery and drive-thru locations remaining open.<br></br>
            <span className="fw-semibold">Waysbucks</span> Drivers is also
            available<br></br>
            <br></br>
            Let’s Order...
          </p>
        </div>
      </div>
    </Container>
  );
}
