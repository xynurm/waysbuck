import React from "react";
import {  Row } from "react-bootstrap";
import TopingItem from "./TopingItem";


export default function Toping() {
  const TopingList =JSON.parse(localStorage.getItem("DATA_TOPING"))
  return (
    <div className="" style={{ color: "#974A4A" }}>
      <h4 className="pb-5">Toping</h4>
      <Row className="row-cols-4">
      {TopingList.map((item,index) => (
           <TopingItem key={index} name={item.name} img={item.img} label={index} value={item.topPrice} typeName={index} />
        ))}
        
      </Row>
    </div>
  );
}
