import { useEffect, useState } from "react";
import AlbumCard from "../components/AlbumCard";

import "../styles/Container.css";
import "../styles/AlbumCard.css";

const Home = () => {
  const [showSoldAlbums, setShowSoldAlbums] = useState(false);
  const [topalbums, setTopalbums] = useState([]);

  useEffect(() => {
    // Fetch albums from the API
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:5000/albums");
        if (response.ok) {
          const albums = await response.json();
          setTopalbums(albums);
        } else {
          console.error("Error fetching albums");
        }
      } catch (error) {
        console.error("Error fetching albums", error);
      }
    };

    fetchAlbums();
  }, [showSoldAlbums]);

  return (
    <div className="container">
      <div className="filter-buttons">
        <button onClick={() => setShowSoldAlbums(false)}>
          Show All Albums
        </button>
        <button onClick={() => setShowSoldAlbums(true)}>
          Show Sold Albums
        </button>
      </div>
      <div className="albums-container">
        {topalbums.length > 0 &&
          topalbums.map((album) => <AlbumCard key={album.id} album={album} />)}
      </div>
    </div>
  );
};

export default Home;
