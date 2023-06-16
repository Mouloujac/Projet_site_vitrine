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
            <td key={panier.id}>
            <p>{panier.produit.nom}</p>
            <p>{panier.produit.prix}</p>
            </td>
            ))}
        
        </tr>
    
  );
};

export default CommandeCard;
