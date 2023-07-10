import "../styles/ProductCard.css"
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";


function ProductCard(produit) {
  const navigate = useNavigate();

  const handleAddToCart = (produit) => {
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
        console.log('ok')
        navigate("/")
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
    toast.success("Le produit a été ajouté au panier");
  };


  return (
          <section id="productSection">
            <div id="productCard">
              <div id="leftCard">
                <img id="imgCard" src={produit.image}/>
              </div>
              <div id="rightCard">
                <div id="upRight">
                  <h3>{produit.nom}</h3>
                  <p id="price">{produit.prix}€</p>
                  
                </div>
                <div id="downRight">
                  <div id="infoCard">
                    <p>Taille: {produit.taille.nom}</p>
                    <p>Type: {produit.type.nom}</p>
                    <p>{produit.description}</p>
                  </div>
                  

                  <span id="addButton" onClick={() => handleAddToCart(produit)}>Ajouter au panier</span>

                </div>

              </div>
            </div>
          </section>
  );
}

export default ProductCard;