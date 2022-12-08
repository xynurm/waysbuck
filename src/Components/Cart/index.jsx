import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import trash from "../../assets/img/trash.png";
import { API } from "../../config/api";
import ModalDelete from "../ModalDelete";

const Text = {
  Red: {
    color: "#BD0707"
  },

  Brown: {
    color: "#974A4A"
  }
};

export default function ReviewOrder({ item }) {
  const { refetch } = useQuery("cartsCache", async () => {
    const response = await API.get("/orders");
    return response.data.data;
  });

  // set state id order to delete
  const [idDelete, setIdDelete] = useState(null);
  // set confirm delete
  const [confirmDelete, setConfirmDelete] = useState(null);

  // state modal delete

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // make hadndle delete
  const handleDelete = (id) => {
    console.log("data id yang dipilih", id);
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/order/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const numbering = new Intl.NumberFormat("id");
  return (
    <>
      <div className="d-flex justify-content-between my-4">
        <Row>
          <Col sm={3}>
            <div className="d-flex">
              <img
                width={100}
                className="rounded-3"
                src={item.product.image}
                alt="cart-product"
              />
            </div>
          </Col>
          <Col>
            <div className="my-4 mx-4">
              <p className="fw-bold" style={Text.Red}>
                {item.product.title}
              </p>
              <p className="fw-semibold" style={Text.Red}>
                {" "}
                <span style={Text.Brown}>Toping :</span>{" "}
                {item.toping?.map((element) => element.title)}
              </p>
            </div>
          </Col>
        </Row>
        <div className="my-4">
          <p style={Text.Red}>Rp.{numbering.format(item.sub_amount)}</p>
          <div className="float-end">
            <img
              src={trash}
              alt="trash"
              onClick={() => {
                handleDelete(item.id);
              }}
            />
          </div>
        </div>
      </div>
      <ModalDelete
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
