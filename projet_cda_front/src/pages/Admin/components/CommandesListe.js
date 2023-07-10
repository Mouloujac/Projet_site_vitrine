import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import CommandeCard from './CommandeCard';
import '../styles/Product.css'

const CommandesListe = ({ user }) => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    axios.get('api/commandes')
      .then(response => {
        
        setCommandes(response.data);
      })
      .catch(error => {
        console.error(error);
        setCommandes([]);
      });
  }, []);
  

  return (
    <div id="commandesTable">
    <div className='tbl-header'>
      <table cellPadding="0" cellSpacing="0" border="0">
        <thead>
          <tr>
            <th>id</th>
            <th>user id</th>
            <th>Produits</th>
            <th>Coût total</th>
            <th>Adresse de livraison</th>
            <th>Statut</th>
            <th>Changer le statut</th>
          </tr>
        </thead>
        {commandes.map(commande => (
            <CommandeCard key={commande.id} commande={commande} setCommandes={setCommandes} />
          ))}
      </table>
      </div>

   
    </div>
    
    
  );
};

export default CommandesListe;
