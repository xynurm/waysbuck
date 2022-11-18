import React from "react";
import {  Row } from "react-bootstrap";
import top1 from "../../assets/img/top1.png";
import top2 from "../../assets/img/top2.png";
import top3 from "../../assets/img/top3.png";
import top4 from "../../assets/img/top4.png";
import top5 from "../../assets/img/top5.png";
import top6 from "../../assets/img/top6.png";
import top7 from "../../assets/img/top7.png";
import top8 from "../../assets/img/top8.png";
import TopingItem from "./TopingItem";
export default function Toping() {
  return (
    <div className="" style={{ color: "#974A4A" }}>
      <h4 className="pb-5">Toping</h4>
      <Row className="row-cols-4">
        <TopingItem name="Bubble Tea Gelatin" img={top1} />
        <TopingItem name="Manggo" img={top2} />
        <TopingItem name="Green Coconut" img={top3} />
        <TopingItem name="Boba Manggo" img={top4} />
        <TopingItem name="Bill Berry Boba" img={top5} />
        <TopingItem name="Kiwi Popping Pearl" img={top6} />
        <TopingItem name="Matcha Cantaloupe" img={top7} />
        <TopingItem name="Strawberry Popping" img={top8} />
      </Row>
    </div>
  );
}
