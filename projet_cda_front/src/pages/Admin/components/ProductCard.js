import axios from "../../../axios";
import { Button, Modal } from "react-bootstrap";
import UpdateForm from "./UpdateForm";
import { useState } from "react";

const ProductCard = ({ produit, user, setProducts, updateProducts }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = async (updateProduct) => {
    try {
      handleClose();
      console.log("okproduct");
      updateProducts(updateProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
        <tr>
          <td>
            <input type="checkbox" ></input>
          </td>
          <td>
            <img src={produit.image} alt={produit.nom} />
          </td>
          <td>{produit.nom}</td>
          <td>{produit.description}</td>
          <td >{produit.prix} €</td>
          <td>
            <Button variant="primary" onClick={handleShow}>
              Modifier produit
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ajouter un nouveau produit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UpdateForm
                  user={user}
                  produit={produit}
                  handleClose={handleClose}
                  handleUpdate={handleUpdate}
                  updateProducts={updateProducts}
                />
              </Modal.Body>
            </Modal>
          </td>
        </tr>
    
  );
};

export default ProductCard;
