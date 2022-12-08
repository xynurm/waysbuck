import React from "react";
import { Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import OrderItems from "./OrderItems";

export default function LetsOrder() {
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    console.log("berhasil ambil data", response.data.data);
    return response.data.data;
  });

  return (
    <>
      <Container className="mt-4 ">
        <div className="mb-5">
          <h3 className="fw-bold" style={{ color: "#BD0707" }}>
            Lets Order
          </h3>
        </div>
        <div className="" >
          <Row   >
            {products?.map((item, index) => (
              <OrderItems  key={index} item={item} />
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
