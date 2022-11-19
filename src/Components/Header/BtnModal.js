import React from "react";
import {
    Button
} from "react-bootstrap";
import styles from "./header.module.css";


const Styles = {
  Title: {
    color: "#BD0707"
  },
  Input: {
    border: "2px solid #BD0707",
    height: "50px",
    backgroundColor: "rgba(224, 200, 200, 0.25)"
  },
  CustomBtn: {
    backgroundColor: "#BD0707",
    height: "50px",
    fontSize: "18px"
  }
};
export default function BtnModal(props) {
  return (
    <Button
          variant={props.variant}
          size="sm"
          className={styles.outBtn}
         onClick={props.onClick}
         style={props.style}
        >
          {props.name}
        </Button>
  )
}
