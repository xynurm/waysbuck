import React from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import qr from "../../assets/img/qr.png";
import logo from "../../assets/img/waysbuck_logo.png";
import { API } from "../../config/api";
import ItemsTransaction from "./ItemsTransaction";

export default function MyTransaction({ element }) {
  const { data: transactions } = useQuery("totalPricetrans", async () => {
    try {
      const response = await API.get("/transactions");
      console.log("response data:", response);
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  });

  const numbering = new Intl.NumberFormat("id");
  return (
    <>
      {transactions?.length >= 1 ? (
        <>
          {transactions?.map((trans, transId) => (
            <div
              className="p-4 rounded-3 mb-5"
              style={{ backgroundColor: "#F6DADA" }}
              key={transId}
            >
              <div className="row">
                <div className="col-sm-8">
                  {trans?.order.map((item, index) => (
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

                    {trans?.status === "success" ? (
                      <div
                        style={{
                          backgroundColor: "#E6FBFF",
                          borderRadius: "5px"
                        }}
                      >
                        <p
                          className="fw-semibold"
                          style={{ color: "#00D1FF", fontSize: "14px" }}
                        >
                          {trans?.status}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="bg-warning"
                        style={{ borderRadius: "5px" }}
                      >
                        <p className="fw-semibold">{trans?.status}</p>
                      </div>
                    )}

                    <div className="mb-3">
                      <p className="fw-semibold" style={{ color: "#974A4A" }}>
                        Total : {numbering.format(trans?.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Container>
          <p className="text-danger">No Items Order</p>
        </Container>
      )}
    </>
  );
}
