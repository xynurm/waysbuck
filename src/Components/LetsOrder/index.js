import React from "react";
import { Container, Row } from "react-bootstrap";
import OrderItems from "./OrderItems";
import ProductList from "./ProductList";


export default function LetsOrder() {

  // const ProductList =JSON.parse(localStorage.getItem("DATA_PRODUCT"))
  return (
    <Container className="mt-4 ">
      <div className="mb-5">
        <h3 className="fw-bold" style={{ color: "#BD0707" }}>
          Lets Order
        </h3>
      </div>
      <div className="">
        <Row>
          {ProductList.map((item,index)=> (
             <OrderItems
             key={index}
             name={item.name}
             price={item.price}
             img={item.img}
            id={index}
           />
          ) )}
        </Row>
      </div>
    </Container>
  );
}
