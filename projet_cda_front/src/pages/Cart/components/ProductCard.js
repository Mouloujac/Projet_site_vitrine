import axios from '../../../axios';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const ProductCard = ({ produit, user, updateCart, updatePanier }) => {
  const [cartUpdated, setCartUpdated] = useState(false);

  const deleteProduct = async (produit) => {
    const produit_id = produit.id;
    const panierKey = 'Panier';

    try {
      // récupérer le panier existant depuis localStorage
      const panierExist = localStorage.getItem(panierKey);
      let panier = [];

      // si le panier existe déjà, le convertir en objet JS
      if (panierExist) {
        panier = JSON.parse(panierExist);
      }

      // trouver l'indice de l'id du produit dans le tableau de produit_ids
      const index = panier.findIndex((p) => p.id === produit_id);
      if (index > -1) {
        // supprimer l'élément du tableau de produit_ids
        panier.splice(index, 1);
        
        if (panier.length === 0) {
          localStorage.removeItem(panierKey);
        } else {
          // enregistrer le panier mis à jour dans localStorage
          localStorage.setItem(panierKey, JSON.stringify(panier));
        }
      }
      console.log('lol')
      updatePanier(panier);
      setCartUpdated(true);
      toast.success('Le produit a été supprimé du panier');
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (produit) => {
    const panierKey = 'Panier';
    try {
      // Récupérer le panier existant depuis localStorage
      const panierExist = localStorage.getItem(panierKey);
      let panier = [];

      // Si le panier existe déjà, le convertir en tableau JS
      if (panierExist) {
        panier = JSON.parse(panierExist);
      }

      // Ajouter le nouveau produit au panier
      panier.push(produit);

      // Enregistrer le panier mis à jour dans localStorage
      localStorage.setItem(panierKey, JSON.stringify(panier));

      // Enregistrer le panier dans la table "paniers" de la base de données
      const response = await axios.post('/api/paniers', {
        produit_id: produit.id,
        user_id: user.id,
        statut: false,
      });
      console.log(response.data);

      setCartUpdated(true);
      updateCart()
      toast.success('Le produit a été ajouté au panier');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Recharger les produits à chaque mise à jour du panier
    console.log('Panier mis à jour !');
  }, [cartUpdated]);

  return (
    <tr>
      <td>
        <img src={produit.image} alt={produit.nom} />
      </td>
      <td>{produit.nom}</td>
      <td>{produit.description}</td>

        <td>{produit.prix} €</td>
        <td><Button variant="outline-danger" onClick={() =>{deleteProduct(produit)} }>Supprimer</Button></td>
        </tr>
    );
      
      
}

export default ProductCard;
