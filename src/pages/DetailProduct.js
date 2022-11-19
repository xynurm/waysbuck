import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductList from "../Components/LetsOrder/ProductList";
import ProdDetail from "../Components/DetailProduct/ProdDetail";

export default function DetailProduct() {
  const { id } = useParams();
  // const ProductList =JSON.parse(localStorage.getItem("DATA_PRODUCT"))
  return (
    <Container>
      <ProdDetail
        name={ProductList[id].name}
        price={ProductList[id].price}
        img={ProductList[id].img}
        
      />
    </Container>
  );
}
