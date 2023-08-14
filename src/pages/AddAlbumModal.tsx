import React, { useState, FC } from "react";
import axios from "axios";
import { Album } from "../context/types";

interface AddAlbumModalProps {
  onClose: () => void;
  onAdd: (newAlbum: Album) => void;
}

const AddAlbumModal: FC<AddAlbumModalProps> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAlbum: Album = {
      title,
      categories: categories.split(",").map((category) => category.trim()),
      description,
      imgurl,
      price: parseFloat(price),
      id: 0,
      sold: false,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/albums`,
        newAlbum
      );

      if (response.status === 201) {
        onAdd(newAlbum);
        onClose();
      } else {
        console.error("Error adding album");
      }
    } catch (error) {
      console.error("Error adding album", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Album</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Categories (comma-separated):</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Image URL:</label>
          <input
            type="url"
            value={imgurl}
            onChange={(e) => setImgUrl(e.target.value)}
            required
          />
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button type="submit">Add Album</button>
        </form>
      </div>
    </div>
  );
};

export default AddAlbumModal;
