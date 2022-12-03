import React, { useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import btnCancel from "../assets/img/cancel.png";
import btnCheck from "../assets/img/check.png";
import qr from "../assets/img/qr.png";
import logo from "../assets/img/waysbuck_logo.png";
import ItemsTransaction from "../Components/Profile/ItemsTransaction";
export default function IncomeTransaction() {
  const [showDetail, setShowDetail] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);
  return (
    <Container>
      <h3 style={{ color: "#BD0707" }} className="fw-bold">Income Transaction</h3>
      <div className="px-5 pt-4">
        <Table striped bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Post Code</th>
              <th>Income</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sugeng Nopants</td>
              <td>Cileungsi</td>
              <td>16820</td>
              <td onClick={handleShowDetail}>69.000</td>
              <td>Waiting Approve</td>
              <td className="text-center">
                <Button variant="danger">Cancel</Button>{" "}
                <Button style={{ backgroundColor: "#0ACF83", border: "none" }}>
                  Approve
                </Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Haris Gams</td>
              <td>Serang</td>
              <td>4211</td>
              <td>30.000</td>
              <td>Success</td>
              <td className="text-center">
                <img src={btnCheck} alt="btn-check" />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Aziz Union</td>
              <td>Bekasi</td>
              <td>13450</td>
              <td>28.000</td>
              <td>Cancel</td>
              <td className="text-center">
                <img src={btnCancel} alt="btn-check" />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Lae Tanjung Balai</td>
              <td>Tanjung Balai</td>
              <td>21331</td>
              <td>30.000</td>
              <td>On The Way</td>
              <td className="text-center">
                <img src={btnCheck} alt="btn-check" />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Modal show={showDetail} onHide={handleCloseDetail} centered>
        <div className="p-4 rounded-3 " style={{ backgroundColor: "#F6DADA" }}>
          <div className="row">
            <div className="col-sm-9">
              <ItemsTransaction />
              <ItemsTransaction />
            </div>
            <div className="col-sm-3 ">
              <div align="center">
                <div className="mb-3">
                  <img src={logo} width={70} alt="logo"/>
                </div>
                <div className="mb-3">
                  <img src={qr} width={90} alt="qr"/>
                </div>
                <div
                  style={{ backgroundColor: "#E6FBFF", borderRadius: "5px" }}
                >
                  <p
                    className="fw-semibold"
                    style={{ color: "#00D1FF", fontSize: "14px" }}
                  >
                    On The Way
                  </p>
                </div>
                <div className="mb-3">
                  <p className="fw-semibold" style={{ color: "#974A4A" }}>
                    Sub Total : 69.000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
