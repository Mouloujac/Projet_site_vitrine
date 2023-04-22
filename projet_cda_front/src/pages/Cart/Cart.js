import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import axios from "../../axios";
import { Button } from "react-bootstrap";

const Cart = ({ user }) => {
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState( [] );

  useEffect(() => {
    const getPanier = () => {
      const panier = localStorage.getItem("Panier");
      if (panier) {
        const paniers = JSON.parse(panier);
        console.log('reload');
        return paniers;
      } else {
        console.log('vide');
        // reload 1 seule fois
        window.location = '/';
      }
      return { produit_ids: [] };
    };

    const cartItems = JSON.parse(localStorage.getItem("Panier")) || [];
    const produitIds = cartItems.map((item) => item.id);
    console.log(produitIds);
    if (produitIds.length > 0) {
      axios
        .get(`/panier?produitIds=${JSON.stringify(produitIds)}`)
        .then((response) => {
          setProduits(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setPanier(getPanier());
  }, []);

  const updateCart = () => {
    const panierKey = 'Panier';
    const panierExist = localStorage.getItem(panierKey);
    let panier =  [] ;
    if (panierExist) {
        panier = JSON.parse(panierExist);
    }
    setPanier(panier);  
  };
  
  const userId = user.id;
  const validateCart = () => {

    const panierData = cartItems.map((item) => ({
      user_id: userId,
      produit_id: item.id,
      statut: 0, // replace with the desired value
    }));
    console.log(panierData);

    axios
      .post("/panier", panierData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cartItems = JSON.parse(localStorage.getItem("Panier")) || [];
  const cartItemsNumber = cartItems.length;

  const updatePanier = (panier) => {
    localStorage.setItem("Panier", JSON.stringify(panier));
    setPanier(panier);
  };
  
  return (
    <div>
      <h1>Mon panier</h1>
      {produits.map((produit) => (
        <div className="col-md-3" key={produit.id}>
          <ProductCard produit={produit} updateCart={updateCart} updatePanier={updatePanier}/>
        </div>
      ))}
       <Button onClick={validateCart}>Valider panier</Button>
    </div>
  );
};

export default Cart;
