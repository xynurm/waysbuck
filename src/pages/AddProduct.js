import React,{useState} from "react";
import {
  Col,
  Container,
  FormControl,
  FormGroup,
  Row,
  Button
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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


const CustomBtn = {
  backgroundColor: "#BD0707",
  height: "40px",
  fontSize: "18px",
  border: "none"
};




export default function AddProduct() {
  const products = []
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    price:0, 
    img:""
  });
  
  const createProduct = () => {
    let dataProduct = JSON.parse(localStorage.getItem("DATA_PRODUCT"));
    if (dataProduct !== null){
      dataProduct.forEach(element => {
        products.push(element)
      });
      product.id = products.length;
      products.push(product)
      localStorage.setItem("DATA_PRODUCT", JSON.stringify(products))
    }else{
      product.id = products.length;
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

  const handlePrice = (e) => {
    setProduct({
      ...product,
      price: e.target.valueAsNumber
    })
  }

  


  const handleOnSubmit = (e) => {
    e.preventDefault()
    createProduct()
    navigate("/")
  }

  // link img
  // prod 1 : https://www.linkpicture.com/q/prod1.png
// prod 2: https://www.linkpicture.com/q/prod2.png
// prod 3: https://www.linkpicture.com/q/prod3.png
// prod 4 : https://www.linkpicture.com/q/prod3.png
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
          <FormControl placeholder="Price" type="number" onChange={handlePrice} name="price" style={Input}></FormControl>
        </FormGroup>
        <FormGroup className="mb-5">
          <FormControl type="text" name="img" onChange={handleOnChange} placeHolder="Url Image" style={Input} />
        </FormGroup>
        <div className="d-grid gap-2 mt-3">
          <Button onClick={handleOnSubmit} style={CustomBtn} className="fw-semibold">
            Add Product
          </Button>
        </div>
      </Col>
      <Col sm={5} className="pt-5 px-5">
      
       <img src={product.img}  className="rounded-4" alt="product-img"/>
      </Col>
    
    </Row>
 
  </Container>
  )
}
