import React from 'react';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Pagination, Button, Modal} from 'react-bootstrap';
import CreateForm from './CreateForm';
import Table from 'react-bootstrap/Table';


const ProductsListe = ({ user }) => {
  const [show, setShow] = useState(false);
  const [produits, setProduits] = useState([]); // Produits
  const [currentPage, setCurrentPage] = useState(1); // Page courante
  const [productsPerPage] = useState(8); // Produits par page

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const updateProducts = async () => {
    const response = await axios.get('/produits');
    console.log("ok")
    setProduits(response.data);
  }
  
      
  useEffect(() => {
    axios.get('/produits').then((response) => {
      setProduits(response.data);
      
    }).catch((error) => {
      setProduits([])
      console.error(error);
    });
  }, []) // [] = componentDidMount (exécuté une seule fois)
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = produits.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Ajouter produit
      </Button>
      <Table striped bordered hover repsponsive>
        <thead>
          <tr>
            <th>Supprimer</th>
            <th>Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((produit) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <Pagination>
          {Array.from({length: Math.ceil(produits.length / productsPerPage)}, (v, i) => (
            <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateForm user={user} handleClose={handleClose} updateProducts={updateProducts} />
        </Modal.Body>
      </Modal>
    </div>
  );
};


export default ProductsListe;
