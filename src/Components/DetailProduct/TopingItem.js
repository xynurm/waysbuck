import React from "react";
import { Col } from "react-bootstrap";
import styles from "./DetailProduct.Module.css";
export default function TopingItem({item}) {

  return (
    <Col className="px-1">
      <div
        className="card align-items-center "
        style={{ width: "125px", border: "none" }}
      >
        <input  type="checkbox" name={item.title} id={item.id} className={styles} />
        <label htmlFor={item.id}>
        <img
          src={item.image}
          className="card-img-top mb-2"
          style={{ width: "75px" }}
          alt=""
        />
        </label>

        <p style={{ color: "#BD0707", fontSize:"14px", textAlign:"center", }}>{item.title}</p>
      </div>
    </Col>
    
  );
}
