import { useState, useEffect } from "react";
import axios from "../../../axios";

const CreateForm = ({ user, handleClose, updateProducts }) => {
  const [formState, setFormState] = useState({
    nom: "",
    description: "",
    prix: "",
    image: "",
    type_id:"",
    taille_id: "",
  });
  const [taille, settaille] = useState([]);
  const [type, settype] = useState([]);
  

  useEffect(() => {
    axios
      .get("/api/taille")
      .then((response) => {
        settaille(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/types")
      .then((response) => {
        settype(response.data);
        console.log(response.data);
        console.log(type);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/produits", formState)
      .then((response) => {
        console.log(response.data);
        // clear the form after successful submission
        setFormState({
          nom: "",
          description: "",
          prix: "",
          image: "",
          taille_id: "",
          type_id:""
        });
        updateProducts()
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nom">Nom du produit:</label>
        <input
          type="text"
          className="form-control"
          id="nom"
          name="nom"
          value={formState.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="prix">Prix:</label>
        <input
          type="text"
          className="form-control"
          id="prix"
          name="prix"
          value={formState.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">URL de l'image:</label>
        <input
          type="text"
          className="form-control"
          id="image"
          name="image"
          value={formState.image}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="taille_id">Taille:</label>
        <select
          className="form-control"
          id="taille_id"
          name="taille_id"
          value={formState.taille_id}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez une taille</option>
          {taille.map((taille) => (
            <option key={taille.id} value={taille.id}>
              {taille.nom}
            </option>
          ))}
        </select>
      </div>
       <div className="form-group">
        <label htmlFor="type_id">type:</label>
        <select
          className="form-control"
          id="type_id"
          name="type_id"
          value={formState.type_id}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez une type</option>
          {type.map((type) => (
            <option key={type.id} value={type.id}>
              {type.nom}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Ajouter produit
      </button>
    </form>
  );
};

export default CreateForm;
