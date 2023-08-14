import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/SearchComponet.css";
interface Album {
  id: number;
  title: string;
  description: string;
  imgurl: string;
}
const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  const [searchResults, setSearchResults] = useState<Album[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/searchAlbums?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.error("Error fetching search results:", error));
  }, [searchQuery]);

  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      <p>Showing results for: {searchQuery}</p>
      <ul>
        {searchResults.map((album) => (
          <li key={album.id} className="album-item">
            <h3 className="album-title">{album.title}</h3>
            <p className="album-description">{album.description}</p>
            <img className="album-image" src={album.imgurl} alt={album.title} />
            <Link to={`/album/${album.id}`}>
              <button className="view-album-button">View Album</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SearchResultsPage;
