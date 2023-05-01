import { useSelector } from 'react-redux';
import PaymentForm from './components/PaymentForm';
import ProductCard from './components/ProductCard';

const Cart = (user) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
          <>
            <ProductCard   cartItems={cartItems} />
            <PaymentForm   user={user} cartItems={cartItems} />
          </>
  );
};

export default Cart;
