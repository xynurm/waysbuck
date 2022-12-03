import React from "react";
import { Link } from "react-router-dom";

export default function FooterText(props) {
  return (
    <div className="text-center">
      <p className="fw-semibold">
        {props.title} Klick{" "}
        <Link
          className="text-dark fw-bold"
          style={{ textDecoration: "none" }}
          onClick={props.click}
        >
          {" "}
          Here
        </Link>{" "}
      </p>
    </div>
  );
}
