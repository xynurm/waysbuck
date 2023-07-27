import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/waysbuck_logo.png";
import Auth from "../Auth";
export default function Header() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Image src={Logo} width="80px" height="80px"></Image>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Auth />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
