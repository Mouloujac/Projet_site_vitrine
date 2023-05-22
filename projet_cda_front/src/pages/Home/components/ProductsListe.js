import React from 'react';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import axios from '../../../axios';
import "../styles/ProductsListe.css"
import "../../../components/styles/Header.css"

const ProductsListe = ({ user }) => {

  const [produits, setProduits] = useState([]); // Produits
  const [currentPage, setCurrentPage] = useState(1); // Page courante
  const [productsPerPage] = useState(8); // Produits par page
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

      
  useEffect(() => {
    axios.get('/produits').then((response) => {
      const filteredProducts = response.data.filter((produit) => produit.stock === true);
      setProduits(filteredProducts);
    }).catch((error) => {
      setProduits([])
      console.error(error);
    });
  }, []) // [] = componentDidMount (exécuté une seule fois)
  useEffect(() => {
    let filteredProducts = produits; // Commence avec tous les produits
  
    if (selectedCategory) {
      filteredProducts = produits.filter((produit) => produit.type_id === selectedCategory);
    }
  
    setFilteredProducts(filteredProducts);
  }, [produits, selectedCategory]);

  
  useEffect(() => {
    let url = '/produits';
    if (selectedCategory) {
      url += `?type_id=${selectedCategory}`;
    }
    axios.get(url)
      .then((response) => {
        const filteredProducts = response.data.filter((produit) => produit.stock === true);
        setProduits(filteredProducts);
      })
      .catch((error) => {
        setProduits([]);
        console.error(error);
      });
  }, [selectedCategory]);
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Réinitialise la page courante lorsque la catégorie change
  };
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = produits.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const categories = [
    { id: 1, name: 'Jupe' },
    { id: 2, name: 'Robe' },
    // Ajoutez d'autres catégories si nécessaire
  ];
  
  return (
    <>
    <div class="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    <div class="page-wrapper">
      
      {filteredProducts.map((produit) => (
  <ProductCard key={produit.id} produit={produit} user={user} setProduits={setProduits} />
))}

    </div>
    </>
  );
  
}

export default ProductsListe;
