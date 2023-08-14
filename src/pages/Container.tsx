import { useEffect, useState } from "react";
import AlbumCard from "../components/AlbumCard";

import "../styles/Container.css";
import "../styles/AlbumCard.css";

interface Album {
  id: number;
  sold: boolean;
}

interface Album {
  id: number;
  sold: boolean;
  title: string;
  description: string;
  categories: string[];
  price: number;
}

const Home = () => {
  const [showSoldAlbums, setShowSoldAlbums] = useState(false);
  const [topalbums, setTopalbums] = useState<Album[]>([]); // Provide the type here

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
        {filteredAlbums.length > 0 &&
          filteredAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
      </div>
    </div>
  );
};

export default Home;
