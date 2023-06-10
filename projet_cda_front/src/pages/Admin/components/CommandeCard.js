import { useState } from "react";
import '../styles/Product.css'

const CommandeCard = ({ commande, user, setCommandes, updateCommandes }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleUpdate = async (updateCommande) => {
    try {
      handleClose();
      console.log("ok commandes");
      updateCommandes(updateCommande);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
        <tr>
          <td>
            {commande.id} 
          </td>
          <td>{commande.user_id}</td>
          {commande.paniers.map(panier =>(
            <p key={panier.id}>
            <td>{panier.produit.nom}</td>
            <td>{panier.produit.prix}</td>
            </p>
            ))}
        
        </tr>
    
  );
};

export default CommandeCard;
