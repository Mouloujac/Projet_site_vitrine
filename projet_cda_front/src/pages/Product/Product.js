import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from '../../axios'
import { Link } from "react-router-dom";
import ProductCard from './components/ProductCard';

function Product() {
  const produitId = useParams(); // récupère l'identifiant du produit depuis les paramètres d'URL
  const [produit, setProduit] = useState([]); // Produits
  console.log(produitId.id)
  useEffect(()  => {
    axios.get(`/produits/${produitId.id}`).then((response) => {
      
      setProduit(response.data);
      console.log(response.data)
    }).catch((error) => {
      console.error(error);
    });
  }, [])
  return (
    <>
    <nav>
     <Link to="/"><h1>J&J</h1></Link>
     </nav>
    <div>
      <ProductCard {...produit}/>
    </div>
    </>
  )
  // utilisation de l'identifiant pour charger les détails du produit depuis l'API et afficher les informations sur le produit
  // ...
};


export default Product;