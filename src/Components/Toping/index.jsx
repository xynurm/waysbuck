import React from "react";
import { Col } from "react-bootstrap";
import styles from "./DetailProduct.Module.css";
export default function TopingItem({ item, index, handleChangeToping }) {
  return (
    <Col className="px-1">
      <div
        className="card align-items-center "
        style={{ width: "125px", border: "none" }}
      >
        <input
          type="checkbox"
          name={item.id}
          id={index}
          value={item.price}
          className={styles}
          onChange={handleChangeToping}
        />
        <label htmlFor={index}>
          <img
            src={item.image}
            className="card-img-top mb-2"
            style={{ width: "75px" }}
            alt=""
          />
        </label>

        <p style={{ color: "#BD0707", fontSize: "14px", textAlign: "center" }}>
          {item.title}
        </p>
      </div>
    </Col>
  );
}
