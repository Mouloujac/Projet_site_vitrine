import { Card, Button, Nav, } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCart } from '../../../redux/cartSlice';
import { replaceCart } from '../../../redux/cartSlice'
import  axios  from '../../../axios';
import { useNavigate } from "react-router-dom";

const ProductCard =  ({ produit, setProduits }) => {
   
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const handleAddToCart =  (produit) => {
    axios.put(`/api/produits/${produit.id}`, {
        nom: produit.nom,
        description: produit.description,
        prix: produit.prix,
        image: produit.image,
        taille_id: produit.taille_id,
        type_id: produit.type_id,
        stock: false,
      })
      .then(() => {
        // Récupérer les nouveaux produits depuis l'API et mettre à jour l'état
        axios.get('/produits')
          .then((response) => {
            const filteredProducts = response.data.filter((produit) => produit.stock === true);
            setProduits(filteredProducts);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    let sessionPanier = sessionStorage.getItem('Produit');
    let Panier ;
    if (sessionPanier) {
      Panier = JSON.parse(sessionPanier);
    }else{
      Panier = []
    }
    
    
    Panier.push(produit);
    sessionStorage.setItem('Produit',JSON.stringify(Panier));
    console.log(Panier)
    dispatch(replaceCart(Panier));
    toast.success('Le produit a été ajouté au panier');
  }
 
  function handleClick() {
    navigate(`/produits/${produit.id}`);
  }
  

  return (
    <Card style={{ width: '15rem' }}>
      <Card.Img variant="top" src={produit.image} alt={produit.nom} />
      <Card.Body>
        <Card.Title>{produit.nom}</Card.Title>
        <Card.Text>{produit.description}</Card.Text>
        <Card.Text>Prix : {produit.prix} €</Card.Text>
        <Button variant="primary" onClick={() => handleAddToCart(produit)}>
          Ajouter au panier
        </Button>
        <button onClick={handleClick}>Voir le produit</button>

      </Card.Body>
    </Card>
  );
};

export default ProductCard;
