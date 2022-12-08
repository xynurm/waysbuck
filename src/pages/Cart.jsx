import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import btnUpload from "../assets/img/btn_upload.png";
import ReviewOrder from "../Components/Cart";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

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
  const { data: orders, isLoading } = useQuery("cartsCache", async () => {
    const response = await API.get("/orders");
    return response.data.data;
  });
  let navigate = useNavigate();

  const [state] = useContext(UserContext);

  let resultTotal = orders?.reduce((accum, item) => {
    return accum + item.sub_amount;
  }, 0);

  const numbering = new Intl.NumberFormat("id");

  const [form, setForm] = useState({
    user_id: state.user.id,
    phone: "",
    pos_code: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  let { data: profile } = useQuery("profileCache", async () => {
    try {
      const response = await API.get("/profiles");
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  });

  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/user/" + state.user.id);
    return response.data.data;
  });

  useEffect(() => {
    if (profile) {
      setForm({
        ...form,
        phone: profile.phone,
        pos_code: profile.pos_code,
        address: profile.address
      });
    }
  }, [profile]);

  const handleSubmit = useMutation(async (e) => {
    try {
      const formData = new FormData();
      formData.set("phone", form.phone);
      formData.set("pos_code", form.pos_code);
      formData.set("address", form.address);
      await API.post("/profile", formData);

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const data = {
        amount: resultTotal,
      };
      const body = JSON.stringify(data);
      const response = await API.post("/transaction", body, config);
  
      const idTransaction = response.data.data.id;
      console.log("transaksi response :",response.data.data)
      

      const snapToken = await API.get(`/midtrans/${idTransaction}`);
      const token = snapToken.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        }
        
      }
      );
      
      const orderUpdate= {
        transaction_id: idTransaction,
        status: snapToken.data.data.status
      };
      for (let i = 0; i < orders.length; i++) {
       
        const bodyTrans = JSON.stringify(orderUpdate);
        API.patch(`/order/${orders[i].id}`, bodyTrans);
      }
      console.log("snaptoken",snapToken.data.data)
    } catch (err) {
      console.log(err);
    }

    
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    // const myMidtransClientKey = "SB-Mid-client-m9h4S-nw-g1T5Qcy";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
    {orders?.length >= 1 ? (
      <>
        {isLoading ? (
          <div align="center">
            <Spinner animation="border" />
          </div>
        ) : null}
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
                          <p style={Text.Red}>
                            {numbering.format(resultTotal)}
                          </p>
                          {orders?.length >= 1 && (
                            <p style={Text.Red}>{orders?.length}</p>
                          )}
                        </div>
                      </div>
                      <hr style={Hr.Brown} />
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="fw-bold">
                        <text style={Text.Red}>Total</text>
                      </div>
                      <div className="fw-bold text-end">
                        <p style={Text.Red}>
                          {numbering.format(resultTotal)}
                        </p>
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
                        <img src={btnUpload} alt="btn-upload" />
                      </label>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col sm={5} className="pt-5 ps-5 justify-content-end">
                <div className="mt-5">
                  <Form
                    onSubmit={(e) => handleSubmit.mutate(e)}
                    encType="multipart/form-data"
                  >
                    <Form.Group className="mb-4">
                      <input
                        className="form-control"
                        placeholder="Full Name"
                        value={user?.fullName}
                        type="text"
                        style={Input}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <input
                        className="form-control"
                        placeholder="Email"
                        value={user?.email}
                        type="text"
                        style={Input}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <input
                        className="form-control"
                        placeholder="Phone"
                        value={form?.phone}
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        style={Input}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <input
                        className="form-control"
                        placeholder="Pos Code"
                        value={form?.pos_code}
                        type="text"
                        name="pos_code"
                        onChange={handleChange}
                        style={Input}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <textarea
                        className="form-control"
                        placeholder="Address"
                        value={form?.address}
                        type="text"
                        name="address"
                        onChange={handleChange}
                        style={{
                          height: "150px",
                          border: "2px solid #BD0707",
                          backgroundColor: "rgba(224, 200, 200, 0.25)",
                          borderRadius: "5px"
                        }}
                      />
                    </Form.Group>
                    <div className="d-grid gap-2 mb-3">
                      <Button
                        style={CustomBtn}
                        className="fw-semibold"
                        onClick={(e) => handleSubmit.mutate(e)}
                      >
                        Pay
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </>
    ) : (
    <Container>
      <p style={Text.Red}>No Items Order</p>
    </Container>
    
    )}
  </>
  );
}
