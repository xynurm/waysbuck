import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductList from "../LetsOrder/ProductList";
import ProdDetail from "./ProdDetail";

export default function DetailProduct() {

  const { id } = useParams();

  return (
    <Container>
     
        <ProdDetail   name={ProductList[id].name} price={ProductList[id].price} img={ProductList[id].img} />
   
    </Container>
  );
}
