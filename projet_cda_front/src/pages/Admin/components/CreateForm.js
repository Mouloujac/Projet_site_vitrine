import { useState, useEffect } from "react";
import axios from "../../../axios";
import AWS from 'aws-sdk';


const CreateForm = ({ user, handleClose, updateProducts }) => {
  const [formState, setFormState] = useState({
    nom: "",
    description: "",
    prix: "",
    image: "",
    type_id:"",
    taille_id: "",
  });
  const [taille, setTaille] = useState([]);
  const [type, setType] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  
  const s3 = new AWS.S3({
    accessKeyId: 'AKIA5NT5PADDBROP3H6A',
    secretAccessKey: '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',
  });
  

  useEffect(() => {
    axios
      .get("/api/tailles")
      .then((response) => {
        setTaille(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/types")
      .then((response) => {
        setType(response.data);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormState({ ...formState, image: file }); // Mettre à jour le state avec le fichier image sélectionné
      setPreviewImage(URL.createObjectURL(file)); // Mettre à jour l'aperçu de l'image
    }
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const imageFile = event.target.elements.imageFile.files[0];
    console.log(formState['nom'])
    // Définissez le nom de fichier pour l'image sur S3 (par exemple, utilisez un nom unique ou un ID d'article)
    const fileName = `${formState["nom"]}-${Date.now()}.${imageFile.name.split('.').pop()}`;

  
    // Configurez les options de téléchargement de l'image vers S3
    const uploadParams = {
      Bucket: 'laravel-photos',
      Key: fileName,
      Body: imageFile,
    };
  
    // Téléchargez l'image vers S3
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Une fois le téléchargement terminé, récupérez l'URL de l'image sur S3
        const imageUrl = data.Location;
        // Effectuez la demande POST avec l'URL de l'image au serveur backend
        axios
          .post("/api/produits", { ...formState, image: imageUrl })
          .then((response) => {
            // Effacez le formulaire après une soumission réussie
            setFormState({
              nom: "",
              description: "",
              prix: "",
              image: "",
              taille_id: "",
              type_id: "",
              imageFile: "",
            });
          })
          .catch((error) => {
            console.error(error);
          });
          updateProducts()
      }
    });   
  };


  return (
    <div className="product-form-container">
      <div className="form-header">
        <h2 className="form-title">Ajouter un nouveau produit</h2>
      </div>
      <div className="form-content"></div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nom">Nom du produit:</label>
        <input
          type="text"
          className="form-control"
          id="nom"
          name="nom"
          value={formState.nom}
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
      <div className="form-group">
        <label htmlFor="imageFile">Image:</label>
        <input
          type="file"
          className="form-control"
          id="imageFile"
          name="imageFile"
          value={formState.imageFile}
          onChange={handleImageChange}
        />
      </div>
      {previewImage && ( 
        <div className="preview-image">
          <img src={previewImage} alt="Preview" />
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Ajouter produit
      </button>
    </form>
    </div>
    
  );
};

export default CreateForm;
