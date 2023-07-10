import React from "react";
import ProductCard from "./ProductCard";
import { useState, useEffect, useRef } from "react";
import axios from "../../../axios";
import "../styles/ProductsListe.css";
import "../../../components/styles/Navbar.css";

const ProductsListe = ({ user }) => {
  const [produits, setProduits] = useState([]); // Produits
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setselectedCategory] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [category, setcategory] = useState([]);
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

  const handleCategoryInput = () => {
    let checkbox = document.getElementById("categoryInput");
    let Category = document.getElementById("category");
    if (checkbox.checked) {
      Category.classList.remove("categoryNone");
      Category.classList.add("categoryVisible");
    } else {
      Category.classList.remove("categoryVisible");
      Category.classList.add("categoryNone");
    }
  };
  
  useEffect(() => {
    axios.get("api/produits")
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
    if (selectedCategory.includes(categoryId)) {
      setselectedCategory(
        selectedCategory.filter((id) => id !== categoryId)
      );
    } else {
      setselectedCategory([...selectedCategory, categoryId]);
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

    if (selectedCategory.length > 0) {
      filteredProducts = produits.filter((produit) =>
        selectedCategory.includes(produit.type_id)
      );
    }

    if (selectedSizes.length > 0) {
      filteredProducts = filteredProducts.filter((produit) =>
        selectedSizes.includes(produit.taille_id)
      );
    }

    setFilteredProducts(filteredProducts);
  }, [produits, selectedCategory, selectedSizes]);

  useEffect(() => {
    let url = "api/produits";

    if (selectedCategory.length > 0 || selectedSizes.length > 0) {
      const queryParams = [];

      if (selectedCategory.length > 0) {
        const categoryQueryParam = selectedCategory.join(",");
        queryParams.push(`type_id=${categoryQueryParam}`);
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
  }, [selectedCategory, selectedSizes]);

  

  useEffect(() => {
    axios
      .get("/api/types")
      .then((response) => {
        setcategory(response.data);
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

  useEffect(() => {
    const optionMenu = document.querySelector(".select-menu");
    const selectBtn = optionMenu.querySelector(".select-btn");
    const options = optionMenu.querySelectorAll(".option");
    const sBtn_text = optionMenu.querySelector(".sBtn-text");
  
    const handleClick = () => {
      optionMenu.classList.toggle("active");
    };
  
    selectBtn.addEventListener("click", handleClick);
  
    options.forEach((option) => {
      option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
  
        optionMenu.classList.remove("active");
      });
    });
  
    return () => {
      selectBtn.removeEventListener("click", handleClick);
    };
  }, []);
  
  return (
    <div id="productPage">
      
      
        <div className="select-menu" >
  <div className="select-btn">
    <span className="sBtn-text">Trier par taille ou type</span>
    <i className="bx bx-chevron-down"></i>
  </div>

  <ul className="options">
    <li className="option">
    <div id="types" className="category-row">
          {category.map((category) => (
            <label key={category.id} className="category-label">
              {category.nom}
              <input
                type="checkbox"
                checked={selectedCategory.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
            </label>
          ))}
        </div>
    </li>
    <div id="separator"></div>
    <li className="option"> 
    <div id="size" className="category-row">
          {sizes.map((size) => (
            <label key={size.id} className="category-label">
              {size.nom}- 
              <input
                type="checkbox"
                checked={selectedSizes.includes(size.id)}
                onChange={() => handleSizeChange(size.id)}
              />
              
            </label>
          ))}
        
        </div>
    </li>
  
  </ul>
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
