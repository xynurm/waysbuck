import React from "react";
import MyTransaction from "./MyTransaction";
export default function Transaction() {



  return (
    <div className="col-sm-7">
      <div className="row">
        <h4 className="fw-bold mb-4" style={{ color: "#613D2B" }}>
          My Transaction
        </h4>
      <MyTransaction/>
      </div>
    </div>
  );
}
