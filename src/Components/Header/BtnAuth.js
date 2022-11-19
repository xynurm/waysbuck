import React from "react";
import {
  Button
} from "react-bootstrap";

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


export default function BtnAuth(props) {
  return (
    <div className="d-grid gap-2 mb-3">
      <Button
        onClick={props.onClick}
        variant={props.variant}
        className="fw-semibold"
        style={Styles.CustomBtn}
      >
        {props.name}
      </Button>
    </div>
  );
}
