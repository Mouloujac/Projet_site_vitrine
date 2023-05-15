import { useState } from "react";

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
        
        </tr>
    
  );
};

export default CommandeCard;
