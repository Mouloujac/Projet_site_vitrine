import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../../../redux/cartSlice';
import axios from '../../../axios';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


const ProductCart = ( user ) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => JSON.parse(sessionStorage.getItem('Produit')));
  const navigate = useNavigate()
  
  
 
  const removeFromCart = (product) => {
    dispatch(removeItemFromCart(product.id));
    const cart = JSON.parse(sessionStorage.getItem('Produit'));
    const newCart = cart.filter(item => item.id !== product.id);
    sessionStorage.setItem('Produit', JSON.stringify(newCart));

    axios.put(`/api/produits/${product.id}`, {
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      image: product.image,
      taille_id: product.taille_id,
      type_id: product.type_id,
      stock: true,
    })
    if(newCart.length == 0 ){
      navigate('/')
    }
  };

  return (
    <div>
      {cartItems && cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div>
          <h2>Mon panier</h2>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} />
                  </td>
                  <td>{product.name}{product.id}</td>
                  <td>{product.description}</td>
                  <td>{product.prix} €</td>
                  <td>
                    <button onClick={() => removeFromCart(product)}>
                      Remove from Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
