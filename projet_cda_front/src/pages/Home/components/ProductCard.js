import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "../../../redux/cartSlice";
import { replaceCart } from "../../../redux/cartSlice";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ produit, setProduits }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (produit) => {
    axios
      .put(`/api/produits/${produit.id}`, {
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
        axios
          .get("/produits")
          .then((response) => {
            const filteredProducts = response.data.filter(
              (produit) => produit.stock === true
            );
            setProduits(filteredProducts);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    let sessionPanier = sessionStorage.getItem("Produit");
    let Panier;
    if (sessionPanier) {
      Panier = JSON.parse(sessionPanier);
    } else {
      Panier = [];
    }

    Panier.push(produit);
    sessionStorage.setItem("Produit", JSON.stringify(Panier));
    console.log(Panier);
    dispatch(replaceCart(Panier));
    toast.success("Le produit a été ajouté au panier");
  };

  function handleClick() {
    navigate(`/produits/${produit.id}`);
  }

  // console.log(produit)
  return (
    <div className="page-inner">
      <div className="row">
        <div className="el-wrapper">
          <div className="box-up">
            <img className="imgProduct" src="/dress.png" alt="" />
            <div className="img-info" >
              <div className="info-inner" >
                <span className="p-name">{produit.nom}</span>
                <span className="size">
                  <p>{produit.taille.nom}</p>
                </span>
              </div>
              <div className="a-size">
                <span className="p-company"onClick={handleClick}>{produit.description}</span>
              </div>
            </div>
          </div>

          <div className="box-down">
            <div className="h-bg" >
              <div className="h-bg-inner"></div>
            </div>

            <a className="cart" >
              <span className="price">{produit.prix}€</span>
              <span className="add-to-cart">
                <span className="txt" onClick={() => handleAddToCart(produit)}>Add in cart</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductCard;
