import React from "react";
import { Container, Row } from "react-bootstrap";
import OrderItems from "./OrderItems";
import ProductList from "./ProductList";
  

export default function LetsOrder() {
  return (
    <Container className="mt-4 ">
      <div className="mb-5">
        <h3 className="fw-bold" style={{ color: "#BD0707" }}>
          Lets Order
        </h3>
      </div>
      <div className="">
        <Row>
          {ProductList.map(item=> (
             <OrderItems
             key={item.id}
             name={item.name}
             price={item.price}
             img={item.img}
             id={item.id}
           />
          ) )}
        </Row>
      </div>
    </Container>
  );
}
