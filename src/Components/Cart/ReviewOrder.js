import React from "react";
import {Row, Col} from "react-bootstrap";
import prod1 from "../../assets/img/prod1.png";
import trash from "../../assets/img/trash.png"


const Text ={
  Red: {
    color: "#BD0707"
  },

  Brown:{
    color:"#974A4A"
  },
}


export default function ReviewOrder() {
  return (
    <div className="d-flex justify-content-between my-4">
    <Row>
      <Col sm={3}>
        <div className="d-flex">
          <img width={100} className="rounded-3" src={prod1} />
        </div>
      </Col>
      <Col>
        <div className="my-4">
          <p className="fw-bold" style={Text.Red}>Ice Coffe Palm Sugar</p>
          <p className="fw-semibold" style={Text.Red}>
            {" "}
            <span style={Text.Brown}>Toping :</span> Bill Berry Boba, Buble Tea Gelatin
          </p>
        </div>
      </Col>
    </Row>
    <div className="my-4">
      <p style={Text.Red}>Rp.33.000</p>
      <div className="float-end">
      <img src={trash}/>
      </div>
    </div>
  </div>

  )
}
