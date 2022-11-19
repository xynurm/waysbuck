import React from "react";
import ItemsTransaction from "./ItemsTransaction";
import qr from "../../assets/img/qr.png";
import logo from "../../assets/img/waysbuck_logo.png";
import { Badge } from "react-bootstrap";
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
               <div style={{ backgroundColor:"#E6FBFF", borderRadius:"5px", }}>
                <p className="fw-semibold" style={{ color:"#00D1FF", fontSize:"14px" }}>On The Way</p>
               </div>
               <div className="mb-3">
                <p className="fw-semibold" style={{ color: "#974A4A" }}>Sub Total : 69.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
