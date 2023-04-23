import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';


const ProductCard = ({ produit }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const handleAddToCart = (produit) => {
    dispatch(addToCart(produit));
    toast.success('Le produit a été ajouté au panier');
    console.log(cart);

  };

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
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
