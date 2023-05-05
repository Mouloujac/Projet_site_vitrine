import React from 'react';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import axios from '../../../axios';
import { CardGroup, Pagination } from 'react-bootstrap';

const ProductsListe = ({ user }) => {

  const [produits, setProduits] = useState([]); // Produits
  const [currentPage, setCurrentPage] = useState(1); // Page courante
  const [productsPerPage] = useState(8); // Produits par page
      
  useEffect(() => {
    axios.get('/produits').then((response) => {
      const filteredProducts = response.data.filter((produit) => produit.stock === true);
      setProduits(filteredProducts);
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
      <div className="row">
        {currentProducts.map((produit) => (
          <CardGroup className="col-md-3" key={produit.id}>
            <ProductCard produit={produit} user={user} setProduits={setProduits}/>
          </CardGroup>
        ))}
      </div>
      <div className="text-center">
        <Pagination>
          {Array.from({length: Math.ceil(produits.length / productsPerPage)}, (v, i) => (
            <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}

export default ProductsListe;
