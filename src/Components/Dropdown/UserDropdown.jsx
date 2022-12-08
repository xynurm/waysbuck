import React from "react";
import { Badge, Nav, NavDropdown } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import cart from "../../assets/img/cart.png";
import profile from "../../assets/img/profile.png";
import { API } from "../../config/api";

export default function UserDropdown({ logOut }) {
  const { data: orders } = useQuery("ordersCache", async () => {
    const response = await API.get("/orders");
    return response.data.data;
  });

  return (
    <>
      <Nav.Link className="pt-4 px-4">
        <Link to="/cart" className="text-decoration-none text-dark">
          <img src={cart} alt="" />
          {orders?.length >= 1 && <Badge bg="danger">{orders?.length}</Badge>}
        </Link>
      </Nav.Link>
      <Nav.Link align="center">
        <NavDropdown
          title={<img src={profile} alt="" />}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item className="fw-bold">
            <Link to="/profile" className="text-decoration-none text-dark">
              Profile
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item className="fw-bold" onClick={logOut}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav.Link>
    </>
  );
}
