import React from "react";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "../../../axios";
import "../styles/ProductsListe.css";
import "../../../components/styles/Header.css";

const ProductsListe = ({ user }) => {
  const [produits, setProduits] = useState([]); // Produits
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/produits")
      .then((response) => {
        const filteredProducts = response.data.filter(
          (produit) => produit.stock === true
        );
        setProduits(filteredProducts);
      })
      .catch((error) => {
        setProduits([]);
        console.error(error);
      });
  }, []); // [] = componentDidMount (exécuté une seule fois)
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  useEffect(() => {
    let filteredProducts = produits; // Commence avec tous les produits

    if (selectedCategories.length > 0) {
      filteredProducts = produits.filter((produit) =>
        selectedCategories.includes(produit.type_id)
      );
    }

    setFilteredProducts(filteredProducts);
  }, [produits, selectedCategories]);

  useEffect(() => {
    let url = "/produits";
    if (selectedCategories.length > 0) {
      const categoriesQueryParam = selectedCategories.join(",");
      url += `?type_id=${categoriesQueryParam}`;
    }
    axios
      .get(url)
      .then((response) => {
        const filteredProducts = response.data.filter(
          (produit) => produit.stock === true
        );
        setProduits(filteredProducts);
      })
      .catch((error) => {
        setProduits([]);
        console.error(error);
      });
  }, [selectedCategories]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/api/types")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id="productPage">
      <div className="categories">
        <h3>Vêtements</h3>
        {categories.map((category) => (
          <label key={category.id} className="category-label" >
            {category.nom}
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
            />
            
          </label>
          
        ))}
      </div>

      <div className="page-wrapper">
        {filteredProducts.map((produit) => (
          <ProductCard
            key={produit.id}
            produit={produit}
            user={user}
            setProduits={setProduits}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsListe;
