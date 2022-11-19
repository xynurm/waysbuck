import React, { useState } from "react";
import {
  Col,
  Container,
  FormControl,
  FormGroup,
  Row,
  Button
} from "react-bootstrap";
import upload from "../assets/img/upload.png";
import addTop from "../assets/img/addTop.png";
import { useNavigate } from "react-router-dom";
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
export default function AddToping() {
  const topings = []


  const[toping, setToping] = useState({
    id:0,
    name:"",
    topPrice:0,
    img:""
  })

  const createToping = () => {
    let dataToping = JSON.parse(localStorage.getItem("DATA_TOPING"))
    if(dataToping !== null){
      dataToping.forEach(element => {
        topings.push(element)
      })
      toping.id = topings.length;
      topings.push(toping)
      localStorage.setItem("DATA_TOPING", JSON.stringify(topings))
    }else{
      toping.id = topings.length;
      topings.push(toping)
      localStorage.setItem("DATA_TOPING", JSON.stringify(topings))
    }
  }

  const handleOnChange = (e) => {
    setToping({
      ...toping,
      [e.target.name] : e.target.value
    })
  }

  const handlePrice = (e) => {
    setToping({
      ...toping,
      topPrice: e.target.valueAsNumber
    })
  }

  const handleOnSubmit = (e) => {
    window.location.reload()
    createToping()
    
  }

// urlImage
  // https://www.linkpicture.com/q/top1.png - top8

  return (
    <Container>
      <Row>
        <Col className="pt-5 px-5">
          <div className="pb-5">
            <h4 style={Text.Red} className="fw-bold">Toping</h4>
          </div>
          <FormGroup className="mb-4">
            <FormControl placeholder="Name Toping" type="text" name="name" onChange={handleOnChange} style={Input}></FormControl>
          </FormGroup>
          <FormGroup className="mb-4">
            <FormControl placeholder="Price" type="number" name="topPrice" onChange={handlePrice} style={Input}></FormControl>
          </FormGroup>
          <FormGroup className="mb-4">
            <FormControl type="file" id="upload" hidden />
            <FormControl placeholder="Url Image" type="text" name="img" onChange={handleOnChange} style={Input}></FormControl>
          </FormGroup>
          <div className="d-grid gap-2 mb-3">
            <Button style={CustomBtn} onClick={handleOnSubmit} className="fw-semibold">
              Add Toping
            </Button>
          </div>
        </Col>
        <Col sm={5} className="pt-5 px-5">
      
       <img src={toping.img}  className="rounded-4" alt="product-img"/>
      </Col>
      </Row>
    </Container>
  );
}
