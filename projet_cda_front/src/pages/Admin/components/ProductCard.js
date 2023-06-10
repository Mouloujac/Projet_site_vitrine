import axios from "../../../axios";
import UpdateForm from "./UpdateForm";
import { useState } from "react";
import { ModalDialog } from "react-bootstrap";

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
            {produit.image} 
          </td>
          <td>{produit.nom}</td>
          <td>{produit.description}</td>
          <td >{produit.prix} €</td>
          <td>
            <button variant="primary" onClick={handleShow}>
              Modifier produit
            </button>
            <div show={show} onHide={handleClose}>
              <div closeButton>
                <div>Ajouter un nouveau produit</div>
              </div>
              
              <ModalDialog>
                <UpdateForm
                  user={user}
                  produit={produit}
                  handleClose={handleClose}
                  handleUpdate={handleUpdate}
                  updateProducts={updateProducts}
                />
              </ModalDialog>
            </div>
          </td>
        </tr>
    
  );
};

export default ProductCard;
