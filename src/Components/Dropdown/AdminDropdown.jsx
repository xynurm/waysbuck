import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import profile from "../../assets/img/profile.png";
export default function AdminDropdown({ logOut }) {
  return (
    <Nav.Link align="center">
      <NavDropdown title={<img src={profile} alt="profile" />} id="basic-nav-dropdown">
        <NavDropdown.Item className="fw-bold">
          <Link to="/add-product" className="text-decoration-none text-dark">
            Add Product
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Item className="fw-bold">
          <Link to="/add-toping" className="text-decoration-none text-dark">
            Add Toping
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Item className="fw-bold" onClick={logOut}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav.Link>
  );
}
