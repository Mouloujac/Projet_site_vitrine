const ProductCard = ({ produit, handleShow, deleteProducts }) => {
  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td><img className="productImage" src={ produit.image }></img></td>
      <td>{produit.nom}</td>
      <td>{produit.description}</td>
      <td>{produit.prix} €</td>
      <td>
        <button  onClick={() => handleShow(produit)}>
          Modifier
        </button>
        <button onClick={() => deleteProducts(produit.id)}>
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default ProductCard;
