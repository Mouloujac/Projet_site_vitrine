import React from 'react';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import axios from '../../../axios';

import '../styles/Product.css'
import CreateForm from './CreateForm';



const ProductsListe = ({ user }) => {
  const [show, setShow] = useState(false);
  const [produits, setProduits] = useState([]); // Produits
  

  const updateProducts = async () => {
    const response = await axios.get('/produits');
    console.log("ok")
    setProduits(response.data);
  }
  
  useEffect(() => {
    const handleResize = () => {
      const tblContent = document.getElementsByClassName('tbl-content')[0];
      const tblTable = document.getElementsByClassName('tbl-content table')[0];
      const tblHeader = document.getElementsByClassName('tbl-header')[0];

      const scrollWidth = tblContent.offsetWidth - tblTable.offsetWidth;
      tblHeader.style.paddingRight = scrollWidth + 'px';
    };

    // Exécuter la fonction handleResize lors du chargement de la page et lors du redimensionnement de la fenêtre
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);

    // Nettoyer les écouteurs d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    axios.get('/produits').then((response) => {
      setProduits(response.data);
      
    }).catch((error) => {
      setProduits([])
      console.error(error);
    });
  }, []) // [] = componentDidMount (exécuté une seule fois)
  


 

  return (
    <div id="productsTable">
      
      <div className='tbl-header'>
      <table cellPadding="0" cellSpacing="0" border="0">
        <thead>
          <tr>
            <th>Supprimer</th>
            <th >Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th> </th>
          </tr>
        </thead>
    </table>
    </div>
    <div className="tbl-content">
    <table cellPadding="0" cellSpacing="0" border="0">
        <tbody>
          {produits.map((produit) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}
        </tbody>
      </table>
      </div>
      
      
       

      </div>
    
  );
};


export default ProductsListe;
