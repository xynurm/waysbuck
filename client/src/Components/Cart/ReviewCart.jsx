import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import trash from '../../assets/img/trash.png';
import { API } from '../../config/api';
import btnUpload from '../../assets/img/btn_upload.png';
import ModalDelete from '../ModalDelete';
const Text = {
  Red: {
    color: '#BD0707'
  },

  Brown: {
    color: '#974A4A'
  }
};

const Hr = {
  Red: {
    border: ' 1px solid #BD0707'
  },

  Brown: {
    border: '1px solid #974A4A'
  }
};

export default function ReviewCart() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const numbering = new Intl.NumberFormat('id');

  const { orders, refetch } = useQuery('cartsCache', async () => {
    const response = await API.get('/orders');
    return response.data.data;
  });

  let resultTotal = orders?.reduce((accum, item) => {
    return accum + item.sub_amount;
  }, 0);

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/order/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  const handleDelete = (id) => {
    console.log('data id yang dipilih', id);
    setIdDelete(id);
    handleShow();
  };

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <Col sm={7}>
        <div className="mb-4">
          <h4 className="fw-bold" style={Text.Red}>
            My Cart
          </h4>
        </div>
        <div style={Text.Red}>
          <p className="fw-semibold">Review Your Order</p>

          <hr style={Hr.Brown} />
        </div>

        {/* Review Order */}
        <div className="d-flex justify-content-between my-4">
          <Row>
            <Col sm={3}>
              <div className="d-flex">
                <img
                  width={100}
                  className="rounded-3"
                  src={orders.product.image}
                  alt="cart-product"
                />
              </div>
            </Col>
            <Col>
              <div className="my-4 mx-4">
                <p className="fw-bold" style={Text.Red}>
                  {orders.product.title}
                </p>
                <p className="fw-semibold" style={Text.Red}>
                  {' '}
                  <span style={Text.Brown}>Toping :</span>{' '}
                  {orders.toping?.map((element) => element.title)}
                </p>
              </div>
            </Col>
          </Row>
          <div className="my-4">
            <p style={Text.Red}>Rp.{numbering.format(orders.sub_amount)}</p>
            <div className="float-end">
              <a href="#">
                <img
                  src={trash}
                  alt="trash"
                  onClick={() => {
                    handleDelete(orders.id);
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        <hr style={Hr.Brown} />
        <Row>
          <Col sm={7}>
            <hr style={Hr.Brown} />
            <div>
              <div className="d-flex justify-content-between">
                <div className="">
                  <p style={Text.Red}>Subtotal</p>
                  <p style={Text.Red}>Qty</p>
                </div>
                <div className="text-end">
                  <p style={Text.Red}>{numbering.format(resultTotal)}</p>
                  {orders?.length >= 1 && (
                    <p style={Text.Red}>{orders?.length}</p>
                  )}
                </div>
              </div>
              <hr style={Hr.Brown} />
            </div>
            <div className="d-flex justify-content-between">
              <div className="fw-bold">
                <text style={Text.Red}>Total</text>
              </div>
              <div className="fw-bold text-end">
                <p style={Text.Red}>{numbering.format(resultTotal)}</p>
              </div>
            </div>
          </Col>
          <Col className=" mt-3">
            <Form.Group className="float-end">
              <input className="form-control" type="file" id="upload" hidden />
              <label for="upload">
                {' '}
                <img src={btnUpload} alt="btn-upload" />
              </label>
            </Form.Group>
          </Col>
        </Row>
      </Col>
      <ModalDelete
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
