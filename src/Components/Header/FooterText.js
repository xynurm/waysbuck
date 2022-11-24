import React from "react";
import { Link } from "react-router-dom";


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
export default function FooterText(props) {
  return (
    <div className="text-center">
    <p className="fw-semibold">{props.title} Klick <Link className="text-dark fw-bold" style={{ textDecoration:"none" }} onClick={props.click} > Here</Link> </p>
  </div>
  )
}
