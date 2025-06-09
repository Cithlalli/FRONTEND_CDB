
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPanel.css"; 


const AdminCarrito = () => {
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

  // Función para manejar la subida de imágenes
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result]); // Agregar la nueva imagen al estado
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para eliminar una imagen
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="admin-carrito-container">
      <h2 className="carrito-title">
        <i className="fa fa-images me-2"></i>Administrar Carrito de Imágenes
      </h2>
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="upload-input"
          id="upload-input"
        />
        <label htmlFor="upload-input" className="btn btn-primary upload-button">
          <i className="fa fa-upload me-2"></i>Subir Imagen
        </label>
      </div>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-card">
            <img
              src={image}
              alt={`Imagen ${index}`}
              className="carrito-image"
              onClick={() => setSelectedImage(image)}
            />
            <button
              className="btn btn-danger delete-button"
              onClick={() => handleDeleteImage(index)}
            >
              <i className="fa fa-trash me-2"></i>Eliminar
            </button>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="image-modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setSelectedImage(null)}>
              &times;
            </span>
            <img src={selectedImage} alt="Seleccionada" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCarrito;