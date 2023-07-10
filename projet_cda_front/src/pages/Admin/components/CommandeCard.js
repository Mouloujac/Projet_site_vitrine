import { useState } from "react";
import '../styles/Product.css'
import axios from "../../../axios"

const CommandeCard = ({ commande, user, setCommandes, }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleUpdate = async (updateCommande) => {
    try {
      handleClose();
      console.log("ok commandes");

      // Effectuer la requête pour mettre à jour le stock
      const updatedCommande = { ...updateCommande, statut: 1 };
      await axios.put(`/api/commandes/${updatedCommande.id}`
        , updatedCommande);
      const response = await axios.get('/api/commandes');
      const updatedCommandes = response.data;
      setCommandes(updatedCommandes);
      
    } catch (error) {
      console.log(error);
    }
  };

  const prixTotal = commande.paniers.reduce((acc, panier) => acc + panier.produit.prix, 0);

  return (
      <tbody>
        <tr key={commande.id}>
          <td>
            {commande.id} 
          </td>
          <td>{commande.user_id}</td>
          <td >
            {commande.paniers.map(panier =>(
          <p>{panier.produit.nom}</p>
          ))}
          </td>
          <td>{prixTotal}</td>
          <td>{commande.address}</td>
          <td>{commande.statut ? "Envoyé" : "En cours" }</td>
          <td><button onClick={() => handleUpdate(commande)}>Envoyer</button></td>
        </tr>
      </tbody>
  );
};

export default CommandeCard;
