import React from "react";
// import prod1 from "../../assets/img/prod1.png";

export default function ItemsTransaction({item}) {
  const numbering = new Intl.NumberFormat('id')
  return (
    <div className="d-flex ">
      <div>
        {/* <img src={item.item.order.product.image} className="rounded-3" width={100} alt="prod-item"/> */}
      </div>
      <div className="px-3">
        <div className="mb-3">
          <text className="fw-bold fs-4" style={{ color: "#BD0707" }}>

          {item.product.title}
          </text>
          <br />
          <text className="fw-light" style={{ color: "#BD0707" }}>
            <span className="fw-bold">Saturday</span>, 5 march 2020
          </text>
        </div>
        <div className="mb-3">
          <text  style={{ color: "#BD0707" }}>
            <span className="fw-semibold" style={{ color: "#974A4A" }}>
              Toping
            </span>{" "}
            : {item.toping?.map((element) => element.title)}
          </text>{" "}
          <br />
          <text className="fw-light" style={{ color: "#974A4A" }}>
            <span>Price :   Rp.{numbering.format(item.sub_amount)}</span>
          </text>
        </div>
      </div>
    </div>
  );
}
