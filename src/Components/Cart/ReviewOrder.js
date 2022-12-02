import React from "react";
import {Row, Col} from "react-bootstrap";
import prod1 from "../../assets/img/prod1.png";
import trash from "../../assets/img/trash.png"


const Text ={
  Red: {
    color: "#BD0707"
  },

  Brown:{
    color:"#974A4A"
  },
}


export default function ReviewOrder({item}) {

  const numbering = new Intl.NumberFormat('id')

  return (
    <div className="d-flex justify-content-between my-4">
    <Row>
      <Col sm={3}>
        <div className="d-flex">
          <img width={100} className="rounded-3" src={item.product.image} />
        </div>
      </Col>
      <Col>
        <div className="my-4 mx-4">
          <p className="fw-bold" style={Text.Red}>{item.product.title}</p>
          <p className="fw-semibold" style={Text.Red}>
            {" "}
            <span style={Text.Brown}>Toping :</span> {item.toping?.map((element) => (
              element.title   
            ))}
        
          </p>
        </div>
      </Col>
    </Row>
    <div className="my-4">
      <p style={Text.Red}>Rp.{numbering.format(item.sub_amount)}</p>
      <div className="float-end">
      <img src={trash}/>
      </div>
    </div>
  </div>

  )
}
