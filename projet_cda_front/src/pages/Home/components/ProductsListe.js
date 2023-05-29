import React from "react";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "../../../axios";
import "../styles/ProductsListe.css";
import "../../../components/styles/Navbar.css";

const ProductsListe = ({ user }) => {
  const [produits, setProduits] = useState([]); // Produits
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  const handleTaillesInput = () => {
    let checkbox = document.getElementById("taillesInput");
    let Tailles = document.getElementById("tailles");
    if (checkbox.checked) {
      Tailles.classList.remove("taillesNone");
      Tailles.classList.add("taillesVisible");
    } else {
      Tailles.classList.remove("taillesVisible");
      Tailles.classList.add("taillesNone");
    }
  };

  const handleCategoriesInput = () => {
    let checkbox = document.getElementById("categoriesInput");
    let Categories = document.getElementById("categories");
    if (checkbox.checked) {
      Categories.classList.remove("categoriesNone");
      Categories.classList.add("categoriesVisible");
    } else {
      Categories.classList.remove("categoriesVisible");
      Categories.classList.add("categoriesNone");
    }
  };
  
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
  }, []);

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSizeChange = (sizeId) => {
    if (selectedSizes.includes(sizeId)) {
      setSelectedSizes(selectedSizes.filter((id) => id !== sizeId));
    } else {
      setSelectedSizes([...selectedSizes, sizeId]);
    }
  };

  useEffect(() => {
    let filteredProducts = produits; // Commence avec tous les produits

    if (selectedCategories.length > 0) {
      filteredProducts = produits.filter((produit) =>
        selectedCategories.includes(produit.type_id)
      );
    }

    if (selectedSizes.length > 0) {
      filteredProducts = filteredProducts.filter((produit) =>
        selectedSizes.includes(produit.taille_id)
      );
    }

    setFilteredProducts(filteredProducts);
  }, [produits, selectedCategories, selectedSizes]);

  useEffect(() => {
    let url = "/produits";

    if (selectedCategories.length > 0 || selectedSizes.length > 0) {
      const queryParams = [];

      if (selectedCategories.length > 0) {
        const categoriesQueryParam = selectedCategories.join(",");
        queryParams.push(`type_id=${categoriesQueryParam}`);
      }

      if (selectedSizes.length > 0) {
        const sizesQueryParam = selectedSizes.join(",");
        queryParams.push(`taille_id=${sizesQueryParam}`);
      }
 
      url += `?${queryParams.join("&")}`;
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
  }, [selectedCategories, selectedSizes]);

  

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

  useEffect(() => {
    axios
      .get("/api/tailles")
      .then((response) => {
        setSizes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id="productPage">
      <div id="checkboxMenu">
      <div className="checkboxContainer">
        <div>Vêtements</div>
        <label for="categoriesInput">▼</label>
        <input
          type="checkbox"
          id="categoriesInput"
          onChange={handleCategoriesInput}
        />
        <div id="categories" class="categoriesNone">
          {categories.map((category) => (
            <label key={category.id} className="category-label">
              {category.nom}
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
            </label>
          ))}
        </div>
        </div>

        <div className="checkboxContainer">
          
        <div>Tailles</div>
        <label for="taillesInput">▼</label>
        <input
          type="checkbox"
          id="taillesInput"
          onChange={handleTaillesInput}
        />
        <div id="tailles" class="taillesNone">
          {sizes.map((size) => (
            <label key={size.id} className="tailles-label">
              
              <input
                type="checkbox"
                checked={selectedSizes.includes(size.id)}
                onChange={() => handleSizeChange(size.id)}
              />
              {size.nom}
            </label>
          ))}
          Clear all
        </div>
      </div>
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
