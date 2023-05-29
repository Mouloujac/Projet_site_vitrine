import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../../../redux/cartSlice";
import axios from "../../../axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCart = (user) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) =>
    JSON.parse(sessionStorage.getItem("Produit"))
  );
  const navigate = useNavigate();

  console.log(cartItems);

  const removeFromCart = (product) => {
    dispatch(removeItemFromCart(product.id));
    const cart = JSON.parse(sessionStorage.getItem("Produit"));
    const newCart = cart.filter((item) => item.id !== product.id);
    sessionStorage.setItem("Produit", JSON.stringify(newCart));

    axios.put(`/api/produits/${product.id}`, {
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      image: product.image,
      taille_id: product.taille_id,
      type_id: product.type_id,
      stock: true,
    });
    if (newCart.length == 0) {
      navigate("/");
    }
  };

  return (
    <div>
      {cartItems && cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div>
          <h2>Mon panier</h2>

          <div id="productContainer">
            {cartItems.map((product) => (
              <div key={product.id} className="productCard">
                <img src="dress.png" className="productImg" />
                <div className="productCardContent">
                  <div className="productDescription">
                    <span className="prix">{product.prix}€</span>
                    <span>{product.nom}</span>
                    <span>Taille: {product.taille.nom}</span>
                  </div>
                  <span
                    onClick={() => removeFromCart(product)}
                    className="deleteButton"
                  >
                    X
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
