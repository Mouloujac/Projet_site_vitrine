import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleDownload = () => {
    if (selectedImage) {
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = selectedImage;

      image.onload = () => {
        const width = 400; // Nouvelle largeur souhaitée
        const height = (image.height / image.width) * width; // Calculer la nouvelle hauteur en conservant les proportions

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);

        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL(); // Convertir le canevas en une URL de données
        downloadLink.download = 'modified_image.png'; // Nom du fichier de téléchargement
        downloadLink.click();
      };
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
      <button onClick={handleDownload}>Télécharger</button>
    </div>
  );
};

export default ImageUploader;
