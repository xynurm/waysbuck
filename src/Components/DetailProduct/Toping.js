import React from "react";
import {  Row } from "react-bootstrap";
import TopingItem from "./TopingItem";
import { API } from "../../config/api";
import { useQuery } from "react-query";

export default function Toping() {

  let { data: topings } = useQuery("topingsCache", async () => {
    const response = await API.get('/toping')
    console.log("toping", response.data.data)
    return response.data.data
  })
  return (
    <div className="" style={{ color: "#974A4A" }}>
      <h4 className="pb-5">Toping</h4>
      <Row className="row-cols-4">
      {topings?.map((item,index) => (
           <TopingItem key={index} item={item}/>
        ))}
        
      </Row>
    </div>
  );
}
