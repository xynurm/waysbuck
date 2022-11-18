import React from "react";
import ItemsTransaction from "./ItemsTransaction";
import qr from "../../assets/img/qr.png";
import logo from "../../assets/img/waysbuck_logo.png";
export default function Transaction() {
  return (
    <div className="col-sm-7">
      <div className="row">
        <h4 className="fw-bold mb-4" style={{ color: "#613D2B" }}>
          My Transaction
        </h4>
        <div className="p-4 rounded-3" style={{ backgroundColor: "#F6DADA" }}>
          <div className="row">
            <div className="col-sm-9">
              <ItemsTransaction />
              <ItemsTransaction />
            </div>
            <div className="col-sm-3 ">
              <div align="center">
                <div className="mb-3">
                <img src={logo} width={70} />
                </div>
                <div className="mb-3">
                  <img src={qr} width={90} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
