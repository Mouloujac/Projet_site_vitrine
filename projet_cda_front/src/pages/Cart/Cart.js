import { useSelector } from 'react-redux';
import ProductCard from './components/ProductCard';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  return (
    
            <ProductCard   cartItems={cartItems} />
      
  );
};

export default Cart;
