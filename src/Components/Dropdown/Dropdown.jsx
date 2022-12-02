import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import cart from "../../assets/img/cart.png";
import profile from "../../assets/img/profile.png";

export default function Dropdown({ userDropdown, adminDropdown,logOut }) {


  return (
    <>
      {userDropdown && (
        <>
          <Nav.Link className="pt-4 px-4">
            <img src={cart} alt="" />
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
              <NavDropdown.Item className="fw-bold"  onClick={ logOut }>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
        </>
      )}
      {adminDropdown && (
        <>
          <Nav.Link align="center">
            <NavDropdown
              title={<img src={profile} alt="" />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item className="fw-bold">
                <Link
                  to="/add-product"
                  className="text-decoration-none text-dark"
                >
                  Add Product
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="fw-bold">
                <Link
                  to="/add-toping"
                  className="text-decoration-none text-dark"
                >
                  Add Toping
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="fw-bold"  onClick={ logOut }>
                  Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
        </>
      )}
    </>
  );
}
