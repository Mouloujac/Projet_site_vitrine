import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import "./styles/Product.css"

function Product() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null); // Utilisation de null pour indiquer que les données ne sont pas encore chargées

  useEffect(() => {
    axios
      .get(`api/produits/${id}`)
      .then((response) => {
        setProduit(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // Si le produit n'est pas encore chargé, affichez un message de chargement
  if (!produit) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <>
      <nav id="retour">
        <Link to="/" >
          Retour
        </Link>
      </nav>
      <div>
        <ProductCard {...produit} />
      </div>
    </>
  );
}

export default Product;
