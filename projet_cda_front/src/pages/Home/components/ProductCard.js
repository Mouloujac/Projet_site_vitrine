import axios from '../../../axios';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';



const ProductCard = ({ produit, user }) => {

  
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
  
      console.log(panier);
      toast.success('Le produit a été ajouté au panier');
    } catch (error) {
      console.error(error);
    }
  }
  
  

    
      return (
          <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={produit.image} alt={produit.nom} />
                <Card.Body>
                <Card.Title>{produit.nom}</Card.Title>
                <Card.Text>{produit.description}</Card.Text>
                <Card.Text>Prix : {produit.prix} €</Card.Text>
                <Button variant="primary" onClick={() => { addToCart(produit) }}>Ajouter au panier</Button>
            </Card.Body>
          </Card>
        );
      

    }

export default ProductCard;