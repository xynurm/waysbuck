import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import btnUpload from "../assets/img/btn_upload.png";
import ReviewOrder from "../Components/Cart";
import { API } from "../config/api";

const Text = {
  Red: {
    color: "#BD0707"
  },

  Brown: {
    color: "#974A4A"
  }
};

const Hr = {
  Red: {
    border: " 1px solid #BD0707"
  },

  Brown: {
    border: "1px solid #974A4A"
  }
};

const Input = {
  border: "2px solid #BD0707",
  height: "50px",
  backgroundColor: "rgba(224, 200, 200, 0.25)",
  borderRadius: "5px"
};

const CustomBtn = {
  backgroundColor: "#BD0707",
  height: "40px",
  fontSize: "18px",
  border: "none"
};

export default function Cart() {
  // const navigate = useNavigate();
  // const [state] = useContext(UserContext);

  // get data cart
  const { data: orders } = useQuery("cartsCache", async () => {
    const response = await API.get("/orders");
    return response.data.data;
  });

   
  let resultTotal = orders?.reduce((accum, item) => {
    return accum + item.sub_amount;
  }, 0);

  const numbering = new Intl.NumberFormat('id')

  return (
    <Container>
      <div className="px-5">
        <Row>
          <Col sm={7}>
            <div className="mb-4">
              <h4 className="fw-bold" style={Text.Red}>
                My Cart
              </h4>
            </div>
            <div style={Text.Red}>
              <p className="fw-semibold">Review Your Order</p>

              <hr style={Hr.Brown} />
            </div>
            {/* Review Order */}
            {orders?.map((item, index) => (
              <ReviewOrder item={item} key={index} />
            ))}
            <hr style={Hr.Brown} />
            <Row>
              <Col sm={7}>
                <hr style={Hr.Brown} />
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <p style={Text.Red}>Subtotal</p>
                      <p style={Text.Red}>Qty</p>
                    </div>
                    <div className="text-end">
                      <p style={Text.Red}>{numbering.format(resultTotal)}</p>
                      { (orders?.length >= 1) && <p style={Text.Red}>{orders?.length}</p> }
                    </div>
                  </div>
                  <hr style={Hr.Brown} />
                </div>
                <div className="d-flex justify-content-between">
                  <div className="fw-bold">
                    <text style={Text.Red}>Total</text>
                  </div>
                  <div className="fw-bold text-end">
                    <p style={Text.Red}>{numbering.format(resultTotal)}</p>
                  </div>
                </div>
              </Col>
              <Col className=" mt-3">
                <Form.Group className="float-end">
                  <input
                    className="form-control"
                    type="file"
                    id="upload"
                    hidden
                  />
                  <label for="upload">
                    {" "}
                    <img src={btnUpload} alt="btn-upload"/>
                  </label>
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col sm={5} className="pt-5 ps-5 justify-content-end">
            <div className="mt-5">
              <Form.Group className="mb-4">
                <input
                  className="form-control"
                  placeholder="Name"
                  type="text"
                  style={Input}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <input
                  className="form-control"
                  placeholder="Phone"
                  type="text"
                  style={Input}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <input
                  className="form-control"
                  placeholder="Pos Code"
                  type="text"
                  style={Input}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <textarea
                  className="form-control"
                  placeholder="Pos Code"
                  type="text"
                  style={{
                    height: "150px",
                    border: "2px solid #BD0707",
                    backgroundColor: "rgba(224, 200, 200, 0.25)",
                    borderRadius: "5px"
                  }}
                />
              </Form.Group>
              <div className="d-grid gap-2 mb-3">
                <Button style={CustomBtn} className="fw-semibold">
                  Pay
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
