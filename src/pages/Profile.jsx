import React from "react";
import { Container } from "react-bootstrap";
import MyProfile from "../Components/Profile";
import Transaction from "../Components/Profile/Transaction";
export default function Profile() {
  return (
    <Container>
      <div className="row">
        <MyProfile/>
        <Transaction/>
      </div>
    </Container>
  );
}
