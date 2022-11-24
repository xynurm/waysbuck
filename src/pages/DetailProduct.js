import React,{useState} from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import ProdDetail from "../Components/DetailProduct/ProdDetail";

export default function DetailProduct() {
  const { id } = useParams();
  const ProductList =JSON.parse(localStorage.getItem("DATA_PRODUCT"))
  const TopingList =JSON.parse(localStorage.getItem("DATA_TOPING"))
  
  const topPrice = TopingList[0].topPrice

  const subTotal = (a,b) => {
    return a+b
  }

  return (
    <Container>
      <ProdDetail
        name={ProductList[id].name}
        price={ProductList[id].price.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
        img={ProductList[id].img}
        totalPrice={subTotal(ProductList[id].price, topPrice)}
      />
    </Container>
  );
}
