import React from "react";
import { Button } from "react-bootstrap";
import Toping from "./Toping";


export default function ProdDetail(props) {
  
  return (
    <div className="row ms-3 ">
      <div className="col-sm-6">
        <img
          src={props.img}
          className=" float-md-start"
          style={{ borderRadius: "10px" }}
          width="80%"
          alt=""
        />
      </div>
      <div className="col">
        <h1 className="fw-bold" style={{ color: "#BD0707" }}>
          {props.name}
        </h1>
        <p className="fs-4 pb-5" style={{ color: "#974A4A" }}>
          {props.price}
        </p>
       <Toping />
        <div
          className="d-flex justify-content-between pb-5"
          style={{ color: "#974A4A" }}
        >
          <div>
            <h4 >Total</h4>
          </div>
          <div>
            <h4 name="total" >{props.totalPrice}</h4>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="d-grid gap-2 mb-3">
            <Button
              variant="danger"
              className="fw-semibold"
              style={{ backgroundColor: "#BD0707" }}
            >
              Add Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
