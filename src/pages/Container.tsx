import { useEffect, useState } from "react";
import AlbumCard from "../components/AlbumCard";
import AddAlbumModal from "../pages/AddAlbumModal";
import { Album } from "../context/types";

import "../styles/Container.css";
import "../styles/AlbumCard.css";
import "../styles/Modal.css";
import "../styles/SearchComponet.css";

const Home = () => {
  const [showSoldAlbums, setShowSoldAlbums] = useState(false);
  const [topalbums, setTopalbums] = useState<Album[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/albums`);
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

  const filteredAlbums = showSoldAlbums
    ? topalbums.filter((album) => album.sold)
    : topalbums;

  const handleAddAlbum = (newAlbum: Album) => {
    setTopalbums([...topalbums, newAlbum]);
  };

  return (
    <div className="container">
      <div className="filter-buttons">
        <button onClick={() => setShowSoldAlbums(false)}>
          Show All Albums
        </button>
        <button onClick={() => setShowSoldAlbums(true)}>
          Show Sold Albums
        </button>
        <button onClick={() => setShowAddModal(true)}>Add Album</button>
      </div>
      <div className="albums-container">
        {filteredAlbums.length > 0 &&
          filteredAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
      </div>
      {showAddModal && (
        <AddAlbumModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddAlbum}
        />
      )}
    </div>
  );
};

export default Home;
