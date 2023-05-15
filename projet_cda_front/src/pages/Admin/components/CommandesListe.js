import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import CommandeCard from './CommandeCard';

const CommandesListe = ({ user }) => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    axios.get('api/commandes')
      .then(response => {
        console.log(response)
        setCommandes(response.data);
      })
      .catch(error => {
        console.error(error);
        setCommandes([]);
      });
  }, []);
  

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>user id</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map(commande => (
            <CommandeCard key={commande.id} commande={commande} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommandesListe;
