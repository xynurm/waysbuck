import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Components/DetailProduct/DetailProduct.Module.css";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function DetailProduct() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  let { id } = useParams();

  // set toping and toping id
  const [toping, setToping] = useState([]);
  const [topingID, setTopingID] = useState([]);

  // make handle toping
  const handleChangeToping = (e) => {
    let updateToping = [...toping];
    if (e.target.checked) {
      updateToping = [...toping, e.target.value];
    } else {
      updateToping.splice(toping.indexOf(e.target.value));
    }
    setToping(updateToping);

    let topingId = [...topingID];
    if (e.target.checked) {
      topingId = [...topingID, parseInt(e.target.name)];
    } else {
      topingId.splice(topingID.indexOf(e.target.name));
    }
    setTopingID(topingId);
  };

  console.log("id toping :", topingID);

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

  let { refetch } = useQuery("ordersCache", async () => {
    const response = await API.get("/orders");
    return response.data.data;
  });

  // calculate price in array toping
  let topingTotal = toping.reduce((a, b) => {
    return a + parseInt(b);
  }, 0);

  // calculate product price and toping
  let sub_amount = product?.price + topingTotal;

  const handleSubmit = useMutation(async (e) => {
    try {
      const body = JSON.stringify({
        toping_id: topingID,
        sub_amount: sub_amount,
        product_id: parseInt(id)
      });

      await API.post("/order", body);
      refetch();
    
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    if (state.isLogin === false || state.user.role === "admin") {
      navigate("/");
    }
  }, [state]);

  const numbering = new Intl.NumberFormat('id')

  return (
    <Container className="pb-5">
      <div className="row ms-3  ">
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
            Rp.{numbering.format(product?.price)}
          </p>
          {/* toping */}
          <div className="" style={{ color: "#974A4A" }}>
            <h4 className="pb-5">Toping</h4>
            <Row className="row-cols-4">
              {topings?.map((item, index) => (
                <Col className="px-1">
                  <div
                    className="card align-items-center "
                    style={{ width: "125px", border: "none" }}
                  >
                    <input
                      type="checkbox"
                      name={item.id}
                      id={index}
                      value={item.price}
                      className={styles}
                      onChange={handleChangeToping}
                    />
                    <label htmlFor={index}>
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
              <h4>
                Rp.{numbering.format(sub_amount)}
              </h4>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="d-grid gap-2 mb-3">
              <Button
                variant="danger"
                className="fw-semibold"
                style={{ backgroundColor: "#BD0707" }}
                onClick={(e) => handleSubmit.mutate(e)}
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
