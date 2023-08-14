import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "../styles/AlbumPage.css";

interface AlbumProps {
  id: string;
  title: string;
  categories: string[];
  description: string;
  imgurl: string;
  sold: boolean;
  price: number;
}

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/albums/${id}`
        );
        setAlbum(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching album");
        setLoading(false);
      }
    }

    fetchAlbum();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!album) {
    return <div>No album found</div>;
  }

  return (
    <div className="album-details-container">
      <h1>Album Details</h1>
      <div>
        <img className="album-image" src={album.imgurl} alt={album.title} />
      </div>
      <div>
        <h3 className="album-title">{album.title}</h3>
        <p className="album-categories">
          Categories: {album.categories.join(", ")}
        </p>
        <p className="album-description">Description: {album.description}</p>
        <p className="album-sold">Sold off: {album.sold ? "Yes" : "No"}</p>
        <p className="album-price">Price: ${album.price}</p>
      </div>
      <Link className="back-to-home" to="/home">
        Back to Home
      </Link>
    </div>
  );
};

export default AlbumPage;
