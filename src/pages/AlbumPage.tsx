import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

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

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/albums/${id}`
        );
        setAlbum(response.data);
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    }

    fetchAlbum();
  }, [id]);

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Album Details</h2>
      <div>
        <img src={album.imgurl} alt={album.title} />
      </div>
      <div>
        <h3>{album.title}</h3>
        <p>Categories: {album.categories.join(", ")}</p>
        <p>Description: {album.description}</p>
        <p>Sold: {album.sold ? "Yes" : "No"}</p>
        <p>Price: ${album.price}</p>
      </div>
      <Link to="/home">Back to Home</Link>
    </div>
  );
};

export default AlbumPage;
