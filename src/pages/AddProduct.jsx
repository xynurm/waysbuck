import React, { useState } from "react";
import {
  Button,
  Col,
  Container, Form, FormControl,
  FormGroup,
  Row
} from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";

const Text = {
  Red: {
    color: "#BD0707"
  },

  Brown: {
    color: "#974A4A"
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

export default function AddProduct() {
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);
      const response = await API.post("/product", formData);
      console.log("data porduct berhasil ditambahkan", response.data.data);
    } catch (err) {
      console.log(err);

      alert("failed add product");
    }
  });

  return (
    <Container>
      <Row>
        <Col className="pt-5 px-5">
          <div className="pb-5">
            <h4 style={Text.Red} className="fw-bold">
              Product
            </h4>
          </div>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <FormGroup className="mb-4">
              <FormControl
                placeholder="Name Product"
                type="text"
                onChange={handleChange}
                name="title"
                style={Input}
              />
            </FormGroup>
            <FormGroup className="mb-4">
              <FormControl
                placeholder="Price"
                type="text"
                onChange={handleChange}
                name="price"
                style={Input}
              ></FormControl>
            </FormGroup>
            <FormGroup className="mb-5">
              <FormControl
                type="file"
                name="image"
                onChange={handleChange}
                style={Input}
              />
            </FormGroup>
            <div className="d-grid gap-2 mt-3">
              <Button
                onClick={(e) => handleSubmit.mutate(e)}
                style={CustomBtn}
                className="fw-semibold"
              >
                Add Product
              </Button>
            </div>
          </Form>
        </Col>
        <Col sm={5} className="pt-5 px-5">
          {preview && (
            <div>
              <img src={preview} alt={preview} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
