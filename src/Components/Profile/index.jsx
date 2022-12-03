import React from "react";
import UserImg from "../../assets/img/userimg.png";

const dataLogin = JSON.parse(localStorage.getItem("login"));


export default function MyProfile() {
  const getLogin = [...dataLogin];
  return (
    <div className="col-sm-5">
      <h4 className="fw-bold mb-4" style={{ color:"#613D2B" }}>MyProfile</h4>
      <div className="d-flex ">
        <img src={UserImg} className="rounded-3" alt="img-profile"></img>
        <div className="px-4">
          <div className="mb-3">
            <text className="fw-semibold" style={{ color: "#613D2B" }}>
              Fullname
            </text>
            <br />
            <text className="fw-semibold">{getLogin[0].fullname}</text>
          </div>
          <div className="mb-3">
            <text className="fw-semibold" style={{ color: "#613D2B" }}>
              Email
            </text>{" "}
            <br />
            <text className="fw-semibold">{getLogin[0].email}</text>
          </div>
        </div>
      </div>
    </div>
  );
}
