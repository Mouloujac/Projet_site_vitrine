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
          </tr>
        </thead>
      </table>
      </div>
      <div className="tbl-content">
    <table cellPadding="0" cellSpacing="0" border="0">
      <tbody>
          {commandes.map(commande => (
            <CommandeCard key={commande.id} commande={commande} />
          ))}
        </tbody>
        </table>
    </div>
    </div>
    
  );
};

export default CommandesListe;
