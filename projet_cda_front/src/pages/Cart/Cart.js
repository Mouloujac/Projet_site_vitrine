import { useSelector } from 'react-redux';
import PaymentForm from './components/PaymentForm';
import ProductCard from './components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Cart = (user) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => JSON.parse(sessionStorage.getItem('Produit')));

  useEffect(() => {
    
    if (!cartItems || cartItems == null || cartItems.length == 0) {
      navigate('/');
    }
  }, []);

  if (cartItems && cartItems.length > 0) {
    return (
      <>
        <ProductCard />
        <PaymentForm user={user} />
      </>
    );
  }
  
  return null;
};

export default Cart;

