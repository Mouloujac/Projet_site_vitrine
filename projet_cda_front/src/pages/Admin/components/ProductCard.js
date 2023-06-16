const ProductCard = ({ produit, handleShow }) => {
  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{produit.image}</td>
      <td>{produit.nom}</td>
      <td>{produit.description}</td>
      <td>{produit.prix} €</td>
      <td>
        <button variant="primary" onClick={() => handleShow(produit)}>
          Modifier
        </button>
        <button>
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default ProductCard;
