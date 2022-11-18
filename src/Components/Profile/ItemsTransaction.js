import React from "react";
import prod1 from "../../assets/img/prod1.png";

export default function ItemsTransaction() {
  return (
    <div className="d-flex ">
      <div>
        <img src={prod1} className="rounded-3" width={100} />
      </div>
      <div className="px-3">
        <div className="mb-3">
          <text className="fw-bold fs-4" style={{ color: "#BD0707" }}>
            Ice Coffe Palm Sugar
          </text>
          <br />
          <text className="fw-light" style={{ color: "#BD0707" }}>
            <span className="fw-bold">Saturday</span>, 5 march 2020
          </text>
        </div>
        <div className="mb-3">
          <text  style={{ color: "#BD0707" }}>
            <span className="fw-semibold" style={{ color: "#974A4A" }}>
              Toping
            </span>{" "}
            : Bill Berry Boba, Buble Tea Gelatin
          </text>{" "}
          <br />
          <text className="fw-light" style={{ color: "#974A4A" }}>
            <span>Price : Rp.36.000</span>
          </text>
        </div>
      </div>
    </div>
  );
}
