import React from "react";
import { Link } from "react-router-dom";

interface album {
  id: number;
  title: string;
  description: string;
  categories: string[];
  price: number;
  sold: boolean;
  imgurl: string;
}

interface AlbumCardProps {
  album: album;
  showLink?: boolean;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, showLink = true }) => {
  const categoryColors: Record<string, string> = {
    "Rock 'n' Roll": "#FF4500",
    Rock: "#FF4500",
    Blues: "#7bc6a4",
    Jazz: "#f78d54",
    Funk_Soul: "#f75d54",
    Folk: "#54a8f7",
    Reggae: "#8a54f7",
    Clássico: "#f75d54",
    Eletrônica: "#7a54f7",
    Hip_Hop: "#f7a154",
    Country: "#54f75d",
    Pop: "#f754a8",
    Metal: "#c11d1d",
    BlackMetal: "#000000",
    "Dungeon synth": "#543C36",
    "World Music": "#54f7a8",
  };
  return (
    <div className="album-card">
      <h2>{album.title}</h2>
      {album.sold && <span className="sold-tag">Sold off</span>}

      <img src={album.imgurl} alt={album.title} />
      <div className="description-container">
        <h3>Description:</h3>
        <p className="description">{album.description}</p>
      </div>
      <div className="categories-container">
        {album.categories.map((category, index) => (
          <span
            key={index}
            className="category"
            style={{ color: categoryColors[category] }}
          >
            #{category}
          </span>
        ))}

        <p className="price">Price: $ {album.price}</p>
      </div>
      {showLink && <Link to={`/album/${album.id}`}>Details</Link>}
    </div>
  );
};

export default AlbumCard;
