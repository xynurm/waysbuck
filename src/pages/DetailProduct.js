import React, { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styles from "../Components/DetailProduct/DetailProduct.Module.css";
import { API } from "../config/api";

export default function DetailProduct() {
  let { id } = useParams();

  const [toping, setToping] = useState([]); 
  const [topPrice, setTopPrice] = useState([]); 
  function handleBadge(id, price) {
    let idNow = topings.filter((e) => e === id);
    
    if (idNow !== id) {
      setToping([...toping, id]);
      setTopPrice(Number(topPrice) + Number(price));
      console.log("toping id", setToping)
    } else {
      setToping(topings.filter((e) => e !== id));
      setTopPrice(Number(topPrice) - Number(price));
    }
    
  }

 

  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    // console.log("berhasil ambil data", response.data.data);
    return response.data.data;
  });

  let { data: topings } = useQuery("topingsCache", async () => {
    const response = await API.get("/toping");
    // console.log("toping", response.data.data);
    return response.data.data;
  });
  let TotalHarga = product?.price + topPrice;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post('/order/{id}', form)

      const alert = (<Alert variant='success' className='py-1'>
        Success
      </Alert>)

      console.log("Cart :", response.data.data)

    } catch (err) {
      const alert = (<Alert variant='danger' className='py-1'>
        Failed
      </Alert>)
      console.log(err)
    }
  })

  return (

    <Container>
      <div className="row ms-3 ">
        <div className="col-sm-6">
          <img
            src={product?.image}
            className=" float-md-start"
            style={{ borderRadius: "10px" }}
            width="80%"
            alt=""
          />
        </div>
        <div className="col">
          <h1 className="fw-bold" style={{ color: "#BD0707" }}>
            {product?.title}
          </h1>
          <p className="fs-4 pb-5" style={{ color: "#974A4A" }}>
            {product?.price.toLocaleString("id", {
              style: "currency",
              currency: "IDR"
            })}
          </p>
          {/* toping */}
          <div className="" style={{ color: "#974A4A" }}>
            <h4 className="pb-5">Toping</h4>
            <Row className="row-cols-4">
              {topings?.map((item) => (
                <Col className="px-1">
                  <div
                    className="card align-items-center "
                    style={{ width: "125px", border: "none" }}
                  >
                    <input  onClick={() => handleBadge(item.id, item.price)}
                      type="checkbox"
                      name={item.title}
                      id={item.id}
                      className={styles}
                    />
                    <label htmlFor={item.id}>
                      <img
                        src={item.image}
                        className="card-img-top mb-2"
                        style={{ width: "75px" }}
                        alt=""
                      />
                    </label>

                    <p
                      style={{
                        color: "#BD0707",
                        fontSize: "14px",
                        textAlign: "center"
                      }}
                    >
                      {item.title}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div
            className="d-flex justify-content-between pb-5"
            style={{ color: "#974A4A" }}
          >
            <div>
              <h4>Total</h4>
            </div>
            <div>
              <h4 name="total">{TotalHarga} </h4>
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
    </Container>
  );
}
