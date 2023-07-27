import React from "react";
import { Form } from "react-bootstrap";
const Styles = {
    Title: {
      color: "#BD0707"
    },
    Input: {
      border: "2px solid #BD0707",
      height: "50px",
      backgroundColor: "rgba(224, 200, 200, 0.25)"
    },
    CustomBtn: {
      backgroundColor: "#BD0707",
      height: "50px",
      fontSize: "18px"
    }
  };

export default function FormGroupAuth(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
       
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        style={Styles.Input}
        value={props.value}
      ></Form.Control>
    </Form.Group>
  );
}
