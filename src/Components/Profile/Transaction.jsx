import React from "react";
import { Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import qr from "../../assets/img/qr.png";
import logo from "../../assets/img/waysbuck_logo.png";
import { API } from "../../config/api";
import ItemsTransaction from "./ItemsTransaction";
export default function Transaction() {

  const { data: orderProfile, isLoading } = useQuery("orderProfileCache", async () => {
    try {
      const response = await API.get("/orders");
      console.log("response data:", response)
      return response.data.data;
    } catch (err) {
      console.log(err)
    }
   
  });

  const { data: transaction } = useQuery("totalPricetrans", async () => {
    try {
      const response = await API.get("/transactions");
      console.log("response data:", response)
      return response.data.data[0];
    } catch (err) {
      console.log(err)
    }
   
  });

  const numbering = new Intl.NumberFormat('id')
  return (
    <div className="col-sm-7">
      {isLoading ? (
        <div align="center">
          <Spinner animation="border" />
        </div>
      ) : null}
      <div className="row">
        <h4 className="fw-bold mb-4" style={{ color: "#613D2B" }}>
          My Transaction
        </h4>
        <div className="p-4 rounded-3" style={{ backgroundColor: "#F6DADA" }}>
          <div className="row">
            <div className="col-sm-8">
              {orderProfile?.map((item, index) => (
                <ItemsTransaction item={item} key={index} />
              ))}
            </div>
            <div className="col-sm-4 ">
              <div align="center">
                <div className="mb-3">
                  <img src={logo} width={70} alt="logo" />
                </div>
                <div className="mb-3">
                  <img src={qr} width={90} alt="qr" />
                </div>
                <div
                  style={{ backgroundColor: "#E6FBFF", borderRadius: "5px" }}
                >
                  <p
                    className="fw-semibold"
                    style={{ color: "#00D1FF", fontSize: "14px" }}
                  >
                  {transaction.status}
                  </p>
                </div>
                <div className="mb-3">
                  <p className="fw-semibold" style={{ color: "#974A4A" }}>
                    Sub Total : {numbering.format(transaction.amount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
