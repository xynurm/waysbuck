import React from "react";
import UserImg from "../../assets/img/userimg.png";

export default function MyProfile() {
  return (
    <div className="col-sm-5">
      <h4 className="fw-bold mb-4" style={{ color:"#613D2B" }}>MyProfile</h4>
      <div className="d-flex ">
        <img src={UserImg} className="rounded-3"></img>
        <div className="px-4">
          <div className="mb-3">
            <text className="fw-semibold" style={{ color: "#613D2B" }}>
              Fullname
            </text>
            <br />
            <text className="fw-semibold">Egi Ganteng</text>
          </div>
          <div className="mb-3">
            <text className="fw-semibold" style={{ color: "#613D2B" }}>
              Email
            </text>{" "}
            <br />
            <text className="fw-semibold">egigans@gmail.com</text>
          </div>
        </div>
      </div>
    </div>
  );
}
