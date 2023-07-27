import React from "react";
import {
    Button
} from "react-bootstrap";
import styles from "./header.module.css";



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
