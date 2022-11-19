import React,{useState} from "react";
import {
  Col,
  Container,
  FormControl,
  FormGroup,
  Row,
  Button
} from "react-bootstrap";
import upload from "../assets/img/upload.png";
import addProd from "../assets/img/addProd.png";
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

const Upload = {
  border: "2px solid #BD0707",

  height: "50px",
  backgroundColor: "rgba(224, 200, 200, 0.25)",
  borderRadius: "5px",
  placeholder: "none"
};

const CustomBtn = {
  backgroundColor: "#BD0707",
  height: "40px",
  fontSize: "18px",
  border: "none"
};




export default function AddProduct() {
  const products = []

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    img:""
  });
  
  const createProduct = () => {
    let dataProduct = JSON.parse(localStorage.getItem("DATA_PRODUCT"));
    if (dataProduct !== null){
      dataProduct.forEach(element => {
        products.push(element)
      });
      dataProduct.push(product)
      localStorage.setItem("DATA_PRODUCT", JSON.stringify(dataProduct))
    }else{
      products.push(product)
      localStorage.setItem("DATA_PRODUCT", JSON.stringify(products))
    }
   
  };

  const handleOnChange = (e) => {
    setProduct({
      ...product,
      [e.target.name] : e.target.value
    })
  }

  // const handleOnChangeImg = (e) => {
  //   setProduct({
  //     ...product,
  //    img : document.getElementById('input').files[0];
  //   })
  // }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    createProduct()

  }

  return (
    <Container>
    <Row>
      <Col className="pt-5 px-5">
        <div className="pb-5">
          <h4 style={Text.Red} className="fw-bold">Product</h4>
        </div>
        <FormGroup className="mb-4">
          <FormControl placeholder="Name Product" type="text" onChange={handleOnChange} name="name" style={Input}/>
        </FormGroup>
        <FormGroup className="mb-4">
          <FormControl placeholder="Price" text="number" onChange={handleOnChange} name="price" style={Input}></FormControl>
        </FormGroup>
        <FormGroup className="mb-5">
          <FormControl type="text" id="upload" name="img" onChange={handleOnChange}  />
            {/* <FormGroup>
              <label
                htmlFor="upload"
                className="input-group-text "
                id="addon-wrapping"
                style={Upload}
              >
                <Col sm={11} className="text-start text-muted">
                  Photo Product
                </Col>
                <Col>
                  <img src={upload} />
                </Col>
              </label>
            </FormGroup> */}
        </FormGroup>
        <div className="d-grid gap-2 mt-3">
          <Button onClick={handleOnSubmit} style={CustomBtn} className="fw-semibold">
            Add Product
          </Button>
        </div>
      </Col>
      <Col sm={5}>
        <div>
          <img src={addProd}/>
        </div>
      </Col>
    </Row>
  </Container>
  )
}
